package com.main026.walking.member.entity;

import com.main026.walking.comment.entity.Comment;
import com.main026.walking.image.entity.Image;
import com.main026.walking.member.dto.MemberDto;
import com.main026.walking.pet.entity.Pet;
import com.main026.walking.util.embedded.Address;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String password;
    private String username;
    @Embedded
    private Address address;
    private String imgUrl;
    @Enumerated(value = EnumType.STRING)
    private Role roles;
    @OneToMany(mappedBy = "member", fetch = FetchType.EAGER)
    private List<Pet> petList = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    private List<Comment> commentList = new ArrayList<>();
    private String provider;
    private String providerId;

    @Builder
    public Member(Long id, String email, String password, String username, Address address, String imgUrl,String provider,String providerId) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.username = username;
        this.address = address;
        this.imgUrl = imgUrl;
        this.roles = roles==null?Role.ROLE_USER:roles;
        this.provider = provider;
        this.providerId = providerId;
    }

    public void update(MemberDto.Patch patchDto){
        this.password = patchDto.getPassword();
        this.username = patchDto.getUsername();
        this.address = new Address(patchDto.getSi(), patchDto.getGu(), patchDto.getDong());
        this.imgUrl = patchDto.getProfileImg();
    }

    public void update(String name, String picture){
        this.username = name;
        this.imgUrl = picture;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public void setImgUrl(String imgUrl){
        this.imgUrl = imgUrl;
    }

    public void setRoles(){
        this.roles = Role.ROLE_USER;
    }

    public void setAddress(String si,String gu,String dong){
        this.address = new Address(si,gu,dong);
    }

    @Getter
    public enum Role {

        ROLE_ADMIN("관리자"), ROLE_USER("일반사용자");

        private String description;

        Role(String description) {
            this.description = description;
        }
    }
}
