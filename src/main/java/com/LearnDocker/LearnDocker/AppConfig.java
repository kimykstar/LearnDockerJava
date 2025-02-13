package com.LearnDocker.LearnDocker;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class AppConfig {
    @Bean
    public WebClient getWebClient() {
        return WebClient.create("http://localhost:2375");
    }
}
