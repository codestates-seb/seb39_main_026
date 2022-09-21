package com.main026.walking.pet.dto;

import com.main026.walking.community.dto.CommunityDto;
import com.main026.walking.member.dto.MemberDto;
import com.main026.walking.pet.entity.Pet;
import com.main026.walking.util.embedded.PetAge;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class PetDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post{
        private String petName;
        private String petGender;
        private MultipartFile profileImg;
        private String neuter;
        //TODO 날짜를 모를경우 01을 받게
        private String birthDay;
        private String personality;
        private String breed;
        private String about;
    }

    @Getter
    @NoArgsConstructor
    public static class Patch{
        private String perName;
        private String petGender;
        private String neuter;
        private String birthDay;
        private String personality;
        private String breed;
        private MultipartFile profileImg;
        private String about;

        @Builder
        public Patch(String perName, String petGender, String neuter,String birthDay, Integer petAge, String personality, String breed, MultipartFile profileImg, String about) {
            this.perName = perName;
            this.petGender = petGender;
            this.neuter = neuter;
            this.birthDay = birthDay;
            this.personality = personality;
            this.breed = breed;
            this.profileImg = profileImg;
            this.about = about;
        }
    }


    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response{
        private Long id;
        private String petName;
        private MemberDto.Response member;
        private String petGender;
        private String neuter;
        private PetAge petAges;
        private List<CommunityDto.compactResponse> petCommunityList;
        private String personality;
        private String breed;
        private String imgUrl;
        private String about;

    }

    @Getter
    @NoArgsConstructor
    public static class compactResponse{
        private Long id;
        private String petName;
        private MemberDto.Response member;
        private String petGender;
        private PetAge petAges;
        private String imgUrl;

        @Builder
        public compactResponse(Pet pet) {
            this.id = pet.getId();
            this.petName = pet.getPetName();
            this.member = new MemberDto.Response(pet.getMember());
            this.petGender = pet.getPetGender();
            this.petAges = pet.getPetAges();
            this.imgUrl = pet.getImgUrl();
        }
    }

}
