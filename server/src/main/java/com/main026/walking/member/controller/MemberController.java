package com.main026.walking.member.controller;

import com.main026.walking.auth.principal.PrincipalDetails;
import com.main026.walking.exception.BusinessLogicException;
import com.main026.walking.exception.ExceptionCode;
import com.main026.walking.member.dto.MemberDto;
import com.main026.walking.member.service.MemberService;
import com.main026.walking.util.awsS3.AwsS3Service;
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

import java.io.IOException;
import java.net.MalformedURLException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;
    private final AwsS3Service awsS3Service;

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

    @DeleteMapping("/{memberId}")
    public String deleteMember(@PathVariable Long memberId){
        memberService.deleteMember(memberId);
        return "회원 삭제 완료";
    }

// CRUD-IMAGE
    // CREATE : Default Image 적용으로 해당 메소드 삭제
    // READ
    @GetMapping("/img/{memberId}")
    public ResponseEntity showImage(@PathVariable long memberId) throws IOException {
        String findImage = memberService.findImage(memberId);
        return new ResponseEntity(awsS3Service.getImageBin(findImage),HttpStatus.OK);
    }

    //  UPDATE
    @PatchMapping("/img/{memberId}")
    public ResponseEntity patchImage(@PathVariable long memberId,
                             @RequestPart MultipartFile imgFile,
                             @AuthenticationPrincipal PrincipalDetails principalDetails){
        authorization(memberId,principalDetails);
        return new ResponseEntity(memberService.updateImage(imgFile,memberId),HttpStatus.OK);
    }

    //  DELETE
    @DeleteMapping("/img/{memberId}")
    public ResponseEntity deleteImage(@PathVariable long memberId,
                                      @AuthenticationPrincipal PrincipalDetails principalDetails){
        authorization(memberId,principalDetails);
        memberService.deleteImage(memberId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

//  VALID
    private void authorization(Long memberId, PrincipalDetails principalDetails){
        if(principalDetails == null) throw new BusinessLogicException(ExceptionCode.NO_AUTHORIZATION);
        if(!memberId.equals(principalDetails.getMember().getId()))
            throw new BusinessLogicException(ExceptionCode.INVALID_AUTHORIZATION);
    }
}