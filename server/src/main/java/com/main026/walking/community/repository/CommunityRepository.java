package com.main026.walking.community.repository;

import com.main026.walking.community.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityRepository extends JpaRepository<Community,Long> {
}
