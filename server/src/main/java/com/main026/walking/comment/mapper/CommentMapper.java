package com.main026.walking.comment.mapper;

import com.main026.walking.comment.dto.CommentDto;
import com.main026.walking.comment.entity.Comment;
import com.main026.walking.member.mapper.MemberMapperV2;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE,uses = MemberMapperV2.class)
public abstract class CommentMapper {
  
//  Post
  public abstract Comment postDtoToEntity(CommentDto.Post dto);

//  Patch
  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  public abstract void updateEntityFromDto(CommentDto.Patch dto, @MappingTarget Comment entity);

//  Response
  @Mapping(source = "id",target = "commentId")
  public abstract CommentDto.Response entityToDtoResponse(Comment comment);

  public abstract List<CommentDto.Response> multiEntityToDtoResponse(List<Comment> entities);
  
}
