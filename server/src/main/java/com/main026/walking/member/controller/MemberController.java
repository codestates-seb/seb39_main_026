package com.main026.walking.member.controller;

import com.main026.walking.member.dto.MemberDto;
import com.main026.walking.member.service.MemberService;
import com.main026.walking.util.file.FileStore;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;
    private final FileStore fileStore;

    @PostMapping("/signup")
    public MemberDto.Response signUp(@RequestBody MemberDto.Post memberPostDto){
        return memberService.saveMember(memberPostDto);
    }

//    @PostMapping("/login")
//    public ResponseEntity loginMember(Authentication authentication){
//        return new ResponseEntity<>(memberService.loginMember(authentication), HttpStatus.OK);
//    }

    //TODO 토큰이 없으면 본인이 아니라는 정보를 포함시키기
    @GetMapping("/{memberId}")
    public MemberDto.Response getMember(@PathVariable Long memberId){
        return memberService.findMember(memberId);
    }

    @PatchMapping("/{memberId}")
    public MemberDto.Response patchMember(@PathVariable Long memberId,MemberDto.Patch patchDto){
        return memberService.updateMember(memberId,patchDto);
    }

    @DeleteMapping("/{memberId}")
    public String deleteMember(@PathVariable Long memberId){
        memberService.deleteMember(memberId);
        return "회원 삭제 완료";
    }

    @ResponseBody
    @GetMapping("/img/{filename}")
    public Resource showImage(@PathVariable String filename) throws MalformedURLException {
        return new UrlResource("file:" + fileStore.getFullPath(filename));
    }

}
