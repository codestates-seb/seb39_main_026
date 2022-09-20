package com.main026.walking.pet.service;

import com.main026.walking.member.dto.MemberDto;
import com.main026.walking.member.entity.Member;
import com.main026.walking.member.repository.MemberRepository;
import com.main026.walking.pet.dto.PetDto;
import com.main026.walking.pet.entity.Pet;
import com.main026.walking.pet.mapper.PetMapper;
import com.main026.walking.pet.repository.PetRepository;
import com.main026.walking.util.file.FileStore;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PetService {

    private final PetRepository petRepository;
    private final PetMapper petMapper;
    private final FileStore fileStore;

    private final MemberRepository memberRepository;

    private Member testMember(){
        return memberRepository.findById(1L).orElseThrow();
    }

    public PetDto.Response postPet(PetDto.Post postDto){
        Pet pet = petMapper.petPostDtoToPet(postDto);

        //연관관계에 대한 고민 필요
        pet.setMember(testMember());

        if(postDto.getProfileImg()!=null){
            try {
                MultipartFile profileImg = postDto.getProfileImg();
                String storeFile = fileStore.storeFile(profileImg);
                pet.setImgUrl(storeFile);
            }catch (IOException e){
                e.printStackTrace();
            }
        }

        petRepository.save(pet);

        return petMapper.petToPetResponseDto(pet);
    }

    public PetDto.Response findPet(Long petId){
        Pet pet = petRepository.findById(petId).orElseThrow();

        return petMapper.petToPetResponseDto(pet);
    }
    //Todo List 로 반환하면 다른 정보를 추가하기 어렵다.
    public List<PetDto.Response> findAllByNickName(String nickname){
        List<PetDto.Response> allPets = petRepository.findAllByMember_NickName(nickname)
                .stream()
                .map(pet -> petMapper.petToPetResponseDto(pet))
                .collect(Collectors.toList());
        return allPets;
    }

    public PetDto.Response editPet(Long petId, PetDto.Patch patchDto){
        Pet pet = petRepository.findById(petId).orElseThrow();
        pet.update(patchDto);

        Pet savedPet = petRepository.save(pet);
        return petMapper.petToPetResponseDto(savedPet);
    }

    public void deletePet(Long petId){
        petRepository.deleteById(petId);
    }

}
