#!/bin/bash
cd /home/team026/seb39_main_026

git pull

git checkout dev

cp "/home/team026/seb39_main_026_deploy/cert_and_key.p12" "/home/team026/seb39_main_026/server/src/main/resources/cert_and_key.p12"

cp "/home/team026/seb39_main_026_deploy/application-nuc.properties" "/home/team026/seb39_main_026/server/src/main/resources/application-nuc.properties"

cd "home/team026/seb39_main_026/server"

chmod +x ./gradlew

./gradlew clean bootjar -x test

BUILD_JAR=$(ls /home/team026/seb39_main_026/server/build/libs/*.jar)
JAR_NAME=$(basename $BUILD_JAR)

echo "> 현재 시간: $(date)" >> /home/team026/seb39_main_026_deploy/deploy.log

echo "> build 파일명: $JAR_NAME" >> /home/team026/seb39_main_026_deploy/deploy.log

echo "> build 파일 복사" >> /home/team026/seb39_main_026_deploy/deploy.log
DEPLOY_PATH=/home/team026/seb39_main_026_deploy/
cp $BUILD_JAR $DEPLOY_PATH

echo "> 8080 PORT 에서 구동중인 애플리케이션 pid 확인"
CURRENT_PID=$(lsof -ti tcp:8080)

if [ -z $CURRENT_PID ]
then
  echo "> 현재 구동중인 애플리케이션이 없으므로 종료하지 않습니다." >> /home/team026/seb39_main_026_deploy/deploy.log
else
  echo "> kill -15 $CURRENT_PID" >> /home/team026/seb39_main_026_deploy/deploy.log
  kill -15 $CURRENT_PID
  sleep 5
fi

DEPLOY_JAR=$DEPLOY_PATH$JAR_NAME
echo "> DEPLOY_JAR 배포"    >> /home/team026/seb39_main_026_deploy/deploy.log
nohup java -jar $DEPLOY_JAR --spring.profiles.active=nuc >> /home/team026/deploy.log 2>/home/team026/seb39_main_026_deploy/deploy_err.log &

