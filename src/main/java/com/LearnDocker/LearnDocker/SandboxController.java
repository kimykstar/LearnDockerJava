package com.LearnDocker.LearnDocker;

import com.LearnDocker.LearnDocker.DTO.ContainerInfo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
    public ResponseEntity<Map<String, Long>> userContainerStart(final HttpServletRequest httpRequest) {
        final HttpSession session = httpRequest.getSession();
        ContainerInfo containerInfo = this.sandboxService.assignUserContainer();
        long creationTime = session.getCreationTime();
        long expirationTime = session.getMaxInactiveInterval() * 1000L;
        long maxAge = creationTime + expirationTime;

        session.setAttribute("containerId", containerInfo.getContainerId());
        session.setAttribute("containerPort", containerInfo.getContainerPort());
        session.setAttribute("level", 0);

        return ResponseEntity.ok(Map.of("endDate", maxAge));
    }

    @DeleteMapping(value="release")
    public void releaseUserSession(final HttpServletRequest httpRequest) {
        final HttpSession session = httpRequest.getSession();
        // 이렇게 Object객체를 String으로 강제 형변환 하는게 좋은 방법인지 알아보기
        this.sandboxService.releaseUserSession(Objects.toString(session.getAttribute("containerId"), null));
        session.invalidate();
    }

    @GetMapping(value="hostStatus")
    public String getHostStatus(final HttpServletRequest httpRequest) {
        final HttpSession session = httpRequest.getSession();
        final int containerPort = Integer.parseInt(Objects.toString(session.getAttribute("containerPort")));
        return this.sandboxService.getHostStatus(containerPort);
    }

}
