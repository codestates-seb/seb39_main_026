package com.main026.walking.community.controller;

import com.main026.walking.auth.principal.PrincipalDetails;
import com.main026.walking.community.dto.CommunityDto;
import com.main026.walking.community.entity.Community;
import com.main026.walking.community.mapper.CommunityMapper;
import com.main026.walking.community.service.CommunityService;
import com.main026.walking.member.entity.Member;
import com.main026.walking.member.repository.MemberRepository;
import com.main026.walking.pet.dto.PetDto;
import com.main026.walking.pet.entity.Pet;
import com.main026.walking.util.file.FileStore;
import com.main026.walking.util.response.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/community")
@RequiredArgsConstructor
public class CommunityController {
    private final CommunityService communityService;
    private final CommunityMapper communityMapper;
    private final FileStore fileStore;

    //  Create
    @PostMapping
    public ResponseEntity postCommunity(@RequestBody CommunityDto.Post postDto, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        if(principalDetails==null){
            throw new RuntimeException("로그인하지않은 사용자 입니다.");
        }
        Member loginMember = principalDetails.getMember();

        Community createdCommunity = communityService.createCommunity(postDto,loginMember);

        return new ResponseEntity(communityMapper.entityToDtoResponse(createdCommunity), HttpStatus.CREATED);
    }

    //  Read
    // TODO 커뮤니티 요청시 회원의 강아지를 응답해주고있는데 이것이 최선일까?
    @GetMapping("/{community-id}")
    public ResponseEntity getCommunity(@PathVariable("community-id") long communityId,@AuthenticationPrincipal PrincipalDetails principalDetails) {

        Community community = communityService.findCommunity(communityId);
        community.countView();

        List<PetDto.compactResponse> petList = new ArrayList<>();
        if(principalDetails!=null) {
            Member member = principalDetails.getMember();
            petList = member.getPetList().stream().map(pet -> new PetDto.compactResponse(pet)).collect(Collectors.toList());
        }
        CommunityDto.Response response = communityMapper.entityToDtoResponse(community);
        response.setPetList(petList);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PostMapping("/{community-id}")
    public ResponseEntity joinCommunity(@PathVariable("community-id") long communityId,
                                        @RequestBody List<Long> petIdList
    ) {
        Community community = communityService.joinPet(communityId, petIdList);

        return new ResponseEntity<>(communityMapper.entityToDtoResponse(community),HttpStatus.OK);
    }


    @GetMapping
    public ResponseEntity getCommunities(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {

        Page<Community> communityPage = communityService.findCommunities(page - 1, size);

        List<Community> communities = communityPage.getContent();

        return new ResponseEntity(new MultiResponseDto<>(communityMapper.multiEntityToDtoInfo(communities), communityPage), HttpStatus.OK);
    }

    //  Update
    @PatchMapping("{community-id}")
    public ResponseEntity patchCommunity(
            @PathVariable("community-id") long communityId,
            @RequestBody CommunityDto.Patch dto) {

        communityService.updateCommunity(communityId, dto);
        Community community = communityService.findCommunity(communityId);

        return new ResponseEntity<>(communityMapper.entityToDtoResponse(community), HttpStatus.OK);
    }

    //  Delete
    @DeleteMapping("{community-id}")
    public ResponseEntity deleteCommunity(
            @PathVariable("community-id") long communityId) {
        communityService.deleteCommunity(communityId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @ResponseBody
    @GetMapping("/img/{filename}")
    public Resource showImage(@PathVariable String filename) throws MalformedURLException {
        return new UrlResource("file:" + fileStore.getFullPath(filename));
    }
}
