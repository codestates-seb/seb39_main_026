# NOTE: 여러번 실행되면 서버에서 여러 번 빌드되면서 서버의 사용량이 급증합니다.
# 따라서, 이전에 실행된 배포 프로세스를 종료합니다.
ps -ef | grep "deploy.sh" | grep -v "grep" | awk '{print $2;}' | xargs kill -9 2> /dev/null || echo "no-process-to-kill"
