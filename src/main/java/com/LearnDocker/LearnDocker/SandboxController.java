package com.LearnDocker.LearnDocker;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping(value="api/sandbox")
public class SandboxController {

    private final SandboxService sandboxService;
    public SandboxController(SandboxService sandboxService) {
        this.sandboxService = sandboxService;
    }

    @PostMapping(value="start")
    public ResponseEntity<Map<String, Long>> userContainerStart(final HttpServletRequest httpRequest) {
        this.sandboxService.assignUserContainer();
        final HttpSession session = httpRequest.getSession();
        long creationTime = session.getCreationTime();
        long expirationTime = session.getMaxInactiveInterval() * 1000L;
        long maxAge = creationTime + expirationTime;

        return ResponseEntity.ok(Map.of("endDate", maxAge));
    }
}
