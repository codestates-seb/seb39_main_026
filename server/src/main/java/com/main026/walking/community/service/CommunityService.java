package com.main026.walking.community.service;

import com.main026.walking.auth.principal.PrincipalDetails;
import com.main026.walking.community.dto.CommunityDto;
import com.main026.walking.community.entity.Community;
import com.main026.walking.community.mapper.CommunityMapper;
import com.main026.walking.community.repository.CommunityRepository;
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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
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

        //이미지 세팅
        Community savedCommunity = communityRepository.save(community);
        List<MultipartFile> attachFiles = postDto.getImages();

        try {
            for (MultipartFile attachFile : attachFiles) {
                String storeFile = fileStore.storeFile(attachFile);
                Image image = Image.builder()
                        .storeFilename(storeFile)
                        .community(savedCommunity)
                        .build();
                imageRepository.save(image);
            }
        } catch (IOException e) {
            e.printStackTrace();
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
        //communityMapper.updateEntityFromDto(dto, community);

        return communityRepository.save(community);
    }

    //  Delete
    public void deleteCommunity(long communityId) {
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
