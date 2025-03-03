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
    private final WebClient.Builder dockerWebClient;
    private final WebClient.Builder containerWebClient;

    @Autowired
    public SandboxService(@Qualifier("DockerWebClient") WebClient dockerWebClient, @Qualifier("ContainerWebClient") WebClient containerWebClient) {
        this.dockerWebClient = dockerWebClient.mutate();
        this.containerWebClient = containerWebClient.mutate();
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
        return this.dockerWebClient.build()
                .post()
                .uri("/containers/create")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>(){})
                .map(response -> (String) response.get("Id"));
    }

    public Mono<Void> startUserContainer(String containerId) {
        // Start Container
        return this.dockerWebClient.build()
                .post()
                .uri("/containers/" + containerId + "/start")
                .contentType(MediaType.APPLICATION_JSON)
                .retrieve()
                .toBodilessEntity()
                .then();
    }

    public Mono<String> getContainerPort(String containerId) {
        return this.dockerWebClient.build()
                .get()
                .uri("containers/" + containerId + "/json")
                .retrieve()
                .bodyToMono(String.class)
                .flatMap(data -> {
                    ObjectMapper objectMapper = new ObjectMapper();
                    String containerPort;
                    try {
                        JsonNode json = objectMapper.readTree(data);
                        containerPort = json.get("NetworkSettings").get("Ports").get("2375/tcp").get(0).get("HostPort").asText();
                        return Mono.just(containerPort);
                    } catch (Exception e) {
                        // Todo: 예외 잡기
                        System.out.println("JSON 참조 틀림");
                    }
                    return Mono.just("");
                });
    }

    public Mono<Void> releaseUserSession(String containerId) {
        return this.dockerWebClient.build()
                .delete()
                .uri("containers/" + containerId + "?force=true&v=true")
                .retrieve()
                .toBodilessEntity()
                .then();
    }

    public String getHostStatus(int containerPort) {
        // Todo: 상태 코드 예외 잡기
        this.containerWebClient.build()
                .get()
                .uri(uriBuilder -> uriBuilder.port(containerPort).path("/_ping").build())
                .retrieve()
                .onStatus(HttpStatus.INTERNAL_SERVER_ERROR::equals, clientResponse -> Mono.just(new Exception()))
                .bodyToMono(String.class)
                .onErrorResume(e -> {
                    return Mono.just(STARTING);
                }).block();

        return READY;
    }

    public Elements getUserContainersImages(int containerPort) {
        String responseImages = this.containerWebClient.build()
                .get()
                .uri(uriBuilder -> uriBuilder.port(containerPort).path("/images/json").build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
        Elements.Image[] images = parseImages(responseImages);

        String responseContainers = this.containerWebClient.build()
                .get()
                .uri(uriBuilder -> uriBuilder
                        .port(containerPort)
                        .path("/containers/json")
                        .queryParam("all", "true").build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
        Elements.Container[] containers = parseContainers(responseContainers);
        
        return new Elements(images, containers);
    }

    // Todo: 아래 파싱 함수들 리팩토링 하기, 예외 처리
    public Elements.Image[] parseImages(String responseImages) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode rootArray = objectMapper.readTree(responseImages);
            List<Elements.Image> imageList = new ArrayList<>();
            for (JsonNode imageNode : rootArray) {
                String id = imageNode.get("Id").asText();
                String name = imageNode.get("RepoTags").get(0).asText().split(":")[0];
                imageList.add(new Elements.Image(id, name));
            }
            return imageList.toArray(new Elements.Image[0]);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    
    public Elements.Container[] parseContainers(String responseContainers) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode rootArray = objectMapper.readTree(responseContainers);
            List<Elements.Container> containerList = new ArrayList<>();
            for (JsonNode containerNode : rootArray) {
                String id = containerNode.get("Id").asText();
                String name = containerNode.get("Names").get(0).asText().split("/")[1];
                String image = containerNode.get("Image").asText();
                String status = containerNode.get("State").asText();
                containerList.add(new Elements.Container(id, name, image, status));
            }
            return containerList.toArray(new Elements.Container[0]);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


}
