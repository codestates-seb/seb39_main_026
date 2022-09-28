package com.main026.walking.member.controller;

import com.main026.walking.auth.principal.PrincipalDetails;
import com.main026.walking.member.dto.FindPasswordForm;
import com.main026.walking.member.dto.MemberDto;
import com.main026.walking.member.service.MemberService;
import com.main026.walking.util.file.FileStore;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping("/login")
    public ResponseEntity loginMember(Authentication authentication){
        return new ResponseEntity<>(memberService.loginMember(authentication), HttpStatus.OK);
    }

    @GetMapping("/{memberId}")
    public MemberDto.Response getMember(@PathVariable Long memberId, @AuthenticationPrincipal PrincipalDetails principalDetails){

        //TODO 개선 필요 : 로그인하지않았거나, 본인이 아님
        Boolean authorization = true;
        if(principalDetails==null||principalDetails.getMember().getId()!=memberId){
            authorization = false;
        }

        return memberService.findMember(memberId,authorization);

    }

    @PatchMapping("/{memberId}")
    public MemberDto.Response patchMember(@PathVariable Long memberId,
                                          @RequestBody MemberDto.Patch patchDto,
                                          @AuthenticationPrincipal PrincipalDetails principalDetails){
        //인증로직

        return memberService.updateMember(memberId,patchDto);
    }

    @PostMapping("/image/{memberId}")
    public String postImage(@PathVariable Long memberId,
                            @RequestPart MultipartFile imgFile,
                            @AuthenticationPrincipal PrincipalDetails principalDetails){
        return memberService.saveImage(imgFile);
    }

    @PostMapping("/image")
    public String postImage(@RequestPart MultipartFile imgFile,
                            @AuthenticationPrincipal PrincipalDetails principalDetails){
        return memberService.saveImage(imgFile);
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

    @PostMapping("/findpassword")
    public String findPassword(@RequestBody FindPasswordForm form){
        return memberService.findPassword(form);
    }

}
