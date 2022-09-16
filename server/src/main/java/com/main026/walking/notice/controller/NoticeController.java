package com.main026.walking.notice.controller;


import com.main026.walking.notice.dto.NoticeDto;
import com.main026.walking.notice.entity.Notice;
import com.main026.walking.notice.mapper.NoticeMapper;
import com.main026.walking.notice.service.NoticeService;
import com.main026.walking.util.response.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/community/notice")
@RequiredArgsConstructor
@CrossOrigin(origins = "*",allowedHeaders = "*")
public class NoticeController {
  private final NoticeMapper noticeMapper;
  private final NoticeService noticeService;

  //  Create
  @PostMapping("/{community-id}")
  public ResponseEntity postNotice(
    @PathVariable("community-id") long communityId,
    @RequestBody NoticeDto.Post dto){
    Notice notice = noticeMapper.postDtoToEntity(dto);
    Notice createdEntity = noticeService.createNotice(notice,communityId);

    return new ResponseEntity(noticeMapper.entityToDtoResponse(notice), HttpStatus.CREATED);
  }

  //  Read
  @GetMapping("/{notice-id}")
  public ResponseEntity getNotice(
    @PathVariable("notice-id") long noticeId){
    Notice notice = noticeService.findNotice(noticeId);

    return new ResponseEntity(noticeMapper.entityToDtoResponse(notice), HttpStatus.OK);
  }

  @GetMapping
  public ResponseEntity getNotices(
    @RequestParam(value = "page", defaultValue = "1") int page,
    @RequestParam(value = "size", defaultValue = "10") int size ) {

    Page<Notice> noticePage = noticeService.findNotices(page - 1, size);

    List<Notice> notices = noticePage.getContent();

    return new ResponseEntity(new MultiResponseDto<>(noticeMapper.multiEntityToDtoResponse(notices), noticePage), HttpStatus.OK);
  }

  //  Update
  @PatchMapping("{notice-id}")
  public ResponseEntity patchNotice(
    @PathVariable("notice-id") long noticeId,
    @RequestBody NoticeDto.Patch dto ){

    noticeService.updateNotice(noticeId, dto);
    Notice notice = noticeService.findNotice(noticeId);

    return new ResponseEntity<>(noticeMapper.entityToDtoResponse(notice), HttpStatus.OK);
  }

  //  Delete
  @DeleteMapping("{notice-id}")
  public ResponseEntity deleteNotice(
    @PathVariable("notice-id") long noticeId){
    noticeService.deleteNotice(noticeId);
    return new ResponseEntity(HttpStatus.NO_CONTENT);
  }

}
