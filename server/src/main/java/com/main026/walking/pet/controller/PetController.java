package com.main026.walking.pet.controller;

import com.main026.walking.auth.principal.PrincipalDetails;
import com.main026.walking.member.entity.Member;
import com.main026.walking.pet.dto.PetDto;
import com.main026.walking.pet.service.PetService;
import com.main026.walking.util.file.FileStore;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.util.List;

@RestController
@RequestMapping("/pets")
@RequiredArgsConstructor
public class PetController {

    private final PetService petService;
    private final FileStore fileStore;

    @PostMapping
    public PetDto.Response postPet(@RequestBody PetDto.Post postDto, @RequestParam String username, @AuthenticationPrincipal PrincipalDetails principalDetails){
        System.out.println("회원이름 " + username);
        Member member = principalDetails.getMember();
        return petService.postPet(postDto,member);
    }

    //이름이 괴상한데 그냥하는 이유 : requestMapping 의 이름 통일성을 지키는게 더 낫다고 생각해서,
    //하지만 괴상하긴 해서 애초에 네이밍컨벤션에 대한 고민을 더 해야할것같다.
    @GetMapping("/{petId}")
    public PetDto.Response getPet(@PathVariable Long petId){
        return petService.findPet(petId);
    }

    @GetMapping
    public List<PetDto.Response> getPets(@RequestParam("username") String username){
        return petService.findAllByUsername(username);
    }

    @PatchMapping("/{petId}")
    public PetDto.Response patchPet(@PathVariable Long petId, PetDto.Patch patchDto){
        return petService.editPet(petId,patchDto);
    }

    //굳이 문자열을 반환하는 이유 : 삭제가 되었음을 확인하면 좋을 것 같아서 -> 204응답을 해줘도 되지않을까?
    @DeleteMapping("/{petId}")
    public String deletePet(@PathVariable Long petId){
        petService.deletePet(petId);
        return "삭제완료";
    }

    @ResponseBody
    @GetMapping("/img/{filename}")
    public Resource showImage(@PathVariable String filename) throws MalformedURLException {
        return new UrlResource("file:" + fileStore.getFullPath(filename));
    }
}
