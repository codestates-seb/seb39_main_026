package com.main026.walking.pet.entity;

import com.main026.walking.member.entity.Member;
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
    private String petAge;
    private String personality;
    private String breed;
    private String about;
    private String imgUrl;

    @Builder
    public Pet(Long id, String petName, String petGender, Member member, String neuter, String petAge, String personality, String breed, String about, String imgUrl) {
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
}
