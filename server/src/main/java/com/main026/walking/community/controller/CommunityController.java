package com.main026.walking.community.controller;

import com.main026.walking.community.dto.CommunityDto;
import com.main026.walking.community.entity.Community;
import com.main026.walking.community.mapper.CommunityMapper;
import com.main026.walking.community.service.CommunityService;
import com.main026.walking.util.response.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/community")
@RequiredArgsConstructor
@CrossOrigin(origins = "*",allowedHeaders = "*")
public class CommunityController {
  private final CommunityService communityService;
  private final CommunityMapper communityMapper;

//  Create
  @PostMapping("/post")
  public ResponseEntity postCommunity(@RequestBody CommunityDto.Post postDto){

    //TODO 유저 수정 필요
    Community createdCommunity = communityService.createCommunity(postDto);

    return new ResponseEntity(communityMapper.entityToDtoResponse(createdCommunity), HttpStatus.CREATED);
  }

//  Read
  @GetMapping("/{community-id}")
  public ResponseEntity getCommunity(@PathVariable("community-id") long communityId){
    Community community = communityService.findCommunity(communityId);
    community.countView();

    return new ResponseEntity(communityMapper.entityToDtoResponse(community), HttpStatus.OK);
  }


  @GetMapping
  public ResponseEntity getCommunities(
    @RequestParam(value = "page", defaultValue = "1") int page,
    @RequestParam(value = "size", defaultValue = "10") int size ) {

    Page<Community> communityPage = communityService.findCommunities(page - 1, size);

    List<Community> communities = communityPage.getContent();

    //Todo 정보를 보여주는 dto 에 대한 고민
    return null;
    //return new ResponseEntity(new MultiResponseDto<>(communityMapper.multiEntityToDtoInfo(communities), communityPage), HttpStatus.OK);
  }

//  Update
  @PatchMapping("{community-id}")
  public ResponseEntity patchCommunity(
    @PathVariable("community-id") long communityId,
    @RequestBody CommunityDto.Patch dto ){

    communityService.updateCommunity(communityId, dto);
    Community community = communityService.findCommunity(communityId);

    return new ResponseEntity<>(communityMapper.entityToDtoResponse(community), HttpStatus.OK);
  }

//  Delete
  @DeleteMapping("{community-id}")
  public ResponseEntity deleteCommunity(
    @PathVariable("community-id") long communityId){
    communityService.deleteCommunity(communityId);
    return new ResponseEntity(HttpStatus.NO_CONTENT);
  }
}
