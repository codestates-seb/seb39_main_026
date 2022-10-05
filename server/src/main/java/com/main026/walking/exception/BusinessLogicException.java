package com.main026.walking.exception;

import lombok.Getter;

public class BusinessLogicException extends RuntimeException{

    @Getter
    private ExceptionCode exceptionCode;

    public BusinessLogicException(ExceptionCode exceptionCode) {
        super(exceptionCode.getError());
        this.exceptionCode = exceptionCode;
    }
}
