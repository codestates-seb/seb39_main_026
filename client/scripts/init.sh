# npm 설치를 위한 rpm 레포 추가
curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash -

# npm, node 설치
sudo yum install nodejs -y

# 전역 node_models 등록
mkdir -p ~/.local/bin
npm config set prefix '~/.local/'
echo 'export PATH=~/.local/bin/:$PATH' >> ~/.bashrc

# yarn 설치
npm install -g yarn -y
