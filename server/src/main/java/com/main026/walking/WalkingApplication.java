package com.main026.walking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class WalkingApplication {

	public static void main(String[] args) {
		SpringApplication.run(WalkingApplication.class, args);
	}

	@Bean
	public BCryptPasswordEncoder passwordEncoder(){
		return new BCryptPasswordEncoder();
	}

//	@Bean
//	public InitData dataInit(MemberRepository memberRepository,
//							 PetRepository petRepository,
//							 CommunityRepository communityRepository,
//							 CommunityPetRepository communityPetRepository,
//							 NoticeRepository noticeRepository,
//							 CommentRepository commentRepository,
//							 ImageRepository imageRepository,
//							 BCryptPasswordEncoder encoder){
//		return new InitData(
//				memberRepository,
//				petRepository,
//				communityRepository,
//				communityPetRepository,
//				noticeRepository,
//				commentRepository,
//				imageRepository,
//				encoder
//		);
//	}

}
