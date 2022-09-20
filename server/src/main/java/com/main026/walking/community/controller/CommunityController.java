package com.main026.walking.community.controller;

import com.main026.walking.community.dto.CommunityDto;
import com.main026.walking.community.entity.Community;
import com.main026.walking.community.mapper.CommunityMapper;
import com.main026.walking.community.service.CommunityService;
import com.main026.walking.member.entity.Member;
import com.main026.walking.member.repository.MemberRepository;
import com.main026.walking.pet.dto.PetDto;
import com.main026.walking.pet.entity.Pet;
import com.main026.walking.util.response.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/community")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CommunityController {
    private final CommunityService communityService;
    private final CommunityMapper communityMapper;

    //시큐리티 도입하면 삭제
    private final MemberRepository memberRepository;

    //  Create
    @PostMapping
    public ResponseEntity postCommunity(@RequestBody CommunityDto.Post postDto) {

        //TODO 유저 수정 필요
        Community createdCommunity = communityService.createCommunity(postDto);

        return new ResponseEntity(communityMapper.entityToDtoResponse(createdCommunity), HttpStatus.CREATED);
    }

    //  Read
    // 현재 로그인한 회원의 정보(강아지정보)를 전달해줘야한다.
    @GetMapping("/{community-id}")
    public ResponseEntity getCommunity(@PathVariable("community-id") long communityId) {
        Community community = communityService.findCommunity(communityId);
        community.countView();

        //임시 - 현재로그인한 회원의 정보에서 강아지 리스트를 응답데이터에 저장하는 코드
        Member kimcoding = memberRepository.findById(1L).orElseThrow();
        List<PetDto.compactResponse> petList = kimcoding.getPetList().stream().map(pet -> new PetDto.compactResponse(pet)).collect(Collectors.toList());

        CommunityDto.Response response = communityMapper.entityToDtoResponse(community);
        response.setPetList(petList);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    // TODO 커뮤니티 참여에서 회원 데이터(PrincipalDetails) 필요
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

        //Todo 정보를 보여주는 dto 에 대한 고민
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
}
