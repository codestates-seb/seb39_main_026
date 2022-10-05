package com.main026.walking.image.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.main026.walking.community.dto.CommunityDto;
import com.main026.walking.community.entity.Community;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String storeFilename;
    //    private Long fileSize;
    @ManyToOne
    @JoinColumn(name = "community_id")
    private Community community;

    @Builder
    public Image(Long id, String storeFilename, Community community) {
        this.id = id;
        this.storeFilename = storeFilename;
        this.community = community;
    }

    public void setCommunity(Community community) {
        this.community = community;
        if (!community.getImages().contains(this)) {
            community.getImages().add(this);
        }
    }
}
