package com.main026.walking.pet.entity;

import com.main026.walking.member.entity.Member;
import com.main026.walking.pet.dto.PetDto;
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
    @JoinColumn(name = "memberId")
    private Member member;
    private String neuter;
    //날짜 데이터를 받아서 동적으로 처리
    private Integer petAge;
    private String personality;
    private String breed;
    private String about;
    private String imgUrl;

    @OneToMany(mappedBy = "pet")
    private List<CommunityPet> communityPets = new ArrayList<>();

    @Builder
    public Pet(Long id, String petName, String petGender, Member member, String neuter, Integer petAge, String personality, String breed, String about, String imgUrl) {
        this.id = id;
        this.petName = petName;
        this.petGender = petGender;
        this.member = member;
        this.neuter = neuter;
        this.petAge = petAge;
        this.personality = personality;
        this.breed = breed;
        this.about = about;
        this.imgUrl = imgUrl;
    }

    public void setMember(Member member){
        this.member = member;
    }


    public void update(PetDto.Patch patchDto) {
        this.petName = patchDto.getPerName();
        this.petGender = patchDto.getPetGender();
        this.neuter = patchDto.getNeuter();
        this.petAge = patchDto.getPetAge();
        this.personality = patchDto.getPersonality();
        this.breed = patchDto.getBreed();
        this.about = patchDto.getAbout();
    }
}
