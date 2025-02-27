package com.LearnDocker.LearnDocker;

import com.LearnDocker.LearnDocker.DTO.ContainerInfo;
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

import java.util.List;
import java.util.Map;

@Service
public class SandboxService {
    private static final String READY = "READY";
    private static final String STARTING = "STARTING";
    private final WebClient.Builder dockerWebClient;
    private final WebClient.Builder containerWebClient;

    @Autowired
    public SandboxService(@Qualifier("DockerWebClient") WebClient dockerWebClient, @Qualifier("ContainerWebClient") WebClient containerWebClient) {
        this.dockerWebClient = dockerWebClient.mutate();
        this.containerWebClient = containerWebClient.mutate();
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
        return this.dockerWebClient.build()
                .post()
                .uri("/containers/create")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>(){})
                .map(response -> (String) response.get("Id"));
    }

    public void startUserContainer(String containerId) {
        // Start Container
        this.dockerWebClient.build()
                .post()
                .uri("/containers/" + containerId + "/start")
                .contentType(MediaType.APPLICATION_JSON)
                .retrieve()
                .toBodilessEntity()
                .block();
    }

    public ContainerInfo assignUserContainer() {
        String containerId = createUserContainer().block();
        startUserContainer(containerId);
        String containerData = getContainerPort(containerId);
        ContainerInfo containerInfo = new ContainerInfo(containerId, containerData);

        return containerInfo;
    }

    public void releaseUserSession(String containerId) {
        this.dockerWebClient.build()
                .delete()
                .uri("containers/" + containerId + "?force=true&v=true")
                .retrieve()
                .toBodilessEntity()
                .subscribe();
    }

    public String getContainerPort(String containerId) {
        String data = this.dockerWebClient.build()
                .get()
                .uri("containers/" + containerId + "/json")
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<String>(){})
                .block();

        ObjectMapper objectMapper = new ObjectMapper();
        String containerPort;
        try {
            JsonNode json = objectMapper.readTree(data);
            containerPort = json.get("NetworkSettings").get("Ports").get("2375/tcp").get(0).get("HostPort").asText();
            return containerPort;
        } catch (Exception e) {
            // Todo: 예외 잡기
            System.out.println("JSON 참조 틀림");
        }
        // Todo: 이렇게 예외 처리 밖에 하는게 맞나?
        return data;
    }

    public String getHostStatus(int containerPort) {
        // Todo: 상태 코드 예외 잡기
        this.containerWebClient.build()
                .get()
                .uri(containerPort + "/_ping")
                .retrieve()
                .onStatus(HttpStatus.INTERNAL_SERVER_ERROR::equals, clientResponse -> Mono.just(new Exception()))
                .bodyToMono(String.class)
                .onErrorResume(e -> {
                    return Mono.just(STARTING);
                }).block();

        return READY;
    }
}
