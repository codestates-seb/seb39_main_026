package com.main026.walking.comment.controller;

import com.main026.walking.auth.principal.PrincipalDetails;
import com.main026.walking.comment.dto.CommentDto;
import com.main026.walking.comment.entity.Comment;
import com.main026.walking.comment.mapper.CommentMapper;
import com.main026.walking.comment.service.CommentService;
import com.main026.walking.member.entity.Member;
import com.main026.walking.util.response.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {
    private final CommentMapper commentMapper;
    private final CommentService commentService;

    //  Create
    @PostMapping("/post/{communityId}")
    public ResponseEntity postComment(@PathVariable Long communityId, @RequestBody CommentDto.Post dto, @AuthenticationPrincipal PrincipalDetails principalDetails) {

        Member member = principalDetails.getMember();
        Comment comment = commentMapper.postDtoToEntity(dto);

        Comment createdComment = commentService.createComment(communityId, comment, member);

        return new ResponseEntity(commentMapper.entityToDtoResponse(createdComment), HttpStatus.CREATED);
    }

    //  Read
    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(
            @PathVariable("comment-id") long commentId) {
        Comment comment = commentService.findComment(commentId);

        return new ResponseEntity(commentMapper.entityToDtoResponse(comment), HttpStatus.OK);
    }

//    @GetMapping
//    public ResponseEntity getComments(
//            @RequestParam(value = "page", defaultValue = "1") int page,
//            @RequestParam(value = "size", defaultValue = "10") int size) {
//
//        Page<Comment> commentPage = commentService.findComments(page - 1, size);
//
//        List<Comment> comments = commentPage.getContent();
//
//        return new ResponseEntity(new MultiResponseDto<>(commentMapper.multiEntityToDtoResponse(comments), commentPage), HttpStatus.OK);
//    }

    //  Update
    @PatchMapping("{comment-id}")
    public ResponseEntity patchComment(
            @PathVariable("comment-id") long commentId,
            @RequestBody CommentDto.Patch dto) {

        commentService.updateComment(commentId, dto);
        Comment comment = commentService.findComment(commentId);

        return new ResponseEntity<>(commentMapper.entityToDtoResponse(comment), HttpStatus.OK);
    }

    //  Delete
    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(
            @PathVariable("comment-id") long commentId) {
        commentService.deleteComment(commentId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
