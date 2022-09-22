package com.main026.walking.auth.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.main026.walking.auth.jwt.JwtUtils;
import com.main026.walking.auth.principal.PrincipalDetails;
import com.main026.walking.exception.BusinessLogicException;
import com.main026.walking.exception.ExceptionCode;
import com.main026.walking.member.entity.Member;
import com.main026.walking.member.repository.MemberRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private MemberRepository memberRepository;
    private JwtUtils jwtUtils;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager,MemberRepository memberRepository) {
        super(authenticationManager);
        this.memberRepository = memberRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        System.out.println("인증이나 권한이 필요한 주소가 요청되었습니다.");

        String access_token = request.getHeader("Authorization");
        String refresh_token = request.getHeader("refresh_token");

        //엑세스 토큰이 없거나 형식에 맞지 않을때
        if(access_token == null || !access_token.startsWith("Bearer")) {
            chain.doFilter(request, response);
            System.out.println("헤더에 인증 정보가 없거나, 양식에 맞지 않은 요청입니다.");
            return;
        //엑세스 토큰이 만료되었다면?
        }else if(jwtUtils.isTokenExpired(JWT.decode(access_token.replace("Bearer ","")))){
            //거기에 리프레시 토큰도 없다면
            if(refresh_token==null||!refresh_token.startsWith("Bearer")){
            }else{//리프레시 토큰이 존재하는 경우
                refresh_token = refresh_token.replace("Bearer ","");
                DecodedJWT decodedRT = JWT.decode(refresh_token);
                //존재하는 리프레시 토큰이 만료된 경우
                if(jwtUtils.isTokenExpired(decodedRT)){
                    System.out.println("리프레시 토큰 만료");
                    throw new BusinessLogicException(ExceptionCode.TOKEN_EXPIRED);
                }else {//리프레시토큰으로 새로운 엑세스 토큰 발급
                    Map<String, Object> tokenMap = jwtUtils.getClaimsFromToken(refresh_token, "refresh");
                    String access = jwtUtils.createAccessToken((Long) tokenMap.get("id"), (String) tokenMap.get("email"));
                    response.setHeader("Authorization",access);

                    Member member = memberRepository.findByEmail((String) tokenMap.get("email")).orElseThrow();
                    PrincipalDetails principalDetails = new PrincipalDetails(member);
                    Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails,null,principalDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
            chain.doFilter(request,response);
        }else{//엑세스 토큰이 만료되지 않음
            access_token = access_token.replace("Bearer ", "");
            Map<String,Object> map = jwtUtils.getClaimsFromToken(access_token,"access");

            Member memberEntity = memberRepository.findByEmail((String) map.get("email")).orElseThrow();
            PrincipalDetails principalDetails = new PrincipalDetails(memberEntity);
            Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null,
                    principalDetails.getAuthorities()
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            chain.doFilter(request,response);
        }
    }
}
