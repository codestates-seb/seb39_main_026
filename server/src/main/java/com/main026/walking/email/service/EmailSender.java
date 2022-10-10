package com.main026.walking.email.service;

import com.main026.walking.email.dto.MailDto;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;

@Service
public class EmailSender {
    private final SimpleEmailSend emailSend;

    public EmailSender(SimpleEmailSend emailSend) {
        this.emailSend = emailSend;
    }

    private String subject = "[ㅅㅊ] 임시 비밀번호를 발급해드립니다.";

    public void sendEmail(String to, String password) throws GeneralSecurityException, UnsupportedEncodingException {
        try {
            String context = "임시 비밀번호는 [" + password + "]입니다.";
            MailDto mailDto = new MailDto(to,subject,context);
            emailSend.send(mailDto);
        } catch (MessagingException e) {
            throw new RuntimeException("메일 전송에 실패했습니다");
        }
    }
}
