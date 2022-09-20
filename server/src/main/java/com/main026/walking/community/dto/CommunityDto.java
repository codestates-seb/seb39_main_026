package com.main026.walking.community.dto;

import com.main026.walking.comment.dto.CommentDto;
import com.main026.walking.member.dto.MemberDto;
import com.main026.walking.notice.dto.NoticeDto;
import com.main026.walking.pet.dto.PetDto;
import com.main026.walking.util.embedded.Address;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class CommunityDto {

  @Getter
  @AllArgsConstructor @NoArgsConstructor
  public static class Post{
    private String name;

    private List<MultipartFile> Images = new ArrayList<>();

    /**
     * 시,구,동을 받아야하는데 나눠서 받는 방법 외에 또 있을까?
     * 영어명보다 좀 더 직관적이려고 한글발음을 썼는데 좀 아닌것같기도하다.
     */
    private String si;
    private String gu;
    private String dong;

    private String body;
    private Integer capacity;

    //날짜로 받는 경우
    private String date;
    //요일로 받는 경우
    private String[] dates;

    private String time;

    private LocalDateTime createdAt = LocalDateTime.now();
  }

  @Getter
  @AllArgsConstructor @NoArgsConstructor
  public static class Patch{
    private String name;

    private String si;
    private String gu;
    private String dong;

    //날짜로 받는 경우
    private String date;
    //요일로 받는 경우
    private String[] dates;

    private String time;

    private String body;
    private Integer capacity;
    private String imgUrl;
  }

  @Getter
  @AllArgsConstructor @NoArgsConstructor
  @Builder
  public static class Response{
    private Long communityId;
    private String name;
    private Address address;
    private String body;
    private Integer capacity;

    private List<String> dayInfo;
    private String dateInfo;
    private String time;

    //private List<String> weeks;
    private MemberDto.Response member;
    private List<String> imgUrls;
    private List<PetDto.Response> pets;
    private List<CommentDto.Response> comments;
    private List<NoticeDto.Response> notices;
    private Integer participant;
    private LocalDateTime createdAt;
    private Long viewed;
    private Long liked;
  }
}