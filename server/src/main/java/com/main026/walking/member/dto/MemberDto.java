package com.main026.walking.member.dto;

import com.main026.walking.pet.dto.PetDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

public class MemberDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post{
        private String email;
        private String password;
        private String nickName;
        private String address;

        public void setPassword(String password){
            this.password = password;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class Patch{
        private String password;
        private String nickName;
        private String address;
        private MultipartFile imgFile;

        @Builder
        public Patch(String password,String nickName, String address, MultipartFile imgFile){
            this.password = password;
            this.nickName = nickName;
            this.address = address;
            this.imgFile = imgFile;
        }

    }
    @Getter
    @NoArgsConstructor
    public static class Response{
        private Long id;
        private String email;
        private String nickName;
        private List<PetDto.Response> petResponseDtoList = new ArrayList<>();
        //private List<CommunityDto.Response> communityList = new ArrayList<>();

        @Builder
        public Response(Long id, String email, String nickName, List<PetDto.Response> petResponseDtoList) {
            this.id = id;
            this.email = email;
            this.nickName = nickName;
            this.petResponseDtoList = petResponseDtoList;
        }
    }
}
