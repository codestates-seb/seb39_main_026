package com.main026.walking.comment.service;

import com.main026.walking.comment.dto.CommentDto;
import com.main026.walking.comment.entity.Comment;
import com.main026.walking.comment.mapper.CommentMapper;
import com.main026.walking.comment.repository.CommentRepository;
import com.main026.walking.community.entity.Community;
import com.main026.walking.community.repository.CommunityRepository;
import com.main026.walking.member.entity.Member;
import com.main026.walking.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
  private final CommentMapper mapper;
  private final CommentRepository commentRepository;
  private final CommunityRepository communityRepository;

//  Create
  public Comment createComment(Long communityId,Comment comment,Member member) {
    Community community = communityRepository.findById(communityId).orElseThrow();
    comment.setCommunity(community);
    comment.setMember(member);
    return commentRepository.save(comment);
  }

//  Read
  public Comment findComment(long commentId){
    return findVerifiedComment(commentId);
  }

  public Page<Comment> findComments(int page, int size) {
    return commentRepository.findAll(PageRequest.of( page, size, Sort.by("commentId").descending()));
  }

//  Update
  public Comment updateComment(long commentId, CommentDto.Patch dto) {
    Comment comment = findVerifiedComment(commentId);
    mapper.updateEntityFromDto(dto, comment);

    return commentRepository.save(comment);
  }

//  Delete
  public void deleteComment(long commentId) {
    Comment comment = findVerifiedComment(commentId);
    commentRepository.delete(comment);
  }

//  Valid
  public Comment findVerifiedComment(long commentId) {
    Optional<Comment> optionalComment =
      commentRepository.findById(commentId);
    Comment findComment =
      optionalComment.orElseThrow(() -> new RuntimeException("COMMENT_NOT_FOUND"));

    return findComment;
  }
}
