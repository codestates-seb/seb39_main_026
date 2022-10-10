package com.main026.walking.email.service;

import com.main026.walking.email.dto.MailDto;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Component
public class SimpleEmailSend {
    private final JavaMailSender javaMailSender;

    public SimpleEmailSend(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void send(MailDto mailDto) throws MessagingException {
        MimeMessage mailMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mailMessage, "UTF-8");

        mimeMessageHelper.setTo(mailDto.getTo());
        mimeMessageHelper.setSubject(mailDto.getSubject());
        mimeMessageHelper.setText(mailDto.getContent(),true);
        javaMailSender.send(mailMessage);
        System.out.println("Sent simple email!");
    }
}
