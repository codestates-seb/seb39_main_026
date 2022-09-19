package com.main026.walking.community.service;

import com.main026.walking.community.dto.CommunityDto;
import com.main026.walking.community.entity.Community;
import com.main026.walking.community.mapper.CommunityMapper;
import com.main026.walking.community.repository.CommunityRepository;
import com.main026.walking.image.entity.Image;
import com.main026.walking.image.repository.ImageRepository;
import com.main026.walking.member.entity.Member;
import com.main026.walking.member.repository.MemberRepository;
import com.main026.walking.util.file.FileStore;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommunityService {
  private final CommunityRepository communityRepository;
  private final MemberRepository memberRepository;
  private final ImageRepository imageRepository;
  private final CommunityMapper communityMapper;
  private final FileStore fileStore;

  private Member testMember(){
    return memberRepository.findById(1L).orElseThrow();
  }

//  Create
  public Community createCommunity(CommunityDto.Post postDto) throws IOException {
    Community community = communityMapper.postDtoToEntity(postDto);

    String[] dayInfo = postDto.getDayInfo();
    List<String> dayList = new ArrayList<>();
    for (String day : dayInfo) {
      dayList.add(day);
    }

    //Todo 제대로된 요일데이터 파싱
    community.setDays(dayList);

    //Todo 시큐리티 이후 유저 세팅
    community.setRepresentMember(testMember());
    community.setAddress(postDto.getSi(), postDto.getGu(), postDto.getDong());

    //이미지 세팅
    Community savedCommunity = communityRepository.save(community);
    List<MultipartFile> attachFiles = postDto.getImages();
    for (MultipartFile attachFile : attachFiles) {
      String storeFile = fileStore.storeFile(attachFile);
      Image image = Image.builder()
              .storeFilename(storeFile)
              .community(savedCommunity)
              .build();
      imageRepository.save(image);
    }
    return communityRepository.save(community);
  }

//  Read
  public Community findCommunity(long communityId){
    Community community = findVerifiedCommunity(communityId);
    community.countView();
    return communityRepository.save(community);
  }

  public Page<Community> findCommunities(int page, int size) {
    return communityRepository.findAll(PageRequest.of( page, size, Sort.by("id").descending()));
  }

//  Update
  public Community updateCommunity(long communityId, CommunityDto.Patch patchDto) {
    Community community = findVerifiedCommunity(communityId);
    community.update(patchDto);
    //communityMapper.updateEntityFromDto(dto, community);

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
