package com.main026.walking.util.awsS3;

import com.amazonaws.util.IOUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;

@RestController
@RequestMapping("/s3")
@RequiredArgsConstructor
@Slf4j
public class AwsS3Controller {
  private final AwsS3Service awsS3Service;

//  VPC 내부에서 S3에 접근하려면
  @GetMapping("/{file-name}")
  @ResponseBody
  public ResponseEntity<byte[]> getFile(
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
}