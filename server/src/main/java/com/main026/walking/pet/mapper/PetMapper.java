package com.main026.walking.pet.mapper;

import com.main026.walking.community.dto.CommunityDto;
import com.main026.walking.community.entity.Community;
import com.main026.walking.member.dto.MemberDto;
import com.main026.walking.pet.dto.PetDto;
import com.main026.walking.pet.entity.Pet;
import com.main026.walking.util.awsS3.AwsS3Service;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public abstract class PetMapper {

    @Autowired
    AwsS3Service awsS3Service;

    public abstract Pet petPostDtoToPet(PetDto.Post postDto);

    public PetDto.Response petToPetResponseDto(Pet pet){
        if(pet == null){
            return null;
        }
        PetDto.Response.ResponseBuilder response = PetDto.Response.builder();
        response.id(pet.getId());
        response.petName(pet.getPetName());
        response.petGender(pet.getPetGender());
        response.petAges(pet.getPetAges());
        response.neuter(pet.getNeuter());
        response.personality(pet.getPersonality());
        response.imgUrl(awsS3Service.getFileURL(pet.getImgUrl()));
        response.breed(pet.getBreed());
        response.about(pet.getAbout());

//        response.member(new MemberDto.Response(pet.getMember()));
        MemberDto.compactResponse dto = new MemberDto.compactResponse(pet.getMember());
        dto.setImgUrl(awsS3Service.getFileURL(dto.getImgUrl()));
        response.member(dto);

        List<CommunityDto.compactResponse> petCommunityList = new ArrayList<>();
        for (int i = 0; i < pet.getCommunityPets().size(); i++) {
            Community community = pet.getCommunityPets().get(i).getCommunity();
            CommunityDto.compactResponse compactResponse = new CommunityDto.compactResponse(community);
            compactResponse.setRepresentImgUrls(awsS3Service.getFileURL(compactResponse.getRepresentImgUrls()));
            if (!petCommunityList.contains(compactResponse)){
                petCommunityList.add(compactResponse);
            }
        }

        response.petCommunityList(petCommunityList);
        return response.build();
    }

}
