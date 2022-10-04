package com.main026.walking.community.entity;

import com.main026.walking.comment.entity.Comment;
import com.main026.walking.community.dto.CommunityDto;
import com.main026.walking.image.entity.Image;
import com.main026.walking.member.entity.Member;
import com.main026.walking.notice.entity.Notice;
import com.main026.walking.pet.entity.CommunityPet;
import com.main026.walking.pet.entity.Pet;
import com.main026.walking.util.converter.StringArrayConverter;
import com.main026.walking.util.embedded.Address;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
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

    private String place;

    @OneToMany(mappedBy = "community",cascade = CascadeType.ALL)
    private List<Image> images = new ArrayList<>();

    //요일로 받았을때
    @Convert(converter = StringArrayConverter.class)
    private List<String> dates;

    //날짜로 받았을때
    private String date;

    //시간정보
    private String time;

    @OneToOne
    private Member representMember;

    @OneToMany(mappedBy = "community",cascade = CascadeType.ALL)
    private List<CommunityPet> communityPets = new ArrayList<>();

    @Column(nullable = false)
    private Integer capacity;

    @Column//(columnDefinition = "long default 0L", nullable = true)
    private Long viewed = 0L;

    @Column//(columnDefinition = "long default 0L", nullable = true)
    private Long liked = 0L;

    private LocalDateTime createdAt;

    @OneToOne(mappedBy = "community")
    private Notice notice;

    @OneToMany(mappedBy = "community",cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    public void setComment(Comment comment) {
        comments.add(comment);
        if (comment.getCommunity() != this) {
            comment.setCommunity(this);
        }
    }

    public void countView() {
        this.viewed++;
    }

    public void update(CommunityDto.Patch patchDto) {
        this.name = patchDto.getName();
        this.address = new Address(patchDto.getSi(), patchDto.getGu(), patchDto.getDong());
        this.body = patchDto.getBody();
        this.capacity = patchDto.getCapacity();
        this.place = patchDto.getPlace();
    }

    public void setAddress(String si, String gu, String dong) {
        this.address = new Address(si, gu, dong);
    }

    public void addPet(CommunityPet communityPet) {
        this.communityPets.add(communityPet);
    }

    @Builder
    public Community(Long id, String name, String body, Address address, String place, List<String> dates, String date, String time, Member representMember, Integer capacity, Long viewed, Long liked, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.body = body;
        this.address = address;
        this.place = place;
        this.dates = dates;
        this.date = date;
        this.time = time;
        this.representMember = representMember;
        this.capacity = capacity;
        this.viewed = viewed==null?0L:viewed;
        this.liked = liked==null?0L:liked;
        this.createdAt = createdAt;
    }
}

