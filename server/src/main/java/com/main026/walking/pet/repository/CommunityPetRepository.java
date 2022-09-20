package com.main026.walking.pet.repository;

import com.main026.walking.pet.entity.CommunityPet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityPetRepository extends JpaRepository<CommunityPet,Long> {
}
