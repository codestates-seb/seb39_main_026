package com.main026.walking.comment.service;

import com.main026.walking.auth.principal.PrincipalDetails;
import com.main026.walking.comment.dto.CommentDto;
import com.main026.walking.comment.entity.Comment;
import com.main026.walking.comment.mapper.CommentMapper;
import com.main026.walking.comment.repository.CommentRepository;
import com.main026.walking.community.entity.Community;
import com.main026.walking.community.repository.CommunityRepository;
import com.main026.walking.exception.BusinessLogicException;
import com.main026.walking.exception.ExceptionCode;
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
    public CommentDto.Response createComment(Long communityId, CommentDto.Post dto, PrincipalDetails principalDetails) {
        Comment comment = mapper.postDtoToEntity(dto);

        Member member = principalDetails.getMember();
        Community community = communityRepository.findById(communityId).orElseThrow();

        comment.setCommunity(community);
        comment.setMember(member);

        Comment createdComment = commentRepository.save(comment);

        return mapper.entityToDtoResponse(createdComment);
    }

    //  Read
    public CommentDto.Response findComment(long commentId) {
        Comment verifiedComment = findVerifiedComment(commentId);
        return mapper.entityToDtoResponse(verifiedComment);
    }

    public Page<Comment> findComments(int page, int size) {
        return commentRepository.findAll(PageRequest.of(page, size, Sort.by("commentId").descending()));
    }

    //  Update
    public CommentDto.Response updateComment(long commentId, CommentDto.Patch dto,PrincipalDetails principalDetails) {
        authorization(principalDetails,commentId);

        Comment comment = findVerifiedComment(commentId);
        mapper.updateEntityFromDto(dto, comment);
        Comment savedComment = commentRepository.save(comment);
        return mapper.entityToDtoResponse(savedComment);
    }

    //  Delete
    public void deleteComment(PrincipalDetails principalDetails,long commentId) {
        authorization(principalDetails,commentId);
        commentRepository.deleteById(commentId);
    }

    //  Valid
    private Comment findVerifiedComment(long commentId) {
        Optional<Comment> optionalComment =
                commentRepository.findById(commentId);
        Comment findComment =
                optionalComment.orElseThrow(() -> new RuntimeException("COMMENT_NOT_FOUND"));

        return findComment;
    }

    public void authorization(PrincipalDetails principalDetails, Long commentId) {
        Long memberId = principalDetails.getMember().getId();
        Long commentMemberId = commentRepository.findById(commentId).orElseThrow().getMember().getId();
        if (memberId != commentMemberId) {
            throw new BusinessLogicException(ExceptionCode.NO_AUTHORIZATION);
        }
    }

}
