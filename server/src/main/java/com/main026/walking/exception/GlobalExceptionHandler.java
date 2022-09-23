package com.main026.walking.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    //Todo 예외 추가
    @ExceptionHandler(BusinessLogicException.class)
    public ResponseEntity<ErrorResponse> tokenExpired(BusinessLogicException ex){
        ErrorResponse errorResponse = new ErrorResponse(ex.getExceptionCode());

        return new ResponseEntity<>(errorResponse, HttpStatus.valueOf(errorResponse.getStatus()));
    }
}
