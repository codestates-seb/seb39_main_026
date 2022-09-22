package com.main026.walking.member.mapper;

import com.main026.walking.community.dto.CommunityDto;
import com.main026.walking.community.entity.Community;
import com.main026.walking.member.dto.MemberDto;
import com.main026.walking.member.entity.Member;
import com.main026.walking.pet.dto.PetDto;
import com.main026.walking.pet.entity.CommunityPet;
import com.main026.walking.pet.entity.Pet;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPostDtoToMember(MemberDto.Post postDto);

    //TODO 수동구현을 해야되는가?
    default MemberDto.Response memberToMemberResponseDto(Member member){
        if (member == null) {
            return null;
        }
        MemberDto.Response.ResponseBuilder response = MemberDto.Response.builder();
        response.id(member.getId());
        response.address(member.getAddress());
        response.username(member.getUsername());
        response.imgUrl(member.getImgUrl());
        response.email(member.getEmail());
        response.petList(member.getPetList().stream()
                .map(pet -> new PetDto.compactResponse(pet))
                .collect(Collectors.toList()));

        // TODO
        //  멤버의 펫이 가입한 모임 정보를 출력
        //이..게...맞나...?
        //펫을 조회해서 모임도 함께보여주는것이 더 간단하긴하다.
        List<CommunityDto.compactResponse> communityList = new ArrayList<>();
        for (int i = 0; i < member.getPetList().size(); i++) {
            for (int j = 0; j < member.getPetList().get(i).getCommunityPets().size(); j++) {

                Community community = member.getPetList().get(i).getCommunityPets().get(j).getCommunity();
                CommunityDto.compactResponse compactResponse = new CommunityDto.compactResponse(community);

                if (!communityList.contains(compactResponse)){
                    communityList.add(compactResponse);
                }
            }
        }
        response.memberCommunityList(communityList);

        return response.build();
    }

}
