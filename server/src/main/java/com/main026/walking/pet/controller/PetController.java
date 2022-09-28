package com.main026.walking.pet.controller;

import com.main026.walking.auth.principal.PrincipalDetails;
import com.main026.walking.exception.BusinessLogicException;
import com.main026.walking.exception.ExceptionCode;
import com.main026.walking.member.entity.Member;
import com.main026.walking.pet.dto.PetDto;
import com.main026.walking.pet.service.PetService;
import com.main026.walking.util.awsS3.AwsS3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/pets")
@RequiredArgsConstructor
public class PetController {

    private final PetService petService;
    private final AwsS3Service awsS3Service;

    //강아지 등록페이지 접근
    //TODO 미리 데이터를 넣어두는 방식 변경 필요
    @GetMapping("/post")
    public List<String> getPostPage(@RequestParam String username){
        List<String> personality = new ArrayList<>();
        personality.add("느긋해요");
        personality.add("사교적이에요");
        personality.add("독립적이에요");
        personality.add("고집이 세요");
        personality.add("겁이 많아요");
        return personality;
    }

    @PostMapping("/post")
    public PetDto.Response postPet(
      @RequestBody PetDto.Post postDto,
      @RequestParam String username, @AuthenticationPrincipal PrincipalDetails principalDetails){
        if(!principalDetails.getMember().getUsername().equals(username)){
            throw new BusinessLogicException(ExceptionCode.NO_AUTHORIZATION);
        }
        Member member = principalDetails.getMember();
        return petService.postPet(postDto,member);
    }

    //이름이 괴상한데 그냥하는 이유 : requestMapping 의 이름 통일성을 지키는게 더 낫다고 생각해서,
    //하지만 괴상하긴 해서 애초에 네이밍컨벤션에 대한 고민을 더 해야할것같다.
    @GetMapping("/{petId}")
    public PetDto.Response getPet(@PathVariable Long petId){
        return petService.findPet(petId);
    }

    @GetMapping
    public List<PetDto.Response> getPets(@RequestParam("username") String username){
        return petService.findAllByUsername(username);
    }

    @PatchMapping("/{petId}")
    public PetDto.Response patchPet(@PathVariable Long petId, @RequestBody PetDto.Patch patchDto){
        return petService.editPet(petId,patchDto);
    }

    //굳이 문자열을 반환하는 이유 : 삭제가 되었음을 확인하면 좋을 것 같아서 -> 204응답을 해줘도 되지않을까?
    @DeleteMapping("/{petId}")
    public String deletePet(@PathVariable Long petId){
        petService.deletePet(petId);
        return "삭제완료";
    }

//    CRUD-IMAGE
    //  CREATE : DEFAULT_IMAGE 적용으로 메소드 삭제
    @PostMapping("/post/image")
    public String postImage(@RequestPart MultipartFile imgFile){
        if(imgFile.isEmpty()) {
            return "DEFAULT_PET_IMAGE.jpg";
        } else {
            return awsS3Service.uploadImage(imgFile);
        }
    }

    //  UPDATE
    @PatchMapping("/img/{petId}")
    public ResponseEntity patchImage(@PathVariable long petId,
                                     @RequestPart MultipartFile imgFile,
                                     @AuthenticationPrincipal PrincipalDetails principalDetails){
        authorization(petId,principalDetails);
        return new ResponseEntity(petService.updateImage(imgFile,petId),HttpStatus.OK);
    }

    //  READ
    @GetMapping("/img/{petId}")
    public ResponseEntity showImage(@PathVariable long petId) throws IOException {
        String findImage = petService.findImageById(petId);
        return new ResponseEntity(awsS3Service.getImageBin(findImage), HttpStatus.OK);
    }

    //  DELETE
    @DeleteMapping("/img/{petId}")
    public ResponseEntity deleteImage(
      @PathVariable long petId,
      @AuthenticationPrincipal PrincipalDetails principalDetails){
        authorization(petId,principalDetails);
        petService.deleteImage(petId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

//  VALID
    private void authorization(long petId, PrincipalDetails principalDetails){
        Long memberId = petService.findPet(petId).getMember().getId();
        if(!memberId.equals(principalDetails.getMember().getId()))
            throw new BusinessLogicException(ExceptionCode.INVALID_AUTHORIZATION);
    }
}
