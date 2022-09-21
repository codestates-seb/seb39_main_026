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
    private String roles;
    @OneToMany(mappedBy = "member")
    private List<Pet> petList = new ArrayList<>();

    //모임 목록은 펫리스트로 조회가능

    @OneToMany(mappedBy = "member")
    private List<Comment> commentList;

    @Builder
    public Member(Long id, String email, String password, String username, Address address, String imgUrl) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.username = username;
        this.address = address;
        this.imgUrl = imgUrl;
    }

    public void update(MemberDto.Patch patchDto){
        this.password = patchDto.getPassword();
        this.username = patchDto.getUsername();
        this.address = new Address(patchDto.getSi(), patchDto.getGu(), patchDto.getDong());
    }

    public void setRole(String role){
        this.roles = role;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public void setImgUrl(String imgUrl){
        this.imgUrl = imgUrl;
    }

    public void setAddress(String si,String gu,String dong){
        this.address = new Address(si,gu,dong);
    }
    //TODO ENUM 으로 교체
    public List<String> getRoleList() {
        if(this.roles.length() > 0) {
            return Arrays.asList(this.roles.split(","));
        }
        return new ArrayList<>();
    }
}
