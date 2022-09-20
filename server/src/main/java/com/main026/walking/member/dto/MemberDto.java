package com.main026.walking.member.dto;

import com.main026.walking.member.entity.Member;
import com.main026.walking.pet.dto.PetDto;
import com.main026.walking.util.embedded.Address;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class MemberDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post{
        private String email;
        private String password;
        private String username;

        private String si;
        private String gu;
        private String dong;

        private MultipartFile profileImg;

        public void setPassword(String password){
            this.password = password;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class Patch{
        private String password;
        private String username;

        private String si;
        private String gu;
        private String dong;

        private MultipartFile profileImg;

        @Builder
        public Patch(String password, String username, String si, String gu, String dong, MultipartFile profileImg) {
            this.password = password;
            this.username = username;
            this.si = si;
            this.gu = gu;
            this.dong = dong;
            this.profileImg = profileImg;
        }
    }
    @Getter
    @NoArgsConstructor
    public static class Response{
        private Long id;
        private String email;
        private String username;
        private List<PetDto.compactResponse> petList = new ArrayList<>();
        private Address address;

        @Builder
        public Response(Long id, String email, String username,Address address, List<PetDto.compactResponse> petList) {
            this.id = id;
            this.email = email;
            this.username = username;
            this.address = address;
            this.petList = petList;
        }

        public Response(Member member){
            this.id = member.getId();
            this.email = member.getEmail();
            this.username = member.getUsername();
        }
    }
}
