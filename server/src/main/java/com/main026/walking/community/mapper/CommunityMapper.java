package com.main026.walking.community.mapper;

import com.main026.walking.community.dto.CommunityDto;
import com.main026.walking.community.entity.Community;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommunityMapper {

//  Post
  Community postDtoToEntity(CommunityDto.Post dto);

//  Patch
  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  void updateEntityFromDto(CommunityDto.Patch dto, @MappingTarget Community entity);

  //  Response
/*
  Pets, Comments, Members -> List<>.size() 매핑 어노테이션
  @Mapping(target = "petCount", expression = "java(community.getPets().size())")
  @Mapping(target = "commentCount", expression = "java(community.getComments().size())")
  @Mapping(target = "participant", expression = "java(community.getParticipant().size())")
*/
  CommunityDto.Response entityToDtoResponse(Community entity);

  List<CommunityDto.Info> multiEntityToDtoInfo(List<Community> entities);
}
