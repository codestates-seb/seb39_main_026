package com.main026.walking.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_EXISTS(409, "Email already exists"),
    MEMBER_NOT_FOUND(404, "Member not found"),
    TOKEN_EXPIRED(401, "token is expired");


    @Getter
    private int statusCode;
    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.statusCode = code;
        this.message = message;
    }
}
