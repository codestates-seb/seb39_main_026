package com.main026.walking.email.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MailDto {

    private String to;
    private String subject;
    private String content;
}
