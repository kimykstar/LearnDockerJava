package com.LearnDocker.LearnDocker;

import java.util.*;

public record CreateContainerBody(String Image, HostConfig HostConfig, List<String> Env, List<String> Cmd) {
    public record HostConfig(boolean Privileged, Map<String, List<PortBinding>> PortBindings, List<String> ExtraHosts) {

    }

    public record PortBinding(String HostPort, String HostIp) {

    }
}
