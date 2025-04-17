FROM docker:dind

# learndocker.io가 가리킬 host IP 주소 (172.19.0.1)에 HTTP 요청을 허용하기 위해 필요함
RUN mkdir -p /etc/docker
RUN echo '{ "insecure-registries":["learndocker.io"] }' > /etc/docker/daemon.json
