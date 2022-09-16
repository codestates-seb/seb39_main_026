package com.main026.walking.community.dto;

import com.main026.walking.comment.dto.CommentDto;
import com.main026.walking.pet.dto.PetDto;
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
    private String address;
    private String title;
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
    private String address;
    private String title;
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
    private String address;
    private String title;
    private String body;
    private Long capacity;
    private LocalDateTime time;
    private String imgUrl;
    private List<PetDto.Response> pets;
    private List<CommentDto.Response> comments;
    private int participant;
    private LocalDateTime createdAt;
    private Long viewed;
    private Long liked;
  }

  @Getter
  @AllArgsConstructor
  public static class Info{
    private String name;
    private String address;
    private String title;
    private String body;
    private Long capacity;
    private LocalDateTime time;
    private String imgUrl;
  }
}