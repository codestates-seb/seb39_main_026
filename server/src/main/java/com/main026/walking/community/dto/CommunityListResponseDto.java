package com.main026.walking.community.dto;

import com.main026.walking.community.entity.Community;
import com.main026.walking.community.mapper.CommunityMapper;
import com.main026.walking.community.mapper.CommunityMapperImpl;
import com.main026.walking.util.response.PageInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Getter
public class CommunityListResponseDto {
    private List<CommunityDto.Response> communityList;
    private PageInfo pageInfo;

    public CommunityListResponseDto(List<CommunityDto.Response> communityList, Page page) {
        this.communityList = communityList;
        this.pageInfo = new PageInfo(page);
    }
}
