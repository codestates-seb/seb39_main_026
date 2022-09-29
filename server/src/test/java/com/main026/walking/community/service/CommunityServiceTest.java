package com.main026.walking.community.service;

import com.main026.walking.community.entity.Community;
import com.main026.walking.community.repository.CommunityRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

class CommunityServiceTest {

    @Autowired
    CommunityService communityService;
    @Autowired
    CommunityRepository repository;

    @Test
    void 참여불가(){
        //given
        Community community = repository.findById(1L).orElseThrow();
        Integer capacity = community.getCapacity();
        int communityPets = community.getCommunityPets().size();
        //when
        Integer joinPet = 30;
        //then
        communityService.isFull(capacity,communityPets,joinPet);


    }

}