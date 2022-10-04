package com.main026.walking.notice.controller;


import com.main026.walking.auth.principal.PrincipalDetails;
import com.main026.walking.notice.dto.NoticeDto;
import com.main026.walking.notice.mapper.NoticeMapper;
import com.main026.walking.notice.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/community/notice")
@RequiredArgsConstructor
public class NoticeController {
  private final NoticeMapper noticeMapper;
  private final NoticeService noticeService;

  //  Create
  @PostMapping("/{community-id}")
  public ResponseEntity postNotice(@PathVariable("community-id") long communityId,
                                   @RequestBody NoticeDto.Post dto,
                                   @AuthenticationPrincipal PrincipalDetails principalDetails){

    NoticeDto.Response notice = noticeService.createNotice(dto, communityId,principalDetails);

    return new ResponseEntity(notice, HttpStatus.CREATED);
  }

  //  Read
  @GetMapping("/{notice-id}")
  public ResponseEntity getNotice(
    @PathVariable("notice-id") long noticeId){
    NoticeDto.Response notice = noticeService.findNotice(noticeId);

    return new ResponseEntity(notice, HttpStatus.OK);
  }

  //  Update
  @PatchMapping("{notice-id}")
  public ResponseEntity patchNotice(
    @PathVariable("notice-id") long noticeId,
    @RequestBody NoticeDto.Patch dto,
    @AuthenticationPrincipal PrincipalDetails principalDetails){

    noticeService.updateNotice(noticeId, dto,principalDetails);
    NoticeDto.Response notice = noticeService.findNotice(noticeId);

    return new ResponseEntity<>(notice, HttpStatus.OK);
  }

  //  Delete
  @DeleteMapping("{notice-id}")
  public ResponseEntity deleteNotice(
    @PathVariable("notice-id") long noticeId,
    @AuthenticationPrincipal PrincipalDetails principalDetails){
    noticeService.deleteNotice(noticeId,principalDetails);
    return new ResponseEntity(HttpStatus.NO_CONTENT);
  }

}
