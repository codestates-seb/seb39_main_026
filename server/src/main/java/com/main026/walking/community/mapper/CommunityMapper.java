package com.main026.walking.community.mapper;

import com.main026.walking.comment.dto.CommentDto;
import com.main026.walking.comment.entity.Comment;
import com.main026.walking.community.dto.CommunityDto;
import com.main026.walking.community.entity.Community;
import com.main026.walking.member.dto.MemberDto;
import com.main026.walking.member.entity.Member;
import com.main026.walking.pet.dto.PetDto;
import com.main026.walking.pet.entity.Pet;
import org.mapstruct.*;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommunityMapper {

//  Post
  Community postDtoToEntity(CommunityDto.Post dto);

//  Patch
  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  void updateEntityFromDto(CommunityDto.Patch dto, @MappingTarget Community entity);

  //  Response

  //Pets, Comments, Members -> List<>.size() 매핑 어노테이션
  //@Mapping(target = "petCount", expression = "java(community.getPets().size())")
  //@Mapping(target = "commentCount", expression = "java(community.getComments().size())")
  //@Mapping(target = "participant", expression = "java(community.getParticipant().size())")
  default CommunityDto.Response entityToDtoResponse(Community entity){
    if (entity == null){
      return null;
    }
    CommunityDto.Response.ResponseBuilder response = CommunityDto.Response.builder();

    response.name(entity.getName());
    response.address(entity.getAddress());
    response.title(entity.getTitle());
    response.body(entity.getBody());
    response.capacity(entity.getCapacity());
    response.time(entity.getTime());
    response.imgUrl(entity.getImgUrl());
    response.createdAt(entity.getCreatedAt());
    response.viewed(entity.getViewed());
    response.liked(entity.getLiked());
    List<PetDto.Response> pets = new ArrayList<>();
    for (int i = 0; i< entity.getCommunityPets().size();i++){
      Pet pet = entity.getCommunityPets().get(i).getPet();
      MemberDto.Response responseDto = new MemberDto.Response(pet.getMember());

      pets.add(PetDto.Response.builder()
              .petId(pet.getId())
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

    return response.build();
  }

  List<CommunityDto.Info> multiEntityToDtoInfo(List<Community> entities);
}
