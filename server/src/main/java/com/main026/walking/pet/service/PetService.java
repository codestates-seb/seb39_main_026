package com.main026.walking.pet.service;

import com.main026.walking.member.dto.MemberDto;
import com.main026.walking.member.entity.Member;
import com.main026.walking.member.repository.MemberRepository;
import com.main026.walking.pet.dto.PetDto;
import com.main026.walking.pet.entity.Pet;
import com.main026.walking.pet.mapper.PetMapper;
import com.main026.walking.pet.repository.PetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PetService {

    private final PetRepository petRepository;
    private final PetMapper petMapper;

    private final MemberRepository memberRepository;

    private Member testMember(){
        return memberRepository.findById(1L).orElseThrow();
    }

    public PetDto.Response postPet(PetDto.Post postDto){
        Pet pet = petMapper.petPostDtoToPet(postDto);

        //연관관계에 대한 고민 필요
        pet.setMember(testMember());
        //Todo setImg
        petRepository.save(pet);

        return petMapper.petToPetResponseDto(pet);
    }

    public PetDto.Response findPet(Long petId){
        Pet pet = petRepository.findById(petId).orElseThrow();
        //Todo setImg
        return petMapper.petToPetResponseDto(pet);
    }

    public PetDto.Response editPet(Long petId, PetDto.Patch patchDto){
        Pet pet = petRepository.findById(petId).orElseThrow();
        pet.update(patchDto);
        //Todo setImg

        Pet savedPet = petRepository.save(pet);
        return petMapper.petToPetResponseDto(savedPet);
    }

    public void deletePet(Long petId){
        petRepository.deleteById(petId);
    }

}
