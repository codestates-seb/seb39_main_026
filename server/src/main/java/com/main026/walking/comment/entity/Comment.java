package com.main026.walking.comment.entity;

import com.main026.walking.community.entity.Community;
import com.main026.walking.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @Builder
    public Comment(long id, String body, LocalDateTime createdAt, Community community, Member member) {
        this.id = id;
        this.body = body;
        this.createdAt = createdAt;
        this.community = community;
        this.member = member;
    }
}
