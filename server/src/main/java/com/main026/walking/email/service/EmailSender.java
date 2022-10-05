package com.main026.walking.email.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;

@Service
public class EmailSender {
    private final JavaMailSender mailSender;
    private final SimpleEmailSend emailSend;

    public EmailSender(JavaMailSender mailSender, SimpleEmailSend emailSend) {
        this.mailSender = mailSender;
        this.emailSend = emailSend;
    }

    private String subject = "[ㅅㅊ] 임시 비밀번호를 발급해드립니다.";

    private String massageSuffix = "";


    public void sendEmail(String to, String password) throws GeneralSecurityException, UnsupportedEncodingException {
        try {
            String context = "임시 비밀번호는 ["+password+"]입니다.";
            emailSend.send(to, subject, context);
        } catch (MessagingException e) {
            throw new RuntimeException("메일 전송에 실패했습니다");
        }
    }
}
