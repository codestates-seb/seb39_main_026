package com.main026.walking.image.repository;

import com.main026.walking.image.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
  Optional<Image> findByStoreFilename(String filename);
}
