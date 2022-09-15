package com.main026.walking.notice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class NoticeDto {

  @Getter
  @AllArgsConstructor @NoArgsConstructor
  public static class Post{
    private String title;
    private String body;
  }

  @Getter
  @AllArgsConstructor @NoArgsConstructor
  public static class Patch{
    private String title;
    private String body;
  }

  @Getter
  @AllArgsConstructor
  public static class Response{
    private String title;
    private String body;
//    private Member representMember;
  }
}
