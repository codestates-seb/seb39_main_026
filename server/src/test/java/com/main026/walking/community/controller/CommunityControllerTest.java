package com.main026.walking.community.controller;

import com.main026.walking.community.service.CommunityService;
import com.main026.walking.image.repository.ImageRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CommunityControllerTest {

    @Autowired
    CommunityService communityService;

    @Autowired
    ImageRepository imageRepository;

    @Test
    void 이미지등록(){
        //given
        MultipartFile imageFile =  new MockMultipartFile("test1", "test1.PNG", MediaType.IMAGE_PNG_VALUE, "test1".getBytes());
        List<MultipartFile> images = new ArrayList<>();
        images.add(imageFile);

        //when
        List<String> savedImage = communityService.saveMultiImage(images);
        //이미지 리포지토리에서 이미지 객체찾아서 비교

        //then
        if(savedImage.size()!=0) {
            for (String s : savedImage) {
                System.out.println(s);
            }
        }

    }

}