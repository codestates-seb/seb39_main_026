package com.main026.walking.member.mapper;

import com.main026.walking.member.dto.MemberDto;
import com.main026.walking.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPostDtoToMember(MemberDto.Post postDto);
    MemberDto.Response memberToMemberResponseDto(Member member);
    Member memberPatchDtoToMember(MemberDto.Patch patchDto);

}
