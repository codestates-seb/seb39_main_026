package com.main026.walking.pet.entity;

import com.main026.walking.community.entity.Community;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class CommunityPet {

    @Id @GeneratedValue
    @Column(name = "community_pet_id")
    private Long id;
    @ManyToOne
    @JoinColumn(name = "pet_id")
    private Pet pet;
    @ManyToOne
    @JoinColumn(name = "community_id")
    private Community community;


    public CommunityPet(Pet petId, Community communityId) {
        this.pet = pet;
        this.community = community;
    }

}
