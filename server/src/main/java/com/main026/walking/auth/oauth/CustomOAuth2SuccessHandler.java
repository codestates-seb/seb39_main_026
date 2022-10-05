package com.main026.walking.auth.oauth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.main026.walking.auth.jwt.JwtUtils;
import com.main026.walking.auth.principal.PrincipalDetails;
import com.main026.walking.member.entity.Member;
import com.main026.walking.member.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
@Slf4j
public class CustomOAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private JwtUtils jwtUtils;
    private MemberRepository memberRepository;


    public CustomOAuth2SuccessHandler(JwtUtils jwtUtils, MemberRepository memberRepository) {
        this.jwtUtils = jwtUtils;
        this.memberRepository = memberRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        Member member = principalDetails.getMember();
        log.info(member.getUsername()+" 의 OAuth2 로그인 성공");

        Long memberId = member.getId();
        String email = member.getEmail();

        String accessToken = jwtUtils.createAccessToken(memberId, email);
        String refreshToken = jwtUtils.createRefreshToken(memberId, email);

        response.addHeader("Authorization", accessToken);
        response.addHeader("refresh_token",refreshToken);

        getRedirectStrategy().sendRedirect(request,response,"https://sancheck.main026.shop");
        //response.getWriter().write("memberId : "+ memberId);
    }
}
