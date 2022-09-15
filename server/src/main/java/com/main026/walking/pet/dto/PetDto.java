package com.main026.walking.pet.dto;

import com.main026.walking.member.entity.Member;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

public class PetDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post{
        private String petName;
        private String petGender;
        private String neuter;
        private Integer petAge;
        private String personality;
        private String breed;
        private MultipartFile imgFile;
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
        private MultipartFile imgFile;
        private String about;

        @Builder
        public Patch(String perName, String petGender, String neuter, Integer petAge, String personality, String breed, MultipartFile imgFile, String about) {
            this.perName = perName;
            this.petGender = petGender;
            this.neuter = neuter;
            this.petAge = petAge;
            this.personality = personality;
            this.breed = breed;
            this.imgFile = imgFile;
            this.about = about;
        }
    }


    @Getter
    @NoArgsConstructor
    public static class Response{
        private Long petId;
        private String petName;
        private Member member;
        private String petGender;
        private String neuter;
        private Integer petAge;
        private String personality;
        private String breed;
        private String imgUrl;
        private String about;

        @Builder
        public Response(Long petId, String petName, Member member, String petGender, String neuter, Integer petAge, String personality, String breed, String imgUrl, String about) {
            this.petId = petId;
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
}
