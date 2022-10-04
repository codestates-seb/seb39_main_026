package com.main026.walking.pet.service;

import com.main026.walking.auth.principal.PrincipalDetails;
import com.main026.walking.exception.BusinessLogicException;
import com.main026.walking.exception.ExceptionCode;
import com.main026.walking.member.entity.Member;
import com.main026.walking.pet.dto.PetDto;
import com.main026.walking.pet.entity.Pet;
import com.main026.walking.pet.mapper.PetMapper;
import com.main026.walking.pet.repository.PetRepository;
import com.main026.walking.util.awsS3.AwsS3Service;
import com.main026.walking.util.embedded.PetAge;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PetService {

    private final PetRepository petRepository;
    private final PetMapper petMapper;
    private final AwsS3Service awsS3Service;

    public PetDto.Response postPet(PetDto.Post postDto,Member member){
        log.info("반려동물 등록 요청");
        Pet pet = petMapper.petPostDtoToPet(postDto);

        //나이 파싱 로직
        try {
            parseAge(postDto.getBirthDay(), pet);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        //연관관계에 대한 고민 필요
        pet.setMember(member);
        if(pet.getImgUrl().isEmpty()) {
            log.info("기본 이미지 등록");
            pet.setImgUrl("DEFAULT_PET_IMAGE.jpg");
        }
        petRepository.save(pet);

        PetDto.Response dto = petMapper.petToPetResponseDto(pet);
        return dto;
    }

    public PetDto.Response findPet(Long petId) throws IOException {
        Pet pet = petRepository.findById(petId).orElseThrow();
        PetDto.Response dto = petMapper.petToPetResponseDto(pet);
        return dto;
    }

    public List<PetDto.Response> findAllByUsername(String username){
        List<PetDto.Response> allPets = petRepository.findAllByMember_username(username)
                .stream()
                .map(pet -> petMapper.petToPetResponseDto(pet))
                .collect(Collectors.toList());
        return allPets;
    }

    public PetDto.Response editPet(Long petId, PetDto.Patch patchDto, PrincipalDetails principalDetails){
        log.info("반려견 Id " + petId + " 의 정보 수정 요청");
        authorization(petId,principalDetails);

        Pet pet = petRepository.findById(petId).orElseThrow();
        pet.update(patchDto);
        parseAge(patchDto.getBirthDay(),pet);

        petRepository.save(pet);
        return petMapper.petToPetResponseDto(pet);
    }

    public void deletePet(Long petId,PrincipalDetails principalDetails){
        log.info("반려견 Id "+petId+" 삭제 요청");
        authorization(petId,principalDetails);
        petRepository.deleteById(petId);
    }

    private void parseAge(String birthDay, Pet pet) {
        LocalDate parsedDate = LocalDate.parse(birthDay);
        LocalDateTime now = LocalDateTime.now();
        Integer year,month;
        if(now.getMonthValue() - parsedDate.getMonthValue()<0){
            year = now.getYear()-parsedDate.getYear()-1;
            month = now.getMonthValue() + 12 - parsedDate.getMonthValue();
        }else{
            year = now.getYear()-parsedDate.getYear();
            month = now.getMonthValue() - parsedDate.getMonthValue();
        }
        PetAge petAge = new PetAge(year,month,birthDay);
        pet.setPetAges(petAge);
    }

//  CRUD-IMAGE
    //  CREATE : Default_image 적용으로 인한 해당 메소드 삭제
    //  READ
    public String findImageById(long petId){
        Pet findPet = verifyExistPetWithId(petId);
        return findPet.getImgUrl();
    }

    //  UPDATE
    public String updateImage(MultipartFile imgFile, long petId) {
        Pet findPet = verifyExistPetWithId(petId);
        String uploadImage = awsS3Service.uploadImage(imgFile);
        String findImage = findPet.getImgUrl();

        if(!findImage.equals("DEFAULT_PET_IMAGE.jpg")) awsS3Service.deleteImage(findImage);

        findPet.setImgUrl(uploadImage);
        petRepository.save(findPet);

        return uploadImage;
    }

    //  DELETE
    public void deleteImage(Long petId) {
        Pet findPet = verifyExistPetWithId(petId);
        String findImage = findPet.getImgUrl();

        if(!findImage.equals("DEFAULT_PET_IMAGE.jpg")){
            awsS3Service.deleteImage(findImage);
            findPet.setImgUrl("DEFAULT_PET_IMAGE.jpg");
        }

        petRepository.save(findPet);
    }

//  VALID
    private Pet verifyExistPetWithId(Long petId){
        Optional<Pet> checkPet = petRepository.findById(petId);
        return checkPet.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PET_NOT_FOUND));
    }

    private void authorization(Long petId,PrincipalDetails principalDetails){
        Member member = petRepository.findById(petId).orElseThrow().getMember();
        Member principalDetailsMember = principalDetails.getMember();
        if(member.getId()!=principalDetailsMember.getId()){
            throw new BusinessLogicException(ExceptionCode.NO_AUTHORIZATION);
        }
    }
}
