package com.main026.walking.auth.service;

import com.main026.walking.auth.jwt.JwtUtils;
import com.main026.walking.auth.principal.PrincipalDetails;
import com.main026.walking.member.entity.Member;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;

@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        System.out.println("석세스 핸들러 통과");
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        var oauth2User = (OAuth2User) authentication.getPrincipal();

        //TODO 의존성주입
        JwtUtils jwtUtils = new JwtUtils();
        Member member = principalDetails.getMember();
        Long memberId = member.getId();
        String email = member.getEmail();
        String accessToken = jwtUtils.createAccessToken(memberId, email);
        String refreshToken = jwtUtils.createRefreshToken(memberId, email);

        response.addHeader("Authorization",accessToken);
        response.addHeader("refresh_token",refreshToken);
    }
}
