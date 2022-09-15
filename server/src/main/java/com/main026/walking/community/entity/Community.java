package com.main026.walking.community.entity;

import com.main026.walking.comment.entity.Comment;
import com.main026.walking.notice.entity.Notice;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Community {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true)
  private String name;

  @Column(nullable = false)
  private String title;

  @Column(nullable = false)
  private String body;

  @Column(nullable = false)
  private String address;

  private String imgUrl;

  @Column(nullable = false)
  private LocalDateTime time;

/*
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "MEMBER_ID")
  private Member representMember;

  public void setRepresentMember(Member member) {
    this.setMember(member);
  }

  @OneToMany(mappedBy = "community")
  private List<MemberCommunity> participant = new ArrayList<>();

  @OneToMany(mappedBy = "community")
  private List<Pet> pets = new ArrayList<>();

  public void setPet(Pet pet){
    pets.add(pet);
    if(pet.getCommunity() != this){
      pet.setCommunity(this);
    }
  }
*/

  @Column(nullable = false)
  private Long capacity;

  @Column(columnDefinition = "integer default 0", nullable = false)
  private Long viewed;

  public void countView(){
    viewed++;
  }

  @Column(columnDefinition = "integer default 0", nullable = false)
  private Long liked;

  private LocalDateTime createdAt;

  @OneToMany(mappedBy = "community")
  private List<Notice> notices = new ArrayList<>();

  public void setNotice(Notice notice){
    notices.add(notice);
    if(notice.getCommunity() != this){
      notice.setCommunity(this);
    }
  }

  @OneToMany(mappedBy = "community")
  private List<Comment> comments = new ArrayList<>();

  public void setComment(Comment comment){
    comments.add(comment);
    if(comment.getCommunity() != this){
      comment.setCommunity(this);
    }
  }
}
