package com.main026.walking.member.entity;

import com.main026.walking.comment.entity.Comment;
import com.main026.walking.member.dto.MemberDto;
import com.main026.walking.pet.entity.Pet;
import com.main026.walking.util.embedded.Address;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String password;
    private String nickName;
    @Embedded
    private Address address;
    private String imgUrl;
    @OneToMany(mappedBy = "member")
    private List<Pet> petList;

    //모임 목록은 펫리스트로 조회가능

    @OneToMany(mappedBy = "member")
    private List<Comment> commentList;

    @Builder
    public Member(Long id, String email, String password, String nickName, Address address, String imgUrl, List<Pet> petList, List<Comment> commentList) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.nickName = nickName;
        this.address = address;
        this.imgUrl = imgUrl;
        this.petList = petList;
        this.commentList = commentList;
    }

    public void update(MemberDto.Patch patchDto){
        this.password = patchDto.getPassword();
        this.nickName = patchDto.getNickName();
        this.address = new Address(patchDto.getSi(), patchDto.getGu(), patchDto.getDong());
    }

    public void setAddress(String si,String gu,String dong){
        this.address = new Address(si,gu,dong);
    }
}
