package com.main026.walking.comment.dto;

import lombok.AllArgsConstructor;
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
  public static class Response{
    private String body;
    private LocalDateTime createdAt;
    private String author;
  }
}
