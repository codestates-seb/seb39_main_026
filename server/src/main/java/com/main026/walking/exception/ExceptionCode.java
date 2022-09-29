package com.main026.walking.exception;

import lombok.Getter;

public enum ExceptionCode {
    EMAIL_EXISTS(409, "Email already exists"),
    USERNAME_EXISTS(409, "Username already exists"),
    MEMBER_NOT_FOUND(404, "Member not found"),
    PET_NOT_FOUND(404, "Pet not found"),
    NO_AUTHORIZATION(401,"You don't have authority"),
    INVALID_AUTHORIZATION(401,"Authorization is invalid"),
    FILE_NOT_FOUND(404,"Can not found attached file"),
    FILE_UPLOAD_FAILED(400,"Can not upload file"),
    COMMUNITY_NOT_FOUND(404,"Community not found"),
    CAPACITY_FULL(409,"Capacity has already been full"),
    OVERBOOKED(409,"OVERBOOKED"),
    TOKEN_EXPIRED(401, "Token is expired");

    @Getter
    private int status;
    @Getter
    private String error;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.error = message;
    }
}
