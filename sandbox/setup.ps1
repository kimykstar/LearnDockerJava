# .\setup.ps1 으로 실행하세요

# Set working directory to script location
Set-Location $PSScriptRoot

# Build DinD image
docker build -t dind:latest -f ./host-container/Dockerfile ./host-container

# Build quiz images
docker build -t localhost/hello-world -f ./quiz-images/hello-world/Dockerfile ./quiz-images/hello-world
docker build -t localhost/joke -f ./quiz-images/joke/Dockerfile ./quiz-images/joke

# Start Registry container
docker compose -f ./registry/docker-compose.yml up -d

Start-Sleep -Seconds 5

# Push images to Registry
docker push localhost/hello-world
docker push localhost/joke