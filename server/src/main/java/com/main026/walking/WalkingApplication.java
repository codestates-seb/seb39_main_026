package com.main026.walking;

import com.main026.walking.comment.repository.CommentRepository;
import com.main026.walking.community.repository.CommunityRepository;
import com.main026.walking.member.repository.MemberRepository;
import com.main026.walking.notice.repository.NoticeRepository;
import com.main026.walking.pet.repository.CommunityPetRepository;
import com.main026.walking.pet.repository.PetRepository;
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
	public InitData dataInit(MemberRepository memberRepository,
							 PetRepository petRepository,
							 CommunityRepository communityRepository,
							 CommunityPetRepository communityPetRepository,
							 NoticeRepository noticeRepository,
							 CommentRepository commentRepository){
		return new InitData(
				memberRepository,
				petRepository,
				communityRepository,
				communityPetRepository,
				noticeRepository,
				commentRepository
		);
	}

}
