package com.LearnDocker.LearnDocker;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import reactor.core.publisher.Mono;

@SpringBootTest
public class SandboxServiceTests {
    private final SandboxService sandboxService;
    public SandboxServiceTests(SandboxService sandboxService) {
        this.sandboxService = sandboxService;
    }
    @Test
    public void createUserContainer() {
        Mono<String> response = this.sandboxService.createUserContainer();


    }
}
