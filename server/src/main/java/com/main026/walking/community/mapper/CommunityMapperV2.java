package com.main026.walking.community.mapper;

import com.main026.walking.comment.dto.CommentDto;
import com.main026.walking.comment.entity.Comment;
import com.main026.walking.community.dto.CommunityDto;
import com.main026.walking.community.entity.Community;
import com.main026.walking.image.entity.Image;
import com.main026.walking.member.dto.MemberDto;
import com.main026.walking.notice.dto.NoticeDto;
import com.main026.walking.pet.dto.PetDto;
import com.main026.walking.pet.entity.Pet;
import com.main026.walking.util.awsS3.AwsS3Service;
import com.main026.walking.util.enums.Weeks;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public abstract class CommunityMapperV2 {
    @Autowired
    AwsS3Service awsS3Service;

    //  Post
    public abstract Community postDtoToEntity(CommunityDto.Post dto);

    // TODO 매퍼 최적화 필요
    public CommunityDto.Response entityToDtoResponse(Community entity) {
        if (entity == null) {
            return null;
        }
        CommunityDto.Response.ResponseBuilder response = CommunityDto.Response.builder();

        MemberDto.compactResponse responseMemberDto = new MemberDto.compactResponse(entity.getRepresentMember());
        responseMemberDto.setImgUrl(awsS3Service.getFileURL(responseMemberDto.getImgUrl()));

        response.communityId(entity.getId());
        response.name(entity.getName());
        response.address(entity.getAddress());
        response.place(entity.getPlace());
        response.body(entity.getBody());
        response.member(responseMemberDto);
        response.capacity(entity.getCapacity());
        response.time(entity.getTime());
        response.dateInfo(entity.getDate());

        List<String> dayInfo = new ArrayList<>();

        if (entity.getDates() != null) {
            for (String date : entity.getDates()) {
                String korean = Weeks.valueOf(date).getKorean();
                dayInfo.add(korean);
            }
        }
        response.dayInfo(dayInfo);

        response.participant(entity.getCommunityPets().size());
        response.createdAt(entity.getCreatedAt());
        response.viewed(entity.getViewed());
        response.liked(entity.getLiked());

        List<PetDto.compactResponse> pets = new ArrayList<>();

        for (int i = 0; i < entity.getCommunityPets().size(); i++) {
            Pet pet = entity.getCommunityPets().get(i).getPet();
            PetDto.compactResponse compactResponse = new PetDto.compactResponse(pet);
            compactResponse.setImgUrl(awsS3Service.getFileURL(compactResponse.getImgUrl()));
            pets.add(compactResponse);
        }

        response.communityPetList(pets);

        List<CommentDto.Response> comments = new ArrayList<>();
        for (int i = 0; i < entity.getComments().size(); i++) {
            Comment comment = entity.getComments().get(i);
            MemberDto.compactResponse responseDto = new MemberDto.compactResponse(comment.getMember());
            responseDto.setImgUrl(awsS3Service.getFileURL(responseDto.getImgUrl()));
            comments.add(CommentDto.Response.builder()
                    .commentId(comment.getId())
                    .body(comment.getBody())
                    .createdAt(comment.getCreatedAt())
                    .member(responseDto)
                    .build());
        }
        response.comments(comments);

        List<String> imageList = new ArrayList<>();
        for (int i = 0; i < entity.getImages().size(); i++) {
            Image image = entity.getImages().get(i);
            String storeFilename = awsS3Service.getFileURL(image.getStoreFilename());
            imageList.add(storeFilename);
        }
        response.imgUrls(imageList);


//        List<NoticeDto.Response> notices = new ArrayList<>();
//        for (int i = 0; i < entity.getNotices().size(); i++) {
//            Notice notice = entity.getNotices().get(i);
//            notices.add(NoticeDto.Response.builder()
//                    .title(notice.getTitle())
//                    .body(notice.getBody())
//                    .build());
//        }
        NoticeDto.Response notice = null;
        if(entity.getNotice()!=null) {
            entity.getNotice();
            notice = NoticeDto.Response.builder()
                    .noticeId(entity.getNotice().getId())
                    .title(entity.getNotice().getTitle())
                    .body(entity.getNotice().getBody())
                    .build();
        }
        response.notices(notice);

        return response.build();
    }

    public abstract List<CommunityDto.Response> multiEntityToDtoInfo(List<Community> entities);
}
