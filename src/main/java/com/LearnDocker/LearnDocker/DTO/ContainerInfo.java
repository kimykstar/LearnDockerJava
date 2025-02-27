package com.LearnDocker.LearnDocker.DTO;

import lombok.Getter;
import lombok.Setter;

public class ContainerInfo {
    @Getter
    @Setter
    private String containerId;

    @Getter
    @Setter
    private String containerPort;

    public ContainerInfo(String containerId, String containerPort) {
        this.containerId = containerId;
        this.containerPort = containerPort;
    }
}
