package com.LearnDocker.LearnDocker;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(value="sandbox")
public class SandboxController {

    private SandboxService sandboxService;
    public SandboxController(SandboxService sandboxService) {
        this.sandboxService = sandboxService;
    }

    @PostMapping(value="start")
    public void userContainerStart() {
        Mono<String> response = this.sandboxService.createUserContainer();
    }

}
