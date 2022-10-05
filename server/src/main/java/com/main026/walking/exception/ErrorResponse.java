package com.main026.walking.exception;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorResponse {
    private int status;
    private String error;

    public ErrorResponse(ExceptionCode exceptionCode) {
        this.status = exceptionCode.getStatus();
        this.error = exceptionCode.getError();
    }
    public String convertToJson() throws JsonProcessingException {
        //Todo
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(this);
    }
}
