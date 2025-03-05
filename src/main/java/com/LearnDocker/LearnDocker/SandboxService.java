package com.LearnDocker.LearnDocker;

import com.LearnDocker.LearnDocker.DTO.ContainerInfo;
import com.LearnDocker.LearnDocker.DTO.Elements;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class SandboxService {
    private static final String READY = "READY";
    private static final String STARTING = "STARTING";
    private final DockerAPI dockerAPI;

    @Autowired
    public SandboxService(DockerAPI dockerAPI) {
        this.dockerAPI = dockerAPI;
    }

    public Mono<ContainerInfo> assignUserContainer() {
        return createUserContainer()
                .flatMap(containerId ->
                        startUserContainer(containerId)
                                .then(getContainerPort(containerId)
                                        .map(containerPort -> new ContainerInfo(containerId, containerPort)))
                );
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
        return this.dockerAPI.createUserContainerAPI(body);
    }

    public Mono<Void> startUserContainer(String containerId) {
        // Start Container
        return this.dockerAPI.startUserContainerAPI(containerId);
    }

    public Mono<String> getContainerPort(String containerId) {
        return this.dockerAPI.getContainerPortAPI(containerId);
    }

    public Mono<Void> releaseUserSession(String containerId) {
        return this.dockerAPI.releaseUserSessionAPI(containerId);
    }

    public Mono<String> getHostStatus(int containerPort) {
        return this.dockerAPI.getHostStatusAPI(containerPort);
    }

    public Mono<Elements> getUserContainersImages(int containerPort) {
        Mono<Elements.Image[]> imagesMono = this.dockerAPI.getUserImagesAPI(containerPort);
        Mono<Elements.Container[]> containersMono = this.dockerAPI.getContainersAPI(containerPort);

        return Mono.zip(imagesMono, containersMono, Elements::new);
    }
}
