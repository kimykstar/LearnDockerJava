package com.LearnDocker.LearnDocker;

import com.LearnDocker.LearnDocker.DTO.ContainerInfo;
import com.LearnDocker.LearnDocker.DTO.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class SandboxService {
    private final DockerAPI dockerAPI;
    private final CreateContainerBody newContainerBody;

    @Autowired
    public SandboxService(DockerAPI dockerAPI, CreateContainerBody containerBody) {
        this.dockerAPI = dockerAPI;
        this.newContainerBody = containerBody;
    }

    public Mono<ContainerInfo> assignUserContainer() {
        return this.dockerAPI.createUserContainerAPI(newContainerBody)
                .flatMap(containerId ->
                        this.dockerAPI.startUserContainerAPI(containerId)
                                .then(this.dockerAPI.getContainerPortAPI(containerId)
                                        .map(containerPort -> new ContainerInfo(containerId, containerPort)))
                );
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

    public Mono<String> processUserCommand(String command, String containerId) {
        return this.dockerAPI.requestDockerCommand(containerId, command.split(" "));
    }
}
