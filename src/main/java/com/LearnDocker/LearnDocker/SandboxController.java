package com.LearnDocker.LearnDocker;

import com.LearnDocker.LearnDocker.DTO.Command;
import com.LearnDocker.LearnDocker.DTO.Elements;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping(value="api/sandbox")
public class SandboxController {

    private final SandboxService sandboxService;
    public SandboxController(SandboxService sandboxService) {
        this.sandboxService = sandboxService;
    }

    @PostMapping(value="start")
    public Mono<ResponseEntity<Map<String, Long>>> userContainerStart(final HttpServletRequest httpRequest) {
        final HttpSession session = httpRequest.getSession();
        final long creationTime = session.getCreationTime();
        final long expirationTime = session.getMaxInactiveInterval() * 1000L;
        final long maxAge = creationTime + expirationTime;

        return this.sandboxService.assignUserContainer()
                .map(containerInfo -> {
                    session.setAttribute("containerId", containerInfo.getContainerId());
                    session.setAttribute("containerPort", containerInfo.getContainerPort());
                    session.setAttribute("level", 0);

                    return ResponseEntity.ok(Map.of("endDate", maxAge));
                });
    }

    @DeleteMapping(value="release")
    public Mono<Void> releaseUserSession(final HttpServletRequest httpRequest) {
        final HttpSession session = httpRequest.getSession();
        return Mono.justOrEmpty(session.getAttribute("containerId"))
                .map(Objects::toString)
                .flatMap(this.sandboxService::releaseUserSession)
                .then(Mono.fromRunnable(session::invalidate));
    }

    @GetMapping(value="hostStatus")
    public Mono<ResponseEntity<String>> getHostStatus(final HttpServletRequest httpRequest) {
        final HttpSession session = httpRequest.getSession();
        return Mono.justOrEmpty(session.getAttribute("containerPort"))
                .map(containerPort ->
                    Integer.parseInt(Objects.toString(containerPort, "0")))
                .flatMap(this.sandboxService::getHostStatus)
                .map(ResponseEntity::ok);
    }

    @GetMapping(value="elements")
    public Mono<ResponseEntity<Elements>> getUserContainerImages(HttpServletRequest httpServletRequest) {
            final HttpSession session = httpServletRequest.getSession();
            return Mono.justOrEmpty(session.getAttribute("containerPort"))
                    .map(Objects::toString)
                    .map(Integer::parseInt)
                    .flatMap(this.sandboxService::getUserContainersImages)
                    .map(ResponseEntity::ok);
    }

    @PostMapping("command")
    public Mono<ResponseEntity<String>> processUserCommand(HttpServletRequest httpServletRequest, @RequestBody Command body) {
        try {
            String command = CommandValidator.getValidCommand(body.getCommand());
            String containerId = Objects.toString(httpServletRequest.getSession().getAttribute("containerId"));
            return sandboxService.processUserCommand(command, containerId)
                    .map(ResponseEntity::ok);
        } catch (Exception e) {
            // 예외처리
            System.out.println();
        }
        // TODO: 예외 처리
        return null;
    }

}
