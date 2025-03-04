package com.LearnDocker.LearnDocker.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class AppConfig {
    @Bean(name="DockerWebClient")
    public WebClient getWebClient() {
        return WebClient.create("http://localhost:2375");
    }

    @Bean(name="ContainerWebClient")
    public WebClient getContainerWebClient() {
        return WebClient.create("http://localhost");
    }

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }
}
