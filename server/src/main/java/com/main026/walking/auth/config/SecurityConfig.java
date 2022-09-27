package com.main026.walking.auth.config;

import com.main026.walking.auth.service.CustomOAuth2UserService;
import com.main026.walking.auth.filter.JwtAuthenticationFilter;
import com.main026.walking.auth.filter.JwtAuthorizationFilter;
import com.main026.walking.auth.filter.JwtExceptionFilter;
import com.main026.walking.auth.jwt.JwtUtils;
import com.main026.walking.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@Order(3)
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final MemberRepository memberRepository;
    private final JwtUtils jwtUtils;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http.csrf().disable();
        http.headers().frameOptions().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http
                .formLogin().disable()
                .httpBasic().disable()
                .apply(new CustomDsl())
                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST,"/community/**","/comment/**","/pets/**","/notice/**").access("hasRole('ROLE_USER')")
                .antMatchers(HttpMethod.PATCH,"/members/**","/community/**","/pets/**","/comment/**","/notice/**").access("hasRole('ROLE_USER')")
                .antMatchers(HttpMethod.DELETE,"/members/**","/community/**","/pets/**","/comment/**","/notice/**").access("hasRole('ROLE_USER')")
                .anyRequest().permitAll()
                .and()
                .exceptionHandling()
                .and()
                .oauth2Login().loginPage("/members/login")
                .userInfoEndpoint()//코드를 받고, 토큰을 전달하는 과정을 알아서 해달라
                .userService(customOAuth2UserService);

        return http.build();
    }

    public class CustomDsl extends AbstractHttpConfigurer<CustomDsl,HttpSecurity>{


        @Override
        public void configure(HttpSecurity builder) throws Exception{
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
            final JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager,jwtUtils);
            final JwtExceptionFilter jwtExceptionFilter = new JwtExceptionFilter();

            jwtAuthenticationFilter.setFilterProcessesUrl("/members/login");
            builder
                    .addFilterBefore(jwtExceptionFilter,JwtAuthenticationFilter.class)
                    .addFilter(corsFilter())
                    .addFilter(jwtAuthenticationFilter)
                    .addFilter(new JwtAuthorizationFilter(authenticationManager,memberRepository,jwtUtils));
        }
    }

    public CorsFilter corsFilter(){
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        config.addExposedHeader("Authorization");
        config.addExposedHeader("refresh_token");
        config.addExposedHeader("Email");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
