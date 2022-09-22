package com.main026.walking.auth.config;

import com.main026.walking.auth.jwt.JwtUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UtilsConfig {
    @Bean
    public JwtUtils jwtUtils(){
        return new JwtUtils();
    }
}
