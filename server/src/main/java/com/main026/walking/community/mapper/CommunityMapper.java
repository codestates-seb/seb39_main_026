package com.main026.walking.community.mapper;

import com.main026.walking.comment.dto.CommentDto;
import com.main026.walking.comment.entity.Comment;
import com.main026.walking.community.dto.CommunityDto;
import com.main026.walking.community.entity.Community;
import com.main026.walking.image.entity.Image;
import com.main026.walking.member.dto.MemberDto;
import com.main026.walking.notice.dto.NoticeDto;
import com.main026.walking.notice.entity.Notice;
import com.main026.walking.pet.dto.PetDto;
import com.main026.walking.pet.entity.Pet;
import com.main026.walking.util.enums.Weeks;
import org.mapstruct.*;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface CommunityMapper {

//  Post
  Community postDtoToEntity(CommunityDto.Post dto);

//  Patch
//  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
//  void updateEntityFromDto(CommunityDto.Patch dto, @MappingTarget Community entity);

  // TODO 매퍼 최적화 필요
  default CommunityDto.Response entityToDtoResponse(Community entity){
    if (entity == null){
      return null;
    }
    CommunityDto.Response.ResponseBuilder response = CommunityDto.Response.builder();

    MemberDto.Response responseMemberDto = new MemberDto.Response(entity.getRepresentMember());

    response.communityId(entity.getId());
    response.name(entity.getName());
    response.address(entity.getAddress());
    response.body(entity.getBody());
    response.member(responseMemberDto);
    response.capacity(entity.getCapacity());
    response.time(entity.getTime());
    response.dateInfo(entity.getDate());

    List<String> dayInfo = new ArrayList<>();
    if (entity.getDates().size()!=0) {
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
    List<PetDto.Response> pets = new ArrayList<>();
    for (int i = 0; i< entity.getCommunityPets().size();i++){
      Pet pet = entity.getCommunityPets().get(i).getPet();
      MemberDto.Response responseDto = new MemberDto.Response(pet.getMember());

      pets.add(PetDto.Response.builder()
              .id(pet.getId())
              .about(pet.getAbout())
              .breed(pet.getBreed())
              .neuter(pet.getNeuter())
              .petAge(pet.getPetAge())
              .petGender(pet.getPetGender())
              .petName(pet.getPetName())
              .imgUrl(pet.getImgUrl())
              .member(responseDto)
              .build());
    }
    response.pets(pets);

    List<CommentDto.Response> comments = new ArrayList<>();
    for (int i = 0; i < entity.getComments().size(); i++) {
      Comment comment = entity.getComments().get(i);
      MemberDto.Response responseDto = new MemberDto.Response(comment.getMember());
      comments.add(CommentDto.Response.builder()
              .body(comment.getBody())
              .createdAt(comment.getCreatedAt())
              .member(responseDto)
              .build());
    }
    response.comments(comments);

    List<String> imageList = new ArrayList<>();
    for (int i = 0; i < entity.getImages().size(); i++) {
      Image image = entity.getImages().get(i);
      String storeFilename = image.getStoreFilename();
      imageList.add(storeFilename);
    }
    response.imgUrls(imageList);

    List<NoticeDto.Response> notices = new ArrayList<>();
    for (int i = 0; i < entity.getNotices().size(); i++) {
      Notice notice = entity.getNotices().get(i);
      notices.add(NoticeDto.Response.builder()
              .title(notice.getTitle())
              .body(notice.getBody())
              .build());
    }
    response.notices(notices);


    return response.build();
  }

  List<CommunityDto.Response> multiEntityToDtoInfo(List<Community> entities);
}
