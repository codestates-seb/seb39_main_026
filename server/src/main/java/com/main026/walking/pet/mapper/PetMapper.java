package com.main026.walking.pet.mapper;

import com.main026.walking.pet.dto.PetDto;
import com.main026.walking.pet.entity.Pet;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PetMapper {

    Pet petPostDtoToPet(PetDto.Post postDto);
    //TODO id 포함이 안되는 중
    PetDto.Response petToPetResponseDto(Pet pet);

}
