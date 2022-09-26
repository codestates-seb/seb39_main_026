package com.main026.walking.util.awsS3;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/s3")
@RequiredArgsConstructor
@Slf4j
public class AwsS3Controller {
  private final AwsS3Service awsS3Service;

  @GetMapping("/{file-name}")
  @ResponseBody
  public ResponseEntity<byte[]> getFile(
    @PathVariable("file-name") String fileName) throws IOException {
    log.info("fileName: "+ fileName);
    return new ResponseEntity<>(awsS3Service.getImageBin(fileName), HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity uploadImage(
    @RequestPart(name = "file") MultipartFile file
    ){
    String fileName = awsS3Service.uploadImage(file);
    return new ResponseEntity(fileName,HttpStatus.CREATED);
  }

  @DeleteMapping("/{file-name}")
  public ResponseEntity deleteImage(
    @PathVariable("file-name") String fileName
  ){
    awsS3Service.deleteImage(fileName);
    return new ResponseEntity(HttpStatus.NO_CONTENT);
  }

//  Back-up 메소드 : 한시적으로 IAM User 정보로 보안증명을 완료한 퍼블릭 URL 생성 후 다운받아 리턴하는 메소드
//  -> VPC Peering등을 통해 이미지서버를 따로 운용하게 되면 사용가능할 듯
  /*  @GetMapping("/{file-name}")
  @ResponseBody
  public ResponseEntity<byte[]> getFileTempPub(
    @PathVariable("file-name") String fileName){
    log.info("fileName: "+ fileName);
    ResponseEntity<byte[]> result = null;
    try {
      HttpHeaders header = new HttpHeaders();

      // read from S3
      URL url = new URL(awsS3Service.getFileURL(fileName));
      HttpURLConnection urlConn = (HttpURLConnection) url.openConnection();
      InputStream fileIS = urlConn.getInputStream();

      // MIME regardless of extention
      header.add("Content-Type", URLConnection.guessContentTypeFromStream(fileIS));

      result = new ResponseEntity<>(IOUtils.toByteArray(fileIS), header, HttpStatus.OK);

    } catch(IOException e) {
      log.info("wrong file path");
    }
    return result;
  }*/
}