package com.main026.walking.community.service;

import com.main026.walking.auth.principal.PrincipalDetails;
import com.main026.walking.community.dto.CommunityDto;
import com.main026.walking.community.entity.Community;
import com.main026.walking.community.mapper.CommunityMapper;
import com.main026.walking.community.repository.CommunityRepository;
import com.main026.walking.exception.BusinessLogicException;
import com.main026.walking.exception.ExceptionCode;
import com.main026.walking.image.entity.Image;
import com.main026.walking.image.repository.ImageRepository;
import com.main026.walking.member.entity.Member;
import com.main026.walking.member.repository.MemberRepository;
import com.main026.walking.pet.dto.PetDto;
import com.main026.walking.pet.entity.CommunityPet;
import com.main026.walking.pet.entity.Pet;
import com.main026.walking.pet.repository.CommunityPetRepository;
import com.main026.walking.pet.repository.PetRepository;
import com.main026.walking.util.enums.Weeks;
import com.main026.walking.util.file.FileStore;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
//TODO 엔티티를 반환하면 안됨
public class CommunityService {
    private final CommunityRepository communityRepository;
    private final ImageRepository imageRepository;
    private final PetRepository petRepository;
    private final CommunityPetRepository communityPetRepository;
    private final CommunityMapper communityMapper;
    private final FileStore fileStore;


    //  Create
    public Community createCommunity(CommunityDto.Post postDto,Member member) {
        Community community = communityMapper.postDtoToEntity(postDto);

        String[] dayInfo = postDto.getDates();
        List<String> dayList = new ArrayList<>();
        if (dayInfo != null) {
            for (String day : dayInfo) {
                dayList.add(day);
            }
        }

        community.setDates(dayList);

        community.setRepresentMember(member);
        community.setAddress(postDto.getSi(), postDto.getGu(), postDto.getDong());

        //TODO update쿼리가 두번날아가는 말도안되는 상황.
        //이미지 세팅
        Community savedCommunity = communityRepository.save(community);
        List<String> imagePaths = postDto.getImages();

        for (String imagePath : imagePaths) {
            Image image = Image.builder()
                    .storeFilename(imagePath)
                    .community(savedCommunity)
                    .build();
            imageRepository.save(image);
        }

        return communityRepository.save(community);
    }

    public Community joinPet(Long communityId, List<Long> petIdList) {
        Community community = communityRepository.findById(communityId).orElseThrow();

        for (Long petId : petIdList) {
            Pet pet = petRepository.findById(petId).orElseThrow();
            CommunityPet communityPet = CommunityPet.builder()
                    .pet(pet)
                    .community(community)
                    .build();
            communityPetRepository.save(communityPet);
        }

        return community;
    }

    public List<String> saveMultiImage(List<MultipartFile> files){
        List<String> images = new ArrayList<>();
        for (MultipartFile file : files) {
            try {
                String storedFile = fileStore.storeFile(file);
                images.add(storedFile);
            }catch (IOException e){
                throw new BusinessLogicException(ExceptionCode.FILE_NOT_FOUND);
            }
        }
        return images;
    }

    //Read
    public Community findCommunity(long communityId) {

        Community community = findVerifiedCommunity(communityId);

        return communityRepository.save(community);
    }

    public Page<Community> findCommunities(int page, int size) {
        return communityRepository.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
    }

    //  Update
    public Community updateCommunity(long communityId, CommunityDto.Patch patchDto) {
        Community community = findVerifiedCommunity(communityId);
        community.update(patchDto);

        //이미지는 위 update 메서드로 적용불가 - 연관관계때문
        List<String> imagePaths = patchDto.getImages();

        for (String imagePath : imagePaths) {
            Image image = Image.builder()
                    .storeFilename(imagePath)
                    .community(community)
                    .build();
            imageRepository.save(image);
        }

        return communityRepository.save(community);
    }

    //  Delete
    public void deleteCommunity(long communityId, PrincipalDetails principalDetails) {
        Long authId = principalDetails.getMember().getId();
        Long representId = communityRepository.findById(communityId).orElseThrow().getRepresentMember().getId();
        if (authId!=representId){
            throw new BusinessLogicException(ExceptionCode.NO_AUTHORIZATION);
        }
        Community community = findVerifiedCommunity(communityId);
        communityRepository.delete(community);
    }

    //  Valid
    public Community findVerifiedCommunity(long questionId) {
        Optional<Community> checkCommunity = communityRepository.findById(questionId);
        Community findCommunity =
                checkCommunity.orElseThrow(() -> new RuntimeException("COMMUNITY_NOT_FOUND"));

        return findCommunity;
    }
}
