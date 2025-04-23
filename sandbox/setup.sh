#!/bin/sh

set -e

cd "$(dirname "$0")"

# DinD 이미지 빌드
docker build --tag dind:latest --file ./host-container/Dockerfile ./host-container

# hello-world 이미지 빌드
docker build --tag localhost/hello-world --file ./quiz-images/hello-world/Dockerfile ./quiz-images/hello-world

# joke 이미지 빌드
docker build --tag localhost/joke --file ./quiz-images/joke/Dockerfile ./quiz-images/joke

# Registry 컨테이너 실행
docker compose -f ./registry/docker-compose.yml up -d

sleep 5

# Registry에 퀴즈용 이미지 push
docker push localhost/hello-world
docker push localhost/joke
