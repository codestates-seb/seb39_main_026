package com.main026.walking.member.service;

import com.main026.walking.member.dto.MemberDto;
import com.main026.walking.member.entity.Member;
import com.main026.walking.member.mapper.MemberMapper;
import com.main026.walking.member.repository.MemberRepository;
import com.main026.walking.util.file.FileStore;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;
    private final FileStore fileStore;

    //C
    public MemberDto.Response saveMember(MemberDto.Post postDto){
        Member member = memberMapper.memberPostDtoToMember(postDto);
        member.setAddress(postDto.getSi(), postDto.getGu(), postDto.getDong());
        if(postDto.getProfileImg()!=null){
            try {
                MultipartFile profileImg = postDto.getProfileImg();
                String storeFile = fileStore.storeFile(profileImg);
                member.setImgUrl(storeFile);
            }catch (IOException e){
                e.printStackTrace();
            }
        }
        memberRepository.save(member);

        return memberMapper.memberToMemberResponseDto(member);
    }

    //R
    public MemberDto.Response findMember(Long memberId){
        Member member = memberRepository.findById(memberId).orElseThrow();
        return memberMapper.memberToMemberResponseDto(member);
    }

    //U
    public MemberDto.Response updateMember(Long memberId,MemberDto.Patch patchDto){
        Member member = memberRepository.findById(memberId).orElseThrow();
        member.update(patchDto);

        if(patchDto.getProfileImg()!=null){
            try {
                MultipartFile profileImg = patchDto.getProfileImg();
                String storeFile = fileStore.storeFile(profileImg);
                member.setImgUrl(storeFile);
            }catch (IOException e){
                e.printStackTrace();
            }
        }

        memberRepository.save(member);
        return memberMapper.memberToMemberResponseDto(member);
    }

    //D
    public void deleteMember(Long memberId){
        memberRepository.deleteById(memberId);
    }
}
