package com.main026.walking.community.dto;

import com.main026.walking.comment.dto.CommentDto;
import com.main026.walking.community.entity.Community;
import com.main026.walking.member.dto.MemberDto;
import com.main026.walking.notice.dto.NoticeDto;
import com.main026.walking.pet.dto.PetDto;
import com.main026.walking.util.embedded.Address;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class CommunityDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {
        private String name;

        private List<MultipartFile> Images = new ArrayList<>();

        /**
         * 시,구,동을 받아야하는데 나눠서 받는 방법 외에 또 있을까?
         * 영어명보다 좀 더 직관적이려고 한글발음을 썼는데 좀 아닌것같기도하다.
         */
        private String si;
        private String gu;
        private String dong;

        // TODO 추가!!, 검색조건 : 제목과 place sigudong 은 다른이야기
        private String place;

        private String body;
        private Integer capacity;

        //날짜로 받는 경우
        private String date;
        //요일로 받는 경우
        private String[] dates;

        private String time;

        private LocalDateTime createdAt = LocalDateTime.now();
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch {
        private String name;

        private String si;
        private String gu;
        private String dong;

        private String place;

        //날짜로 받는 경우
        private String date;
        //요일로 받는 경우
        private String[] dates;

        private String time;

        private String body;
        private Integer capacity;
        private String imgUrl;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {
        private Long communityId;
        private String name;
        private Address address;
        private String place;
        private String body;
        private Integer capacity;

        private List<String> dayInfo;
        private String dateInfo;
        private String time;

        //private List<String> weeks;
        private MemberDto.Response member;
        private List<String> imgUrls;
        private List<PetDto.compactResponse> memberPetList;
        private List<CommentDto.Response> comments;
        private List<NoticeDto.Response> notices;
        private Integer participant;
        private LocalDateTime createdAt;
        private Long viewed;
        private Long liked;


        /**Todo 커뮤니티 응답데이터에 세션회원의 정보를 담는게 맞는가?
         * 응답에 로그인된 회원의 정보가 담기는게 맞을까?
         * 로그인하지 않은 상태에서도 null 값이지만 정보가 들어가는 불필요함이 생긴다.
         */

        public void setPetList(List<PetDto.compactResponse> petList){
            this.memberPetList = petList;
        }
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class compactResponse{
        private Long communityId;
        private String name;
        private String place;

        private String time;

        private String representImgUrls;


        public compactResponse(Community community) {
            this.communityId = community.getId();
            this.name = community.getName();
            this.place = community.getPlace();
            this.time = community.getTime();
            if(community.getImages().size()!=0) {
                this.representImgUrls = community.getImages().get(0).getStoreFilename();
            }
        }
    }


}