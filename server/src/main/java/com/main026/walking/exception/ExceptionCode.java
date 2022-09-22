package com.main026.walking.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_EXISTS(409, "Member exists"),
    MEMBER_NOT_FOUND(404, "Member not found"),
    DISPLAY_NAME_EXISTS(409, "Member exists"),
    MEMBER_NOT_ACTIVE(409, "Member not active"),
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
