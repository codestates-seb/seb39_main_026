package com.main026.walking.notice.dto;

import com.main026.walking.member.dto.MemberDto;
import com.main026.walking.member.entity.Member;
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
    private MemberDto.Response representMember;
  }
}
