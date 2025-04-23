package com.LearnDocker.LearnDocker.Controller;

import com.LearnDocker.LearnDocker.CommandValidator;
import com.LearnDocker.LearnDocker.DTO.Command;
import com.LearnDocker.LearnDocker.DTO.Elements;
import com.LearnDocker.LearnDocker.Service.SandboxService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ServerWebExchange;
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
    public Mono<ResponseEntity<Map<String, Long>>> userContainerStart(final ServerWebExchange request) {
        return request.getSession()
                .flatMap(session -> {
                    long startTime = session.getCreationTime().toEpochMilli();
                    long expirationTime = 4 * 3600 * 1000;
                    long maxAge = expirationTime + startTime;

                    return this.sandboxService.assignUserContainer()
                            .flatMap(containerInfo -> {
                                session.getAttributes().put("containerId", containerInfo.getContainerId());
                                session.getAttributes().put("containerPort", containerInfo.getContainerPort());
                                session.getAttributes().put("level", 0);

                                return session.save().thenReturn(
                                        ResponseEntity.ok(Map.of("endDate", maxAge))
                                );
                            });
                });
    }

    @DeleteMapping("release")
    public Mono<Void> releaseUserSession(final ServerWebExchange request) {
        return request.getSession()
                .flatMap(session -> {
                    String containerId = Objects.toString(session.getAttribute("containerId"), null);
                    return this.sandboxService.releaseUserSession(containerId)
                            .then(session.invalidate());
                });
    }


    @GetMapping(value="hostStatus")
    public Mono<ResponseEntity<String>> getHostStatus(final ServerWebExchange request) {
        return request.getSession()
                .flatMap(session -> {
                    int containerPort = Integer.parseInt(Objects.toString(session.getAttribute("containerPort"), "0"));
                    return this.sandboxService.getHostStatus(containerPort);
                })
                .map(ResponseEntity::ok);
    }

    @GetMapping(value="elements")
    public Mono<ResponseEntity<Elements>> getUserContainerImages(ServerWebExchange request) {

            return request.getSession()
                    .flatMap(session -> {
                        int containerPort = Integer.parseInt(Objects.toString(session.getAttribute("containerPort"), "0"));
                        return this.sandboxService.getUserContainersImages(containerPort);
                    })
                    .map(ResponseEntity::ok);
    }

    @PostMapping("command")
    public Mono<ResponseEntity<String>> processUserCommand(ServerWebExchange request, @RequestBody Command body) {
        try {
            String command = CommandValidator.getValidCommand(body.getCommand());

            return request.getSession()
                    .flatMap(session -> {
                        String containerId = Objects.toString(session.getAttribute("containerId"));
                        return this.sandboxService.processUserCommand(command, containerId);
                    })
                    .map(ResponseEntity::ok);
        } catch (Exception e) {
            // 예외처리
            System.out.println();
        }
        // TODO: 예외 처리
        return null;
    }

}
