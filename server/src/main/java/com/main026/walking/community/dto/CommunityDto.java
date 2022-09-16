package com.main026.walking.community.dto;

import com.main026.walking.comment.dto.CommentDto;
import com.main026.walking.member.dto.MemberDto;
import com.main026.walking.notice.dto.NoticeDto;
import com.main026.walking.pet.dto.PetDto;
import com.main026.walking.util.dto.Address;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

public class CommunityDto {

  @Getter
  @AllArgsConstructor @NoArgsConstructor
  public static class Post{
    private String name;
    /**
     * Todo 주소를 받아야한다.
     * 시,구,동을 받아야하는데 나눠서 받는 방법 외에 또 있을까?
     * 정규표현식을 이용해서 나누는 것은 정말 비효율적인 코드라고한다.
     */
    private String si;
    private String gu;
    private String dong;

    private String body;
    private Long capacity;
    private LocalDateTime time;
    private String imgUrl;
    private LocalDateTime createdAt = LocalDateTime.now();
  }

  @Getter
  @AllArgsConstructor @NoArgsConstructor
  public static class Patch{
    private String name;

    //Todo 주소를 받는 방법을 더 좋게 할 수 있을까?
    private String si;
    private String gu;
    private String dong;

    private String body;
    private Long capacity;
    private LocalDateTime time;
    private String imgUrl;
  }

  @Getter
  @AllArgsConstructor @NoArgsConstructor
  @Builder
  public static class Response{
    private String name;
    private Address address;
    private String body;
    private Long capacity;
    private LocalDateTime time;
    private MemberDto.Response member;
    private String imgUrl;
    private List<PetDto.Response> pets;
    private List<CommentDto.Response> comments;
    private List<NoticeDto.Response> notices;
    private int participant;
    private LocalDateTime createdAt;
    private Long viewed;
    private Long liked;
  }

  //Todo 정보를 따로 보여주는 dto가 필요한가? 에 대한고민
//  @Getter
//  @AllArgsConstructor
//  public static class Info{
//    private String name;
//    private String address;
//    private String body;
//    private Long capacity;
//    private LocalDateTime time;
//    private String imgUrl;
//  }
}