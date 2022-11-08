# ChatRoom

# 打包/部署方式

## client
### 1.安装依赖
```
cd client
yarn install
```
### 2.构建apk
```
cd android
gradlew assembleRelease
```

## server

### 1. 安装conda
1. 官网下载安装包
2. 安装添加环境变量目录 conda/script 目录
3. 修改配置文件 /Users/替换成你的用户名/.condarc
4. 安装openSSL
5. 进行更新 conda upgrade —all
```
channels:
  - defaults
show_channel_urls: true
default_channels:
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
custom_channels:
  conda-forge: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  msys2: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  bioconda: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  menpo: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  simpleitk: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
```
### 2. 通过environment.yaml，恢复环境，注意对应的cuda版本
```
cd server
conda env -f .yaml
```

### 3. windows:安装visual studio,选择C++开发工具安装

### 4. 安装pip模块

```
pip install -r requirements.txt
```
<!-- pip install fastapi
pip install uvicorn[standard]
pip install pygtrans
pip install pytest-runner -i https://pypi.tuna.tsinghua.edu.cn/simple
pip install paddlepaddle -i https://mirror.baidu.com/pypi/simple
pip install paddlespeech -i https://pypi.tuna.tsinghua.edu.cn/simple
pip install broadcaster
pip install redis
pip instlal sqlchemy
pip install mysql-connector
pip install python-multipart
pip install asyncio_redis -->
### 5. 运行
```
uvicorn main:app --host 0.0.0.0 --reload