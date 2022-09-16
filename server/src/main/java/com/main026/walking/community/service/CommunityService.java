package com.main026.walking.community.service;

import com.main026.walking.community.dto.CommunityDto;
import com.main026.walking.community.entity.Community;
import com.main026.walking.community.mapper.CommunityMapper;
import com.main026.walking.community.repository.CommunityRepository;
import com.main026.walking.member.entity.Member;
import com.main026.walking.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommunityService {
  private final CommunityRepository communityRepository;
  private final CommunityMapper communityMapper;

  private final MemberRepository memberRepository;

  private Member testMember(){
    return memberRepository.findById(1L).orElseThrow();
  }

//  Create
  public Community createCommunity(Community entity) {
    //Todo 시큐리티 이후 유저 세팅
    entity.setRepresentMember(testMember());

    return communityRepository.save(entity);
  }

//  Read
  public Community findCommunity(long communityId){
    Community community = findVerifiedCommunity(communityId);
    community.countView();
    return communityRepository.save(community);
  }

  public Page<Community> findCommunities(int page, int size) {
    return communityRepository.findAll(PageRequest.of( page, size, Sort.by("communityId").descending()));
  }

//  Update
  public Community updateCommunity(long communityId, CommunityDto.Patch dto) {
    Community community = findVerifiedCommunity(communityId);
    communityMapper.updateEntityFromDto(dto, community);

    return communityRepository.save(community);
  }

//  Delete
  public void deleteCommunity(long communityId) {
    Community community = findVerifiedCommunity(communityId);
    communityRepository.delete(community);
  }

//  Valid
  public Community findVerifiedCommunity(long questionId) {
    Optional<Community> optionalCommunity =
      communityRepository.findById(questionId);
    Community findCommunity =
      optionalCommunity.orElseThrow(() -> new RuntimeException("COMMUNITY_NOT_FOUND"));

    return findCommunity;
  }
}
