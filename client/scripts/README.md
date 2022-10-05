# 서버 새로 띄우기

## 개요

- 프론트엔드 SSR 서버를 띄우고 배포 자동화를 위한 스크립트 파일 입니다.
- 오토 스케일링 과 같은 고난이도의 작업은 제외하고 배포 자동화를 우선적으로 합니다.

## 1. 서버 준비

- ec2를 생성합니다.

## 2. 웹훅 설정

### SSH 키 생성

- 웹훅에 사용할 키를 ec2에서 생성합니다.
- 서버 안에서 아래 명령어를 실행합니다.
- 한줄 씩 실행해야합니다.

```bash
ssh-keygen -t rsa -b 4096 -C 'frontend-ssr'
# 엔터 여러번 쳐주기
cat ~/.ssh/id_rsa.pub
```

- 출력된 키를 레포의 deploy 키에 등록합니다.
- https://github.com/codestates-seb/seb39_main_026/settings/keys

## 3. 서버에 git 설치

- 서버 안에서 아래 명령어를 실행합니다.

```
sudo yum update -y
sudo yum install git -y
git version
```

## 4. 서버에서 init.sh 실행하기

```
cd ~

git clone git@github.com:codestates-seb/seb39_main_026.git

cd seb39_main_026

cd client/scripts

bash init.sh
```

## 5. 환경변수 설정하기

```
cd ~
echo 'export WEBHOOK_SECRET=웹훅키' >> ~/.bashrc
echo "export WEBHOOK_DEPLOY_FILENAME=$PWD/seb39_main_026/client/scripts/trigger-deploy.sh" >> ~/.bashrc
echo "export WEBHOOK_PORT=포트번호" >> ~/.bashrc
source ~/.bashrc
```

## 6. webhook 실행

```
cd ~
cd seb39_main_026
cd client
cd scripts
nohup node webhook.js </dev/null >/dev/null 2>&1 &
```

## 7. nextjs 환경변수 설정

```bash
cd ~
cd seb39_main_026
cd client

# .env 파일 리셋
rm .env
touch .env

# 환경변수 추가하기
echo 'NEXT_PUBLIC_BASE_URL=실제주소' >> .env
echo 'NEXT_PUBLIC_ADDRESS_API_URL=실제주소' >> .env
echo 'NODE_ENV=production' >> .env
```
