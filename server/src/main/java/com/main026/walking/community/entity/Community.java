package com.main026.walking.community.entity;

import com.main026.walking.comment.entity.Comment;
import com.main026.walking.community.dto.CommunityDto;
import com.main026.walking.image.entity.Image;
import com.main026.walking.member.entity.Member;
import com.main026.walking.notice.entity.Notice;
import com.main026.walking.pet.entity.CommunityPet;
import com.main026.walking.util.converter.StringArrayConverter;
import com.main026.walking.util.embedded.Address;
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

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private String body;

  @Column(nullable = false)
  @Embedded
  private Address address;

  @OneToMany(mappedBy = "community")
  private List<Image> images;

  /**Todo 저장되는 시간 정보가 너무 많다 줄일 수 없을까?
   * 일단 따로 해보자.
   * 요일의 경우 여러개가 선택될텐데 엔티티에는 리스트가 들어갈 수 없다.
  */
  //요일로 받았을때
  @Convert(converter = StringArrayConverter.class)
  private List<String> dates;
  //날짜로 받았을때
  private String date;
  //시간정보
  private String time;

  @OneToOne(fetch = FetchType.LAZY)
  private Member representMember;

  @OneToMany(mappedBy = "community")
  private List<CommunityPet> communityPets = new ArrayList<>();

  @Column(nullable = false)
  private Integer capacity;

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

  public void countView(){
    viewed++;
  }

  public void update(CommunityDto.Patch patchDto){
    this.name = patchDto.getName();
    this.address = new Address(patchDto.getSi(), patchDto.getGu(), patchDto.getDong());
    this.body = patchDto.getBody();
    this.capacity = patchDto.getCapacity();
    //this.weekInfo = patchDto.getTime();
    //this.imgUrl = patchDto.getImgUrl();
  }

  public void setAddress(String si,String gu,String dong){
    this.address = new Address(si,gu,dong);
  }
}
