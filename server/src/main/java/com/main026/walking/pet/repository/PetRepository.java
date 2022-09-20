package com.main026.walking.pet.repository;

import com.main026.walking.pet.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PetRepository extends JpaRepository<Pet,Long> {
    List<Pet> findAllByMember_NickName(String nickname);
}
