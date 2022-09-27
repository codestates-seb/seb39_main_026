package com.main026.walking.community.controller;

import com.main026.walking.auth.principal.PrincipalDetails;
import com.main026.walking.community.dto.CommunityDto;
import com.main026.walking.community.dto.CommunityListResponseDto;
import com.main026.walking.community.dto.CommunitySearchCond;
import com.main026.walking.community.entity.Community;
import com.main026.walking.community.mapper.CommunityMapper;
import com.main026.walking.community.service.CommunityService;
import com.main026.walking.exception.BusinessLogicException;
import com.main026.walking.exception.ExceptionCode;
import com.main026.walking.member.entity.Member;
import com.main026.walking.member.repository.MemberRepository;
import com.main026.walking.pet.dto.PetDto;
import com.main026.walking.pet.entity.Pet;
import com.main026.walking.util.file.FileStore;
import com.main026.walking.util.response.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.annotation.Before;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/community")
@RequiredArgsConstructor
public class CommunityController {
    private final CommunityService communityService;
    private final FileStore fileStore;

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

    //community/postimg 에서 post 요청을 처리, 이미지를 저장하고 경로주소를 생성한뒤
    //어떻게 응답하지? 그냥 String으로 경로를 반환하면 되나?
    @PostMapping("/image")
    public List<String> postImage(@RequestPart List<MultipartFile> imgFile){
        return communityService.saveMultiImage(imgFile);
    }

    // Read
    // TODO 커뮤니티 요청시 회원의 강아지를 응답해주고있는데 이것이 최선일까?
    @GetMapping("/{community-id}")
    public ResponseEntity getCommunity(@PathVariable("community-id") long communityId,@AuthenticationPrincipal PrincipalDetails principalDetails) {

        List<PetDto.compactResponse> petList = new ArrayList<>();
        if(principalDetails!=null) {
            Member member = principalDetails.getMember();
            petList = member.getPetList().stream().map(pet -> new PetDto.compactResponse(pet)).collect(Collectors.toList());
        }
        CommunityDto.Response response = communityService.findCommunity(communityId);
        response.setPetList(petList);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PostMapping("/{community-id}")
    public ResponseEntity joinCommunity(@PathVariable("community-id") long communityId,
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

    //TODO 기존 이미지를 보여주고 삭제할건 삭제하고, 변경할 수 있어야 한다. - 연관관계 때문
    //Update
    @PatchMapping("/{community-id}")
    public ResponseEntity patchCommunity(
            @PathVariable("community-id") long communityId,
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
    @DeleteMapping("/{community-id}")
    public ResponseEntity deleteCommunity(
            @PathVariable("community-id") long communityId,
            @AuthenticationPrincipal PrincipalDetails principalDetails) {
        communityService.deleteCommunity(communityId,principalDetails);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @ResponseBody
    @GetMapping("/img/{filename}")
    public Resource showImage(@PathVariable String filename) throws MalformedURLException {
        return new UrlResource("file:" + fileStore.getFullPath(filename));
    }
}
