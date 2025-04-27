package com.LearnDocker.LearnDocker.Configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class WebConfig {

    @Value("classpath:/static/index.html")
    private Resource indexHtml;

    @Bean
    public RouterFunction<ServerResponse> staticRouter() {
        return RouterFunctions
                .resources("/**", new ClassPathResource("static/"))
                .and(RouterFunctions.route(
                        req -> req.method() == HttpMethod.GET && !req.path().startsWith("/api"),
                        request -> ServerResponse.ok()
                                .contentType(MediaType.TEXT_HTML)
                                .bodyValue(indexHtml)
                ));
    }
}