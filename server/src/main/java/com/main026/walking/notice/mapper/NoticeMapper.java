package com.main026.walking.notice.mapper;

import com.main026.walking.notice.dto.NoticeDto;
import com.main026.walking.notice.entity.Notice;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface NoticeMapper {

  //  Post
  Notice postDtoToEntity(NoticeDto.Post dto);

  //  Patch
  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  void updateEntityFromDto(NoticeDto.Patch dto, @MappingTarget Notice entity);

  //  Response
  /*
  @Mapping(target = "representMember", expression = "java(notice.getCommunity().getRepresentMember())")
  */
  @Mapping(source = "id",target = "noticeId")
  NoticeDto.Response entityToDtoResponse(Notice entity);

}
