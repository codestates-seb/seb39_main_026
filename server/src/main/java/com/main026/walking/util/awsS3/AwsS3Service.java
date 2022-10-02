package com.main026.walking.util.awsS3;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.Base64;
import com.amazonaws.util.IOUtils;
import com.main026.walking.exception.BusinessLogicException;
import com.main026.walking.exception.ExceptionCode;
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
      throw new BusinessLogicException(ExceptionCode.FILE_UPLOAD_FAILED);
    }
    log.info(" [S3-Create] Input-File-Name : " + file.getOriginalFilename() + " -> " + " Upload-File-Name : " + fileName );
    return fileName;
  }

  public void deleteImage(String fileName) {
//    TODO
//    IAM 유저 권한 : S3FullAccess + S3 버킷 : S3:* 권한으로도 삭제만 안됨
//    Patch 구동을 위해 S3 Delete 메소드 비활성화
//    amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
    log.info(" [S3-Delete] Deleted-File-Name : " + fileName + " [Not Implement]");  }

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

    // set expiration
    Date expiration = new Date();
    long expTimeMillis = expiration.getTime();
    expTimeMillis += 1000 * 60 * 300; // 1 hour
    expiration.setTime(expTimeMillis);

    // Generate the presigned URL.
    GeneratePresignedUrlRequest generatePresignedUrlRequest =
      new GeneratePresignedUrlRequest(bucket, (fileName).replace(File.separatorChar, '/'))
        .withMethod(HttpMethod.GET)
        .withExpiration(expiration);
    log.info(" [S3-Get] Read-File-Name : " + fileName);
    return amazonS3.generatePresignedUrl(generatePresignedUrlRequest).toString();
  }

  public String getImageBin(String fileName) throws IOException {
    S3Object findObject = amazonS3.getObject(bucket,fileName);
    log.info(" [S3-Get] Read-File-Name : " + fileName);
    return Base64.encodeAsString(findObject.getObjectContent().readAllBytes());
  }
}