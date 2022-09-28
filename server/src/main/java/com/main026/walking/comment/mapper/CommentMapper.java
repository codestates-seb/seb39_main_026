package com.main026.walking.comment.mapper;

import com.main026.walking.comment.dto.CommentDto;
import com.main026.walking.comment.entity.Comment;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {
  
//  Post
  Comment postDtoToEntity(CommentDto.Post dto);

//  Patch
  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  void updateEntityFromDto(CommentDto.Patch dto, @MappingTarget Comment entity);

//  Response
  @Mapping(source = "id",target = "commentId")
  CommentDto.Response entityToDtoResponse(Comment comment);

  List<CommentDto.Response> multiEntityToDtoResponse(List<Comment> entities);
  
}
