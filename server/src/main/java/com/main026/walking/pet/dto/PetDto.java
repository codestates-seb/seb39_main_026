package com.main026.walking.pet.dto;

import com.main026.walking.member.dto.MemberDto;
import com.main026.walking.pet.entity.Pet;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

public class PetDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post{
        private String petName;
        private String petGender;
        private MultipartFile profileImg;
        private String neuter;
        //TODO 강아지 나이 생일로 받기
        //private String birthDay;(2020-02-00생략가능)
        private Integer petAge;
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
        private Integer petAge;
        private String personality;
        private String breed;
        private MultipartFile profileImg;
        private String about;

        @Builder
        public Patch(String perName, String petGender, String neuter, Integer petAge, String personality, String breed, MultipartFile profileImg, String about) {
            this.perName = perName;
            this.petGender = petGender;
            this.neuter = neuter;
            this.petAge = petAge;
            this.personality = personality;
            this.breed = breed;
            this.profileImg = profileImg;
            this.about = about;
        }
    }


    @Getter
    @NoArgsConstructor
    public static class Response{
        private Long id;
        private String petName;
        private MemberDto.Response member;
        private String petGender;
        private String neuter;
        private Integer petAge;
        private String personality;
        private String breed;
        private String imgUrl;
        private String about;

        @Builder
        public Response(Long id, String petName, MemberDto.Response member, String petGender, String neuter, Integer petAge, String personality, String breed, String imgUrl, String about) {
            this.id = id;
            this.petName = petName;
            this.member = member;
            this.petGender = petGender;
            this.neuter = neuter;
            this.petAge = petAge;
            this.personality = personality;
            this.breed = breed;
            this.imgUrl = imgUrl;
            this.about = about;
        }

    }

    @Getter
    @NoArgsConstructor
    public static class compactResponse{
        private Long id;
        private String petName;
        private MemberDto.Response member;
        private String petGender;
        private Integer petAge;
        private String imgUrl;

        @Builder
        public compactResponse(Pet pet) {
            this.id = pet.getId();
            this.petName = pet.getPetName();
            this.member = new MemberDto.Response(pet.getMember());
            this.petGender = pet.getPetGender();
            this.petAge = pet.getPetAge();
            this.imgUrl = pet.getImgUrl();
        }
    }

}
