package com.main026.walking.util.awsS3;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.S3ObjectResource;
import com.amazonaws.services.s3.model.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Date;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AwsS3Service {

  @Value("${cloud.aws.s3.bucket}")
  private String bucket;

  private final AmazonS3 amazonS3;

  public String uploadImage(MultipartFile file){
    String fileName = createFileName(file.getOriginalFilename());
    ObjectMetadata objectMetadata = new ObjectMetadata();
    objectMetadata.setContentLength(file.getSize());
    objectMetadata.setContentType(file.getContentType());

    try(InputStream inputStream = file.getInputStream()) {
      amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                           .withCannedAcl(CannedAccessControlList.PublicRead));
    } catch(IOException e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "IMAGE_UPLOAD_FAILED");
    }

    return fileName;
  }

  public void deleteImage(String fileName) {
    amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
  }

  private String createFileName(String fileName) {
    return UUID.randomUUID().toString().concat(getFileExtension(fileName));
  }

  private String getFileExtension(String fileName) {
    try {
      return fileName.substring(fileName.lastIndexOf("."));
    } catch (StringIndexOutOfBoundsException e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "INVALID_FILE_FORMAT(" + fileName + ")");
    }
  }

  // get presigned URL
  public String getFileURL(String fileName) {
    log.info("INPUT_FILE_NAME : " + fileName);

    // set expiration
    Date expiration = new Date();
    long expTimeMillis = expiration.getTime();
    expTimeMillis += 1000 * 60 * 60; // 1 hour
    expiration.setTime(expTimeMillis);

    // Generate the presigned URL.
    GeneratePresignedUrlRequest generatePresignedUrlRequest =
      new GeneratePresignedUrlRequest(bucket, (fileName).replace(File.separatorChar, '/'))
        .withMethod(HttpMethod.GET)
        .withExpiration(expiration);

    return amazonS3.generatePresignedUrl(generatePresignedUrlRequest).toString();
  }
}