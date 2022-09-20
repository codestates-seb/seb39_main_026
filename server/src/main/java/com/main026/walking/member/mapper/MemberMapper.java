package com.main026.walking.member.mapper;

import com.main026.walking.member.dto.MemberDto;
import com.main026.walking.member.entity.Member;
import com.main026.walking.pet.dto.PetDto;
import org.mapstruct.Mapper;

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
        response.email(member.getEmail());
        response.petList(member.getPetList().stream().map(pet -> new PetDto.compactResponse(pet)).collect(Collectors.toList()));

        return response.build();
    }

    Member memberPatchDtoToMember(MemberDto.Patch patchDto);

}
