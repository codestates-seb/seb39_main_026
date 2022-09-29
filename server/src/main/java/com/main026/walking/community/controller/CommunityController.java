package com.main026.walking.community.controller;

import com.main026.walking.auth.principal.PrincipalDetails;
import com.main026.walking.community.dto.CommunityDto;
import com.main026.walking.community.dto.CommunityListResponseDto;
import com.main026.walking.community.dto.CommunitySearchCond;
import com.main026.walking.community.service.CommunityService;
import com.main026.walking.exception.BusinessLogicException;
import com.main026.walking.exception.ExceptionCode;
import com.main026.walking.member.entity.Member;
import com.main026.walking.pet.dto.PetDto;
import com.main026.walking.util.awsS3.AwsS3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/community")
@RequiredArgsConstructor
public class CommunityController {
    private final CommunityService communityService;
    private final AwsS3Service awsS3Service;

    // Create
    // TODO 모임 등록시 모임하는 사람의 펫도 등록
    // TODO 리프레시 토큰 쿠키에다 저장(일단 테스트할때는)

    @PostMapping
    public ResponseEntity postCommunity(@RequestBody CommunityDto.Post postDto, @AuthenticationPrincipal PrincipalDetails principalDetails) {

        if(principalDetails==null){
            throw new RuntimeException("로그인하지않은 사용자 입니다.");
        }
        Member loginMember = principalDetails.getMember();

        CommunityDto.Response createdCommunity = communityService.createCommunity(postDto,loginMember);

        return new ResponseEntity(createdCommunity, HttpStatus.CREATED);
    }

    // Read
    // TODO 커뮤니티 요청시 회원의 강아지를 응답해주고있는데 이것이 최선일까?
    @GetMapping("/{communityId}")
    public ResponseEntity getCommunity(@PathVariable long communityId,@AuthenticationPrincipal PrincipalDetails principalDetails) {

        List<PetDto.compactResponse> petList = new ArrayList<>();
        if(principalDetails!=null) {
            Member member = principalDetails.getMember();
            petList = member.getPetList().stream().map(pet -> new PetDto.compactResponse(pet)).collect(Collectors.toList());
        }
        CommunityDto.Response response = communityService.findCommunity(communityId);
        response.setPetList(petList);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PostMapping("/{communityId}")
    public ResponseEntity joinCommunity(@PathVariable long communityId,
                                        @RequestBody List<Long> petIdList
    ) {
        CommunityDto.Response community = communityService.joinPet(communityId, petIdList);

        return new ResponseEntity<>(community,HttpStatus.OK);
    }


    @GetMapping
    public ResponseEntity getCommunities(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            CommunitySearchCond communitySearchCond) {
        PageRequest pageRequest = PageRequest.of(page-1,size);

        CommunityListResponseDto communities = communityService.findCommunities(communitySearchCond, pageRequest);

        return new ResponseEntity(communities, HttpStatus.OK);
    }

    @GetMapping("/new")
    public ResponseEntity getCommunitiesWithNew(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "4") int size,
            CommunitySearchCond communitySearchCond) {
        Sort sortNew = Sort.by("new").descending();
        PageRequest pageRequest = PageRequest.of(page-1,size,sortNew);

        CommunityListResponseDto communities = communityService.findCommunities(communitySearchCond, pageRequest);

        return new ResponseEntity(communities, HttpStatus.OK);
    }

    @GetMapping("/hot")
    public ResponseEntity getCommunitiesWithHot(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "4") int size,
            CommunitySearchCond communitySearchCond) {
        Sort sortHot = Sort.by("hot");
        PageRequest pageRequest = PageRequest.of(page-1,size,sortHot);

        CommunityListResponseDto communities = communityService.findCommunities(communitySearchCond, pageRequest);

        return new ResponseEntity(communities, HttpStatus.OK);
    }

    //TODO 기존 이미지를 보여주고 삭제할건 삭제하고, 변경할 수 있어야 한다. - 연관관계 때문
    //Update
    @PatchMapping("/{communityId}")
    public ResponseEntity patchCommunity(
            @PathVariable long communityId,
            @RequestBody CommunityDto.Patch dto,
            @AuthenticationPrincipal PrincipalDetails principalDetails) {

        //TODO 인증로직은 서비스에서 처리
        if(communityService.findCommunity(communityId).getMember().getId()!=principalDetails.getMember().getId()){
            throw new BusinessLogicException(ExceptionCode.NO_AUTHORIZATION);
        }

        CommunityDto.Response response = communityService.updateCommunity(communityId, dto);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //  Delete
    @DeleteMapping("/{communityId}")
    public ResponseEntity deleteCommunity(
            @PathVariable long communityId,
            @AuthenticationPrincipal PrincipalDetails principalDetails) {
        communityService.deleteCommunity(communityId,principalDetails);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

//  CRUD - IMAGE
    //  CREATE - ONE
/*    @PostMapping("/img/{communityId}")
    public ResponseEntity postImage(
      @PathVariable long communityId,
      @RequestPart MultipartFile imgFile,
      @AuthenticationPrincipal PrincipalDetails principalDetails
    ){
        communityService.authorization(communityId,principalDetails);
        communityService.saveImage(communityId, imgFile);

        return new ResponseEntity(HttpStatus.CREATED);
    }*/

    //  CREATE - MULTI
    @PostMapping("/img/{communityId}")
    public ResponseEntity postImage(
      @PathVariable long communityId,
      @RequestPart List<MultipartFile> imgFile,
      @AuthenticationPrincipal PrincipalDetails principalDetails
    ){
        communityService.authorization(communityId,principalDetails);
        List<String> savedImages = communityService.saveMultiImage(communityId, imgFile);

        return new ResponseEntity(savedImages,HttpStatus.CREATED);
    }

    //  READ
    @GetMapping("/img/{filename}")
    public ResponseEntity showImage(@PathVariable String filename) throws IOException {
        return new ResponseEntity(awsS3Service.getImageBin(filename),HttpStatus.OK);
    }

    @GetMapping("/images/{communityId}")
    public ResponseEntity showImages(@PathVariable long communityId) throws IOException {
        return new ResponseEntity(communityService.readImages(communityId), HttpStatus.OK);
    }

    //  UPDATE
    @PatchMapping("/img/{filename}")
    public ResponseEntity updateImage(@PathVariable String filename, @RequestPart MultipartFile imgFile, @AuthenticationPrincipal PrincipalDetails principalDetails){

        String updatedImage = communityService.updateImage(filename, principalDetails, imgFile);

        return new ResponseEntity(updatedImage,HttpStatus.OK);
    }

    //  DELETE
    @DeleteMapping("/img/{filename}")
    public ResponseEntity deleteImage(@PathVariable String filename, @AuthenticationPrincipal PrincipalDetails principalDetails){
        communityService.deleteImage(filename,principalDetails);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}