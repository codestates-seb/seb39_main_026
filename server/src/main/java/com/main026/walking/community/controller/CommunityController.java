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
    @PostMapping("/post")
    public ResponseEntity postCommunity(@RequestBody CommunityDto.Post postDto, @AuthenticationPrincipal PrincipalDetails principalDetails) {

        CommunityDto.Response createdCommunity = communityService.createCommunity(postDto,principalDetails);

        return new ResponseEntity(createdCommunity, HttpStatus.CREATED);
    }

    // Read
    // TODO 세션멤버의 정보를 뿌려주는 것은 프론트에서 가능한 일
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
                                        @RequestBody List<Long> petIdList) {
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
    public ResponseEntity getCommunitiesWithNew(CommunitySearchCond communitySearchCond) {
        Sort sortNew = Sort.by("new").descending();
        PageRequest pageRequest = PageRequest.of(0,4,sortNew);
        communitySearchCond.setCond("new");
        CommunityListResponseDto communities = communityService.findCommunities(communitySearchCond, pageRequest);

        return new ResponseEntity(communities, HttpStatus.OK);
    }

    @GetMapping("/hot")
    public ResponseEntity getCommunitiesWithHot(CommunitySearchCond communitySearchCond) {
        Sort sortHot = Sort.by("hot");
        PageRequest pageRequest = PageRequest.of(0,4,sortHot);
        communitySearchCond.setCond("hot");
        CommunityListResponseDto communities = communityService.findCommunities(communitySearchCond, pageRequest);

        return new ResponseEntity(communities, HttpStatus.OK);
    }

    //Update
    @PatchMapping("/{communityId}")
    public ResponseEntity patchCommunity(
            @PathVariable long communityId,
            @RequestBody CommunityDto.Patch dto,
            @AuthenticationPrincipal PrincipalDetails principalDetails) {

        CommunityDto.Response response = communityService.updateCommunity(communityId, dto,principalDetails);

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


    //  CREATE - MULTI
    @PostMapping("/image/{communityId}")
    public ResponseEntity postImageById(
            @PathVariable long communityId,
            @RequestPart List<MultipartFile> imgFile,
            @AuthenticationPrincipal PrincipalDetails principalDetails
    ){
        communityService.authorization(communityId,principalDetails);
        List<String> savedImages = communityService.saveMultiImage(communityId, imgFile);

        return new ResponseEntity(savedImages,HttpStatus.CREATED);
    }

    @PostMapping("/post/image")
    public List<String> postImages(@RequestPart List<MultipartFile> imgFile){
        return imgFile.stream().map(awsS3Service::uploadImage).collect(Collectors.toList());
    }

    //  READ
    @GetMapping("/image/{filename}")
    public ResponseEntity showImage(@PathVariable String filename) throws IOException {
        return new ResponseEntity(awsS3Service.getFileURL(filename),HttpStatus.OK);
    }

    @GetMapping("/images/{communityId}")
    public ResponseEntity showImages(@PathVariable long communityId) throws IOException {
        return new ResponseEntity(communityService.readImages(communityId), HttpStatus.OK);
    }

    //  UPDATE
    @PatchMapping("/image/{filename}")
    public ResponseEntity updateImage(@PathVariable String filename, @RequestPart MultipartFile imgFile, @AuthenticationPrincipal PrincipalDetails principalDetails){

        String updatedImage = communityService.updateImage(filename, principalDetails, imgFile);

        return new ResponseEntity(updatedImage,HttpStatus.OK);
    }

    //  DELETE
    @DeleteMapping("/image/{filename}")
    public ResponseEntity deleteImage(@PathVariable String filename, @AuthenticationPrincipal PrincipalDetails principalDetails){
        communityService.deleteImage(filename,principalDetails);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}