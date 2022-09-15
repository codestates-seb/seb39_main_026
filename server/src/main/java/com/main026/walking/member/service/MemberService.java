package com.main026.walking.member.service;

import com.main026.walking.member.dto.MemberDto;
import com.main026.walking.member.entity.Member;
import com.main026.walking.member.mapper.MemberMapper;
import com.main026.walking.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;

    //C
    public MemberDto.Response saveMember(MemberDto.Post postMemberDto){
        Member member = memberMapper.memberPostDtoToMember(postMemberDto);

        //TODO
        //member.setImgUrl()
        memberRepository.save(member);

        return memberMapper.memberToMemberResponseDto(member);
    }

    //R
    public MemberDto.Response findMember(Long memberId){
        Member member = memberRepository.findById(memberId).orElseThrow();
        return memberMapper.memberToMemberResponseDto(member);
    }

    //U
    public MemberDto.Response updateMember(Long memberId,MemberDto.Patch patchMemberDto){
        Member member = memberRepository.findById(memberId).orElseThrow();
        member.update(patchMemberDto);

        //TODO
        //member.setImgUrl()

        memberRepository.save(member);
        return memberMapper.memberToMemberResponseDto(member);
    }

    //D
    public void deleteMember(Long memberId){
        memberRepository.deleteById(memberId);
    }
}
