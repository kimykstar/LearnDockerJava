package com.LearnDocker.LearnDocker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Service
public class SandboxService {
    private final WebClient.Builder webClient;

    @Autowired
    public SandboxService(WebClient beanWebClient) {
        this.webClient = beanWebClient.mutate();
    }

    public Mono<String> createUserContainer() {
        CreateContainerBody body = new CreateContainerBody(
                "dind",
                new CreateContainerBody.HostConfig(
                        true,
                        Map.of("2375/tcp", List.of(new CreateContainerBody.PortBinding("0", "0.0.0.0")))
                ),
                List.of("DOCKER_TLS_CERTDIR="),
                List.of("--tls=false")
        );
        return this.webClient.build()
                .post()
                .uri("/containers/create")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class);
    }
}
