package com.main026.walking.comment.entity;

import com.main026.walking.community.entity.Community;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Comment {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  private String body;

  private LocalDateTime createdAt;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "COMMUNITY_ID")
  private Community community;

  public void setCommunity(Community community) {
    this.setCommunity(community);
  }

/*
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "MEMBER_ID")
  private Member member;

  public void setMember(Member member) {
    this.setMember(member);
  }
*/
}
