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
import org.springframework.security.access.method.P;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    //  Create
    @PostMapping("/post/{communityId}")
    public ResponseEntity postComment(@PathVariable Long communityId, @RequestBody CommentDto.Post dto, @AuthenticationPrincipal PrincipalDetails principalDetails) {


        CommentDto.Response comment = commentService.createComment(communityId, dto, principalDetails);

        return new ResponseEntity(comment, HttpStatus.CREATED);
    }

    //  Read
    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(
            @PathVariable("comment-id") long commentId) {
        CommentDto.Response comment = commentService.findComment(commentId);

        return new ResponseEntity(comment, HttpStatus.OK);
    }

    //  Update
    @PatchMapping("{comment-id}")
    public ResponseEntity patchComment(
            @PathVariable("comment-id") long commentId,
            @RequestBody CommentDto.Patch dto,
            @AuthenticationPrincipal PrincipalDetails principalDetails) {

        CommentDto.Response response = commentService.updateComment(commentId, dto,principalDetails);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //  Delete
    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(
            @PathVariable("comment-id") long commentId,
            @AuthenticationPrincipal PrincipalDetails principalDetails) {
        commentService.deleteComment(principalDetails,commentId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
