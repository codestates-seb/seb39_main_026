package com.main026.walking.member.entity;

import com.main026.walking.member.dto.MemberDto;
import com.main026.walking.pet.entity.Pet;
import lombok.AllArgsConstructor;
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
    private String address;
    private String imgUrl;
    @OneToMany(mappedBy = "member")
    private List<Pet> petList;

    @Builder
    public Member(Long id, String email, String password, String nickName, String address, String imgUrl, List<Pet> petList) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.nickName = nickName;
        this.address = address;
        this.imgUrl = imgUrl;
        this.petList = petList;
    }

    public void update(MemberDto.Patch patchDto){
        this.password = patchDto.getPassword();
        this.nickName = patchDto.getNickName();
        this.address = patchDto.getAddress();
    }
}
