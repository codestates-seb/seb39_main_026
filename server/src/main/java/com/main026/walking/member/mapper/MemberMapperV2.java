package com.main026.walking.member.mapper;

import com.main026.walking.community.dto.CommunityDto;
import com.main026.walking.community.entity.Community;
import com.main026.walking.member.dto.MemberDto;
import com.main026.walking.member.entity.Member;
import com.main026.walking.pet.dto.PetDto;
import com.main026.walking.util.awsS3.AwsS3Service;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public abstract class MemberMapperV2 {

  @Autowired
  AwsS3Service awsS3Service;

  public abstract Member memberPostDtoToMember(MemberDto.Post postDto);
  @Mapping(source = "imgUrl", target = "imgUrl", qualifiedByName = "convertImgUrl")
  public abstract MemberDto.compactResponse memberToMemberCompactResponseDto(Member member);

  public MemberDto.Response memberToMemberResponseDto(Member member){
    if (member == null) {
      return null;
    }
    MemberDto.Response.ResponseBuilder response = MemberDto.Response.builder();
    response.id(member.getId());
    response.address(member.getAddress());
    response.username(member.getUsername());
    response.imgUrl(awsS3Service.getFileURL(member.getImgUrl()));
    response.email(member.getEmail());

    List<PetDto.compactResponse> petList = member.getPetList().stream().map(PetDto.compactResponse::new).collect(Collectors.toList());

    for(PetDto.compactResponse i : petList){
      String fileName = i.getImgUrl();
      i.setImgUrl(awsS3Service.getFileURL(fileName));
    }

    response.petList(petList);


    // TODO
    //  멤버의 펫이 가입한 모임 정보를 출력
    //이..게...맞나...?
    //펫을 조회해서 모임도 함께보여주는것이 더 간단하긴하다.
    List<CommunityDto.compactResponse> communityList = new ArrayList<>();
    for (int i = 0; i < member.getPetList().size(); i++) {
      for (int j = 0; j < member.getPetList().get(i).getCommunityPets().size(); j++) {

        Community community = member.getPetList().get(i).getCommunityPets().get(j).getCommunity();
        CommunityDto.compactResponse compactResponse = new CommunityDto.compactResponse(community);
        compactResponse.setRepresentImgUrls(awsS3Service.getFileURL(compactResponse.getRepresentImgUrls()));
        if (!communityList.contains(compactResponse)){
          communityList.add(compactResponse);
        }
      }
    }
    response.memberCommunityList(communityList);

    return response.build();
  }

  @Named("convertImgUrl")
  String convertImgUrl(String imgurl) {
    return awsS3Service.getFileURL(imgurl);
  }
}
