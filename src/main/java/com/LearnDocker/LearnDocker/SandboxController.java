package com.LearnDocker.LearnDocker;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(value="sandbox")
public class SandboxController {

    private final SandboxService sandboxService;
    public SandboxController(SandboxService sandboxService) {
        this.sandboxService = sandboxService;
    }

    @PostMapping(value="start")
    public void userContainerStart(final HttpServletRequest httpRequest) {
        this.sandboxService.assignUserContainer();
        final HttpSession session = httpRequest.getSession();
        if (session.getAttribute("Session") == null) {
            session.setAttribute("Session", "hello");
        }
    }
}
