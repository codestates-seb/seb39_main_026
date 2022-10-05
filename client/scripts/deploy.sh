# git remote 최신화
git remote update

# 현재 브랜치를 기준 최신 커밋으로 업데이트
git reset --hard origin/$(git rev-parse --abbrev-ref HEAD)

# frontend 디렉토리 진입
cd client

# 의존성 설치
yarn 

rm -rf .next

# nextjs 빌드
yarn build

# 기존 프로세스 종료 (grep 프로세스는 제거)
kill -9 $(ps -ef | grep "next start" | grep -v "grep" | awk '{print $2;}' | head -n 1)

# 새 프로세스 실행
yarn start