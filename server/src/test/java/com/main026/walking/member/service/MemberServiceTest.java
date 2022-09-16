//package com.main026.walking.member.service;
//
//import com.main026.walking.member.dto.MemberDto;
//import com.main026.walking.member.entity.Member;
//import com.main026.walking.member.repository.MemberRepository;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//class MemberServiceTest {
//
//    @Autowired
//    MemberService memberService;
//    @Autowired
//    MemberRepository memberRepository;
//
//    @Test
//    void 회원가입(){
//        //given
//        MemberDto.Post memberPost = new MemberDto.Post("kdk@nate.com","12345678","고양이","부산광역시 해운대구 엄청비싼아파트");
//        memberService.saveMember(memberPost);
//        //when
//        Member findMember = memberRepository.findById(1L).orElseThrow();
//
//        //then
//        assertThat(memberPost.getNickName()).isEqualTo(findMember.getNickName());
//
//    }
//
//    @Test
//    void 회원정보수정(){
//        //given
//        MemberDto.Post memberPost = new MemberDto.Post("kdk@nate.com","12345678","고양이","부산광역시 해운대구 엄청비싼아파트");
//        memberService.saveMember(memberPost);
//
//
//        MemberDto.Patch memberPatch = MemberDto.Patch
//                .builder()
//                .nickName("코뿔소")
//                .password("87654321")
//                .build();
//        MemberDto.Response updateMember = memberService.updateMember(1L, memberPatch);
//        //when
//        Member member = memberRepository.findById(1L).orElseThrow();
//
//        //then
//        assertThat(member.getNickName()).isEqualTo("코뿔소");
//        assertThat(member.getPassword()).isEqualTo("87654321");
//
//    }
//
//}