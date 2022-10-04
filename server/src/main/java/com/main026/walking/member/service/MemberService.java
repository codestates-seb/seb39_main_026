package com.main026.walking.member.service;

import com.main026.walking.auth.principal.PrincipalDetails;
import com.main026.walking.email.service.EmailSender;
import com.main026.walking.exception.BusinessLogicException;
import com.main026.walking.exception.ExceptionCode;
import com.main026.walking.member.dto.FindPasswordForm;
import com.main026.walking.member.dto.MemberDto;
import com.main026.walking.member.entity.Member;
import com.main026.walking.member.mapper.MemberMapper;
import com.main026.walking.member.repository.MemberRepository;
import com.main026.walking.util.awsS3.AwsS3Service;
import com.main026.walking.util.file.FileStore;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AwsS3Service awsS3Service;
    private final FileStore fileStore;
    private final EmailSender emailSender;

    public MemberDto.Response loginMember(Authentication authentication){
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        Member loginMember = memberRepository.findByEmail(principalDetails.getMember().getEmail()).orElseThrow();
        return memberMapper.memberToMemberResponseDto(loginMember);
    }

    //  CREATE
    public MemberDto.Response saveMember(MemberDto.Post postDto) throws IOException {

        verifyExistMemberWithEmail(postDto.getEmail());
        verifyExistMemberWithUsername(postDto.getUsername());

        Member member = memberMapper.memberPostDtoToMember(postDto);
        member.setAddress(postDto.getSi(), postDto.getGu(), postDto.getDong());
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        member.setImgUrl("DEFAULT_MEMBER_IMAGE.jpg");
        memberRepository.save(member);

        MemberDto.Response dto = memberMapper.memberToMemberResponseDto(member);
        return dto;
    }

    //  READ
    public MemberDto.Response findMember(Long memberId,Boolean isOwner) throws IOException {

        MemberDto.Response response =
                memberMapper.memberToMemberResponseDto(verifyExistMemberWithId(memberId));
        response.setIsOwner(isOwner);
        return response;
    }

    //  UPDATE
    public MemberDto.Response updateMember(Long memberId,MemberDto.Patch patchDto){

        verifyExistMemberWithUsername(patchDto.getUsername());

        Member member = verifyExistMemberWithId(memberId);

        member.update(patchDto);

        memberRepository.save(member);

        return memberMapper.memberToMemberResponseDto(member);
    }

    //  DELETE
    public String saveImage(MultipartFile multipartFile){
        try {
            return fileStore.storeFile(multipartFile);
        }catch (IOException e){
            throw new BusinessLogicException(ExceptionCode.FILE_NOT_FOUND);
        }
    }

    public String findPassword(FindPasswordForm form) {
        Member member = verifyNotExistMemberWithEmail(form.getEmail());
        String temPassword = UUID.randomUUID().toString();
        //임시비밀번호로 교체
        try {
            member.setPassword(passwordEncoder.encode(temPassword));
            memberRepository.save(member);
            emailSender.sendEmail(form.getEmail(),temPassword);
        }catch (GeneralSecurityException e) {
            throw new RuntimeException(e);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
        return "이메일 전송 완료";
    }

    //D
    public void deleteMember(Long memberId){
        String image = verifyExistMemberWithId(memberId).getImgUrl();
        memberRepository.deleteById(memberId);
        if(!image.equals("DEFAULT_MEMBER_IMAGE.jpg")) awsS3Service.deleteImage(image);
    }

// CRUD-IMAGE
    //  CREATE : Default_image 적용으로 인한 해당 메소드 삭제
    //  READ
    public String findImage(Long memberId) {
        Member findMember = verifyExistMemberWithId(memberId);
        return findMember.getImgUrl();
    }

    //  UPDATE
    public String updateImage(MultipartFile multipartFile, Long memberId){
        Member findMember = verifyExistMemberWithId(memberId);
        String uploadImage = awsS3Service.uploadImage(multipartFile);

        String findImage = findMember.getImgUrl();
        if(!findImage.equals("DEFAULT_MEMBER_IMAGE.jpg")) awsS3Service.deleteImage(findImage);
        findMember.setImgUrl(uploadImage);
        memberRepository.save(findMember);
        return uploadImage;
    }
    //  DELETE
    public void deleteImage(Long memberId) {
        Member findMember = verifyExistMemberWithId(memberId);
        String findImage = findMember.getImgUrl();
        if(!findImage.equals("DEFAULT_MEMBER_IMAGE.jpg")){
            awsS3Service.deleteImage(findImage);
            findMember.setImgUrl("DEFAULT_MEMBER_IMAGE.jpg");
        }
        memberRepository.save(findMember);
    }

//  VALID
    private void verifyExistMemberWithEmail(String email){
        Optional<Member> checkMember =  memberRepository.findByEmail(email);
        if(checkMember.isPresent()) throw new BusinessLogicException(ExceptionCode.EMAIL_EXISTS);
    }
    private Member verifyNotExistMemberWithEmail(String email){
        if(!memberRepository.findByEmail(email).isPresent()) throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        return memberRepository.findByEmail(email).orElseThrow();
    }

    private void verifyExistMemberWithUsername(String username){
        Optional<Member> checkMember =  memberRepository.findByUsername(username);
        if(checkMember.isPresent()) throw new BusinessLogicException(ExceptionCode.USERNAME_EXISTS);
    }

    private Member verifyExistMemberWithId(Long memberId){
        Optional<Member> checkMember = memberRepository.findById(memberId);
        return checkMember.orElseThrow(()->new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }
}
