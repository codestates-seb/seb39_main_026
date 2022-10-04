package com.main026.walking.member.controller;

import com.main026.walking.auth.principal.PrincipalDetails;
import com.main026.walking.exception.BusinessLogicException;
import com.main026.walking.exception.ExceptionCode;
import com.main026.walking.member.dto.FindPasswordForm;
import com.main026.walking.member.dto.MemberDto;
import com.main026.walking.member.service.MemberService;
import com.main026.walking.util.awsS3.AwsS3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;
    private final AwsS3Service awsS3Service;

    @PostMapping("/signup")
    public MemberDto.Response signUp(@RequestBody MemberDto.Post memberPostDto) throws IOException {
        return memberService.saveMember(memberPostDto);
    }

    @PostMapping("/login")
    public ResponseEntity loginMember(Authentication authentication){
        return new ResponseEntity<>(memberService.loginMember(authentication), HttpStatus.OK);
    }

    @GetMapping("/{memberId}")
    public MemberDto.Response getMember(@PathVariable Long memberId, @AuthenticationPrincipal PrincipalDetails principalDetails) throws IOException {

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
        return memberService.updateMember(memberId,patchDto,principalDetails);
    }

    @DeleteMapping("/{memberId}")
    public String deleteMember(@PathVariable Long memberId,@AuthenticationPrincipal PrincipalDetails principalDetails){
        memberService.deleteMember(memberId,principalDetails);
        return "회원 삭제 완료";
    }

// CRUD-IMAGE
    // CREATE
    // READ
    @GetMapping("/image/{memberId}")
    public ResponseEntity showImage(@PathVariable long memberId) throws IOException {
        String findImage = memberService.findImage(memberId);
        return new ResponseEntity(awsS3Service.getFileURL(findImage),HttpStatus.OK);
    }

    //  UPDATE
    @PatchMapping("/image/{memberId}")
    public ResponseEntity patchImage(@PathVariable long memberId,
                             @RequestPart MultipartFile imgFile,
                             @AuthenticationPrincipal PrincipalDetails principalDetails){
        authorization(memberId,principalDetails);
        String updateImage = memberService.updateImage(imgFile,memberId);
        return new ResponseEntity(updateImage,HttpStatus.OK);
    }

    @PostMapping("/findpassword")
    public String findPassword(@RequestBody FindPasswordForm form){
        return memberService.findPassword(form);
    }


    //  DELETE
    @DeleteMapping("/image/{memberId}")
    public ResponseEntity deleteImage(@PathVariable long memberId,
                                      @AuthenticationPrincipal PrincipalDetails principalDetails){
        authorization(memberId,principalDetails);
        memberService.deleteImage(memberId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

//  VALID
    private void authorization(Long memberId, PrincipalDetails principalDetails){
        if(!memberId.equals(principalDetails.getMember().getId()))
            throw new BusinessLogicException(ExceptionCode.INVALID_AUTHORIZATION);
    }
}