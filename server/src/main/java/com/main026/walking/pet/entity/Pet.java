package com.main026.walking.pet.entity;

import com.main026.walking.member.entity.Member;
import com.main026.walking.pet.dto.PetDto;
import com.main026.walking.util.embedded.PetAge;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor
public class Pet {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String petName;
    private String petGender;
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
    private String neuter;
    //날짜 데이터를 받아서 동적으로 처리
    @Embedded
    private PetAge petAges;
    private String personality;
    private String breed;
    private String about;
    private String imgUrl;

    @OneToMany(mappedBy = "pet")
    private List<CommunityPet> communityPets = new ArrayList<>();

    @Builder
    public Pet(Long id, String petName, String petGender, Member member,PetAge petAges, String neuter, String personality, String breed, String about, String imgUrl) {
        this.id = id;
        this.petName = petName;
        this.petGender = petGender;
        this.member = member;
        this.neuter = neuter;
        this.petAges = petAges;
        this.personality = personality;
        this.breed = breed;
        this.about = about;
        this.imgUrl = imgUrl;
    }

    public void setMember(Member member){
        this.member = member;
    }

    public void setImgUrl(String imgUrl){
        this.imgUrl = imgUrl;
    }

    public void setPetAges(PetAge petAges){
        this.petAges = petAges;
    }


    public void update(PetDto.Patch patchDto) {
        this.petName = patchDto.getPerName();
        this.petGender = patchDto.getPetGender();
        this.neuter = patchDto.getNeuter();
        this.personality = patchDto.getPersonality();
        this.breed = patchDto.getBreed();
        this.about = patchDto.getAbout();
    }
}
