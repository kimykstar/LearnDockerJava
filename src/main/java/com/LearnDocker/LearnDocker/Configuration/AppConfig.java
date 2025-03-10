package com.LearnDocker.LearnDocker.Configuration;

import com.LearnDocker.LearnDocker.CreateContainerBody;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Configuration
public class AppConfig {
    @Bean(name="DockerWebClient")
    public WebClient getWebClient() {
        return WebClient.builder()
                .baseUrl("http://localhost:2375")
                .build();
    }

    @Bean(name="ContainerWebClient")
    public WebClient getContainerWebClient() {
        return WebClient.builder()
                .baseUrl("http://localhost")
                .build();
    }

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }

    @Bean
    public CreateContainerBody containerInfo() {
        return new CreateContainerBody(
                "dind",
                new CreateContainerBody.HostConfig(
                        true,
                        Map.of("2375/tcp", List.of(new CreateContainerBody.PortBinding("0", "0.0.0.0")))
                ),
                List.of("DOCKER_TLS_CERTDIR="),
                List.of("--tls=false")
        );
    }
}
