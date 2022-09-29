package com.main026.walking.comment.dto;

import com.main026.walking.member.dto.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class CommentDto {

  @Getter
  @AllArgsConstructor @NoArgsConstructor
  public static class Post{
    private String body;
    private LocalDateTime createdAt = LocalDateTime.now();
  }

  @Getter
  @AllArgsConstructor @NoArgsConstructor
  public static class Patch{
    private String body;
  }

  @Getter
  @AllArgsConstructor @NoArgsConstructor
  @Builder
  public static class Response{
    private Long commentId;
    private String body;
    private LocalDateTime createdAt;
    private MemberDto.compactResponse member;
  }
}
