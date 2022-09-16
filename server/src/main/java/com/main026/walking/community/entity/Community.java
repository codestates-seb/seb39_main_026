package com.main026.walking.community.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.main026.walking.comment.entity.Comment;
import com.main026.walking.member.entity.Member;
import com.main026.walking.notice.entity.Notice;
import com.main026.walking.pet.entity.CommunityPet;
import com.main026.walking.pet.entity.Pet;
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

//무한참조를 막아주는 어노테이션. TODO Dto를 응답함으로써 근본적인 해결이 필요함
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
@JsonIdentityReference(alwaysAsId = true)

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

  @Column//(nullable = false)
  private LocalDateTime time;

  @OneToOne(fetch = FetchType.LAZY)
  private Member representMember;

  @OneToMany(mappedBy = "community")
  private List<CommunityPet> communityPets = new ArrayList<>();

  @Column(nullable = false)
  private Long capacity;

  @Column//(columnDefinition = "long default 0L", nullable = true)
  private Long viewed = 0L;

  @Column//(columnDefinition = "long default 0L", nullable = true)
  private Long liked;

  private LocalDateTime createdAt;

  @OneToMany(mappedBy = "community")
  private List<Notice> notices = new ArrayList<>();

  @OneToMany(mappedBy = "community")
  private List<Comment> comments = new ArrayList<>();

  public void setComment(Comment comment){
    comments.add(comment);
    if(comment.getCommunity() != this){
      comment.setCommunity(this);
    }
  }
//  public void setNotice(Notice notice){
//    notices.add(notice);
//    if(notice.getCommunity() != this){
//      notice.setCommunity(this);
//    }
//  }
  public void countView(){
    viewed++;
  }
//  public void setPet(Pet pet){
//    pets.add(pet);
//    if(pet.getCommunity() != this){
//      pet.setCommunity(this);
//    }
//  }
}
