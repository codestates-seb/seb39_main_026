package com.main026.walking.pet.entity;

import com.main026.walking.member.entity.Member;
import com.main026.walking.pet.dto.PetDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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
    private Integer petAge;
    private String personality;
    private String breed;
    private String about;
    private String imgUrl;

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
