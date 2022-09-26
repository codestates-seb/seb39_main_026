package com.main026.walking.community.repository;

import com.main026.walking.community.dto.CommunitySearchCond;
import com.main026.walking.community.entity.Community;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommunityRepositoryCustom {
    Page<Community> findAllWithCond(CommunitySearchCond searchCond, Pageable pageable);
}
