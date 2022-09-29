package com.main026.walking.auth.service;

import com.main026.walking.auth.principal.PrincipalDetails;
import com.main026.walking.member.entity.Member;
import com.main026.walking.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;


@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;
    //private final BCryptPasswordEncoder passwordEncoder;

    //TODO 여기를 전혀 거치지 않는다.
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("################ OAuth2 로그인 및 가입 ################");
        OAuth2User oauth2User = super.loadUser(userRequest);

        String provider = userRequest.getClientRegistration().getClientId();
        String providerId = oauth2User.getAttribute("sub");
        String username = oauth2User.getAttribute("name");
        String email = oauth2User.getAttribute("email");
        String password = new BCryptPasswordEncoder().encode(oauth2User.getAttribute("sub"));

        Member member = memberRepository.findByEmail(email).orElseThrow();

        if(member==null){
            member = Member.builder()
                    .email(email)
                    .username(username)
                    .password(password)
                    .provider(provider)
                    .providerId(providerId)
                    .build();
            memberRepository.save(member);
        }

        return new PrincipalDetails(member,oauth2User.getAttributes());
    }
}
