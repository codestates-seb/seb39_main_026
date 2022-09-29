package com.main026.walking.community.service;

import com.main026.walking.auth.principal.PrincipalDetails;
import com.main026.walking.community.dto.CommunityDto;
import com.main026.walking.community.dto.CommunityListResponseDto;
import com.main026.walking.community.dto.CommunitySearchCond;
import com.main026.walking.community.entity.Community;
import com.main026.walking.community.mapper.CommunityMapper;
import com.main026.walking.community.repository.CommunityRepository;
import com.main026.walking.exception.BusinessLogicException;
import com.main026.walking.exception.ExceptionCode;
import com.main026.walking.image.entity.Image;
import com.main026.walking.image.repository.ImageRepository;
import com.main026.walking.member.entity.Member;
import com.main026.walking.pet.entity.CommunityPet;
import com.main026.walking.pet.entity.Pet;
import com.main026.walking.pet.repository.CommunityPetRepository;
import com.main026.walking.pet.repository.PetRepository;
import com.main026.walking.util.awsS3.AwsS3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
//TODO 엔티티를 반환하면 안됨
public class CommunityService {
    private final CommunityRepository communityRepository;
    private final ImageRepository imageRepository;
    private final PetRepository petRepository;
    private final CommunityPetRepository communityPetRepository;
    private final CommunityMapper communityMapper;
    private final AwsS3Service awsS3Service;


    //  Create
    public CommunityDto.Response createCommunity(CommunityDto.Post postDto,Member member) {
        Community community = communityMapper.postDtoToEntity(postDto);

        //모임장의 강아지 save
        if(postDto.getJoinnedPetList()!=null) {
            Long[] joinnedPetList = postDto.getJoinnedPetList();
            for (Long petId : joinnedPetList) {
                Pet pet = petRepository.findById(petId).orElseThrow();
                CommunityPet communityPet = CommunityPet.builder()
                        .pet(pet)
                        .community(community)
                        .build();
                communityPetRepository.save(communityPet);
            }
        }

        String[] dayInfo = postDto.getDates();
        List<String> dayList = null;

        if (dayInfo != null) {
            dayList = new ArrayList<>();
            for (String day : dayInfo) {
                dayList.add(day);
            }
        }

        community.setDates(dayList);
        community.setRepresentMember(member);
        community.setAddress(postDto.getSi(), postDto.getGu(), postDto.getDong());

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

        CommunityDto.Response dto = communityMapper.entityToDtoResponse(savedCommunity);
//        List<String> fileUrls = dto.getImgUrls().stream().map(awsS3Service::getFileURL).collect(Collectors.toList());
//        dto.setImgUrls(fileUrls);
        return dto;
    }

    public CommunityDto.Response joinPet(Long communityId, List<Long> petIdList) {
        Community community = communityRepository.findById(communityId).orElseThrow();
        //참여가능 여부 검사
        isFull(community.getCapacity(),community.getCommunityPets().size(),petIdList.size());

        //참여가능 여부 검사
        isFull(community.getCapacity(),community.getCommunityPets().size(),petIdList.size());
        //Todo 조회시 4개글만 보이게

        for (Long petId : petIdList) {
            Pet pet = petRepository.findById(petId).orElseThrow();
            CommunityPet communityPet = CommunityPet.builder()
                    .pet(pet)
                    .community(community)
                    .build();
            communityPetRepository.save(communityPet);
        }

        return communityMapper.entityToDtoResponse(community);
    }

    //Read
    public CommunityDto.Response findCommunity(long communityId) {
        findVerifiedCommunity(communityId);
        Community community = communityRepository.findById(communityId).orElseThrow();
        community.countView();

        CommunityDto.Response dto = communityMapper.entityToDtoResponse(community);
        List<String> fileUrls = dto.getImgUrls().stream().map(awsS3Service::getFileURL).collect(Collectors.toList());
        dto.setImgUrls(fileUrls);

        return dto;
    }

    public CommunityListResponseDto findCommunities(CommunitySearchCond searchCond, Pageable pageable) {
        Page<Community> communityPage = communityRepository.findAllWithCond(searchCond, pageable);
        List<Community> communityList = communityPage.getContent();
        System.out.println(communityList.size());

        List<CommunityDto.Response> responseList = new ArrayList<>();
        for (Community community : communityList) {
            responseList.add(communityMapper.entityToDtoResponse(community));
        }

        return new CommunityListResponseDto(responseList,communityPage);

    }

    //  Update
    public CommunityDto.Response updateCommunity(long communityId, CommunityDto.Patch patchDto) {
        findVerifiedCommunity(communityId);
        Community community = communityRepository.findById(communityId).orElseThrow();
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

        return communityMapper.entityToDtoResponse(community);
    }

    //  Delete
    public void deleteCommunity(Long communityId, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Long authId = principalDetails.getMember().getId();
        Long representId = communityRepository.findById(communityId).orElseThrow().getRepresentMember().getId();
        if (authId!=representId){
            throw new BusinessLogicException(ExceptionCode.NO_AUTHORIZATION);
        }
        findVerifiedCommunity(communityId);
        communityRepository.deleteById(communityId);
    }

//  CRUD-IMAGE
    //  CREATE - ONCE
    public String saveImage(Long communityId, MultipartFile file){
        Community findCommunity = findVerifiedCommunity(communityId);
        String uploadImage = awsS3Service.uploadImage(file);

        Image savedImage = Image.builder()
                             .storeFilename(uploadImage)
                             .community(findCommunity)
                             .build();
        imageRepository.save(savedImage);

        return uploadImage;
        }

    //  CREATE - MULTI
    public List<String> saveMultiImage(Long communityId, List<MultipartFile> files){
        List<String> savedImages = files.stream().map(file -> saveImage(communityId,file)).collect(Collectors.toList());

        return savedImages;
    }

    //  READ - ONCE : Controller에서 Aws S3 Service로 바로 리턴
    //  READ - MULTI
    public List<String> readImages(long communityId) throws IOException {
        Community findCommunity = findVerifiedCommunity(communityId);

        List<String> findImageNames = findCommunity.getImages().stream().map(Image::getStoreFilename).collect(Collectors.toList());

        List<String> findImages = new ArrayList<>();
        for (String filename : findImageNames) {
            String imageBin = awsS3Service.getImageBin(filename);
            findImages.add(imageBin);
        }
        return findImages;
    }

    //  UPDATE
    public String updateImage(String filename, PrincipalDetails principalDetails, MultipartFile imgFile){
        Image findImage = imageRepository.findByStoreFilename(filename).orElseThrow( () -> new BusinessLogicException(ExceptionCode.FILE_NOT_FOUND));
        long communityId = findImage.getCommunity().getId();

        authorization(communityId,principalDetails);
        String savedImage = saveImage(communityId, imgFile);

        imageRepository.delete(findImage);
        awsS3Service.deleteImage(filename);

        return savedImage;
    }

    //  DELETE
    public void deleteImage(String filename, PrincipalDetails principalDetails){
        Image findImage = imageRepository.findByStoreFilename(filename).orElseThrow(() -> new BusinessLogicException(ExceptionCode.FILE_NOT_FOUND));
        long communityId = findImage.getCommunity().getId();

        authorization(communityId, principalDetails);

        imageRepository.delete(findImage);
        awsS3Service.deleteImage(filename);
    }

//  Valid
    //  Author : 로그인한 유저 == 커뮤니티의 대표자 인지 확인
    public void authorization(long communityId, PrincipalDetails principalDetails){
        Community findCommunity = findVerifiedCommunity(communityId);
        long findMemberId = findCommunity.getRepresentMember().getId();
        long loginId = principalDetails.getMember().getId();
        if(loginId != findMemberId){
            throw new BusinessLogicException(ExceptionCode.INVALID_AUTHORIZATION);
        }
    }

    private Community findVerifiedCommunity(Long communityId) {
        Community findCommunity = communityRepository.findById(communityId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMUNITY_NOT_FOUND));
        return findCommunity;
    }

    public void isFull(Integer capacity, Integer communityPets, Integer joinPet){
        //이미 참여인원이 수용량과 같음
        if(capacity==communityPets){
            throw new BusinessLogicException(ExceptionCode.CAPACITY_FULL);
        }
        //참여하려는 인원을 추가하면 초과됨
        if(communityPets+joinPet>capacity){
            throw new BusinessLogicException(ExceptionCode.OVERBOOKED);
        }
    }
}