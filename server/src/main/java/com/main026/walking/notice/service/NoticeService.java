package com.main026.walking.notice.service;

import com.main026.walking.community.entity.Community;
import com.main026.walking.community.repository.CommunityRepository;
import com.main026.walking.notice.dto.NoticeDto;
import com.main026.walking.notice.entity.Notice;
import com.main026.walking.notice.mapper.NoticeMapper;
import com.main026.walking.notice.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NoticeService {
  private final NoticeMapper noticeMapper;
  private final NoticeRepository noticeRepository;
  private final CommunityRepository communityRepository;
  
//  Create
  public Notice createNotice(Notice entity,Long communityId) {
    Community findCommunity = communityRepository.findById(communityId).orElseThrow();

    entity.setCommunity(findCommunity);

    return noticeRepository.save(entity);
  }

//  Read
  public Notice findNotice(long noticeId){
    return findVerifiedNotice(noticeId);
  }


//  Update
  public Notice updateNotice(long noticeId, NoticeDto.Patch dto) {
    Notice target = findVerifiedNotice(noticeId);
    noticeMapper.updateEntityFromDto(dto, target);

    return noticeRepository.save(target);
  }

//  Delete
  public void deleteNotice(long noticeId) {
    Notice target = findVerifiedNotice(noticeId);
    noticeRepository.delete(target);
  }

//  Valid
  public Notice findVerifiedNotice(long noticeId) {
    Optional<Notice> optionalEntity =
      noticeRepository.findById(noticeId);
    Notice findNotice =
      optionalEntity.orElseThrow(() -> new RuntimeException("NOTICE_NOT_FOUND"));

    return findNotice;
  }
}
