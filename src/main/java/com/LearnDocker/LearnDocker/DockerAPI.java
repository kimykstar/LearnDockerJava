package com.LearnDocker.LearnDocker;

import com.LearnDocker.LearnDocker.DTO.Elements;
import com.LearnDocker.LearnDocker.DTO.ExecCreate;
import com.LearnDocker.LearnDocker.DTO.ExecStart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@Component
public class DockerAPI {

    private final WebClient dockerWebClient;
    private final WebClient containerWebClient;
    private final ObjectParser objectParser;
    private static final String STARTING = "STARTING";
    private static final String READY = "READY";

    @Autowired
    public DockerAPI(@Qualifier("DockerWebClient") WebClient dockerWebClient, @Qualifier("ContainerWebClient") WebClient containerWebClient, ObjectParser objectParser) {
        this.dockerWebClient = dockerWebClient;
        this.containerWebClient = containerWebClient;
        this.objectParser = objectParser;
    }

    public Mono<String> createUserContainerAPI(CreateContainerBody body) {
        return this.dockerWebClient
                .post()
                .uri(uriBuilder -> uriBuilder.path("/containers/create").build())
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>(){})
                .map(response -> (String) response.get("Id"));
    }

    public Mono<Void> startUserContainerAPI(String containerId) {
        return this.dockerWebClient
                .post()
                .uri(uriBuilder -> uriBuilder.path("/containers/{containerId}/start").build(containerId))
                .contentType(MediaType.APPLICATION_JSON)
                .retrieve()
                .toBodilessEntity()
                .then();
    }

    public Mono<String> getContainerPortAPI(String containerId) {
        return this.dockerWebClient
                .get()
                .uri(uriBuilder -> uriBuilder.path("containers/{containerId}/json").build(containerId))
                .retrieve()
                .bodyToMono(String.class)
                .flatMap(this.objectParser::portResponseParse);
    }

    public Mono<Void> releaseUserSessionAPI(String containerId) {
        return this.dockerWebClient
                .delete()
                .uri(uriBuilder -> uriBuilder.path("containers/{containerId}").queryParam("force", "true").queryParam("v", "true").build(containerId))
                .retrieve()
                .toBodilessEntity()
                .then();
    }

    public Mono<String> getHostStatusAPI(int containerPort) {
        return this.containerWebClient
                .get()
                .uri(uriBuilder -> uriBuilder.port(containerPort).path("/_ping").build())
                .retrieve()
                .onStatus(HttpStatus.INTERNAL_SERVER_ERROR::equals, clientResponse -> Mono.just(new Exception()))
                .bodyToMono(String.class)
                .map(response -> READY)
                .onErrorResume(e -> Mono.just(STARTING));
    }

    public Mono<Elements.Image[]> getUserImagesAPI(int containerPort) {
        return this.containerWebClient
                .get()
                .uri(uriBuilder -> uriBuilder.port(containerPort).path("/images/json").build())
                .retrieve()
                .bodyToMono(String.class)
                .map(this.objectParser::parseImages);
    }

    public Mono<Elements.Container[]> getContainersAPI(int containerPort) {
        return this.containerWebClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .port(containerPort)
                        .path("/containers/json")
                        .queryParam("all", "true")
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .map(this.objectParser::parseContainers);
    }

    public Mono<String> requestDockerCommand(String containerId, String[] command) {
        ExecCreate creationBody = new ExecCreate(false, true, true, true, command);
        String execId = this.dockerWebClient
                .post()
                .uri(uriBuilder -> uriBuilder.path("/containers/{containerId}/exec").build(containerId))
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(creationBody)
                .retrieve()
                .bodyToMono(String.class)
                .map(this.objectParser::parseCreationExecResponseBody)
                .block();
        ExecStart startBody = new ExecStart(false, true);
        return this.dockerWebClient
                .post()
                .uri(uriBuilder -> uriBuilder
                        .path("/exec/{execId}/start")
                        .build(execId))
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(startBody)
                .retrieve()
                .bodyToMono(String.class);
    }
}
