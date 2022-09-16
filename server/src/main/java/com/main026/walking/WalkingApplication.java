package com.main026.walking;

import com.main026.walking.member.repository.MemberRepository;
import com.main026.walking.util.datainit.InitData;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class WalkingApplication {

	public static void main(String[] args) {
		SpringApplication.run(WalkingApplication.class, args);
	}

	@Bean
	public InitData dataInit(MemberRepository memberRepository){
		return new InitData(memberRepository);
	}

}
