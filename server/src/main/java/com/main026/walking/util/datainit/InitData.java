package com.main026.walking.util.datainit;

import com.main026.walking.member.entity.Member;
import com.main026.walking.member.repository.MemberRepository;
import com.main026.walking.pet.entity.Pet;
import com.main026.walking.util.embedded.Address;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@RequiredArgsConstructor
public class InitData {

    private final MemberRepository memberRepository;

    @EventListener(ApplicationReadyEvent.class)
    public void init(){
        Address address = new Address("뉴욕시","맨하튼구","동도동");
        Member kimcoding = Member.builder()
                .email("kimcoding@codestates.com")
                .address(address)
                .username("김코딩")
                .password("12345678")
                .build();
        memberRepository.save(kimcoding);
        
    }
}
