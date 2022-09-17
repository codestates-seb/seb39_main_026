package com.main026.walking.member.dto;

import com.main026.walking.member.entity.Member;
import com.main026.walking.pet.dto.PetDto;
import com.main026.walking.util.dto.Address;
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

        private String si;
        private String gu;
        private String dong;

        public void setPassword(String password){
            this.password = password;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class Patch{
        private String password;
        private String nickName;

        private String si;
        private String gu;
        private String dong;

        private MultipartFile imgFile;

        @Builder
        public Patch(String password, String nickName, String si, String gu, String dong, MultipartFile imgFile) {
            this.password = password;
            this.nickName = nickName;
            this.si = si;
            this.gu = gu;
            this.dong = dong;
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
        private Address address;

        @Builder
        public Response(Long id, String email, String nickName,Address address, List<PetDto.Response> petResponseDtoList) {
            this.id = id;
            this.email = email;
            this.nickName = nickName;
            this.address = address;
            this.petResponseDtoList = petResponseDtoList;
        }

        public Response(Member member){
            this.id = member.getId();
            this.email = member.getEmail();
            this.nickName = member.getNickName();
            //this.petResponseDtoList = member.getPetList();
        }
    }
}
