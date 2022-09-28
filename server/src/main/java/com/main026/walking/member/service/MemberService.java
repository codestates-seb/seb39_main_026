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

//TODO 비밀번호 찾기
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final FileStore fileStore;
    private final EmailSender emailSender;

    public MemberDto.Response loginMember(Authentication authentication){
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        Member loginMember = memberRepository.findByEmail(principalDetails.getMember().getEmail()).orElseThrow();
        return memberMapper.memberToMemberResponseDto(loginMember);
    }

    //C
    public MemberDto.Response saveMember(MemberDto.Post postDto){

        verifyExistMemberWithEmail(postDto.getEmail());
        verifyExistMemberWithUsername(postDto.getUsername());

        Member member = memberMapper.memberPostDtoToMember(postDto);
        member.setAddress(postDto.getSi(), postDto.getGu(), postDto.getDong());
        member.setPassword(passwordEncoder.encode(member.getPassword()));

        memberRepository.save(member);

        return memberMapper.memberToMemberResponseDto(member);
    }


    //R
    public MemberDto.Response findMember(Long memberId,Boolean isOwner){

        MemberDto.Response response =
                memberMapper.memberToMemberResponseDto(verifyExistMemberWithId(memberId));
        response.setIsOwner(isOwner);

        return response;
    }

    //U
    public MemberDto.Response updateMember(Long memberId,MemberDto.Patch patchDto){

        verifyExistMemberWithUsername(patchDto.getUsername());

        Member member = verifyExistMemberWithId(memberId);

        member.update(patchDto);

        memberRepository.save(member);

        return memberMapper.memberToMemberResponseDto(member);
    }

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
        memberRepository.deleteById(memberId);
    }

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
