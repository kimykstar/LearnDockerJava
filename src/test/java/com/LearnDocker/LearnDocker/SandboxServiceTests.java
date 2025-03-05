package com.LearnDocker.LearnDocker;

import com.LearnDocker.LearnDocker.DTO.ContainerInfo;
import com.LearnDocker.LearnDocker.DTO.Elements;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest
public class SandboxServiceTests {

    @MockitoBean
    private DockerAPI dockerAPI;

    @Autowired
    private SandboxService sandboxService;

    private static final String TEST_ELEMENTS_ID = "55e48d950fc04bd9b92587253698668e759f794c7a8046ebb66eb860519fe321";
    private static final String TEST_CONTAINER_PORT = "8000";
    private static final String TEST_IMAGE_NAME = "TEST";
    
    @Test
    @DisplayName("사용자 container 및 할당 테스트")
    public void assignUserContainerTest() {
        // Given
        when(dockerAPI.createUserContainerAPI(any())).thenReturn(
                Mono.just(TEST_ELEMENTS_ID)
        );

        when(dockerAPI.startUserContainerAPI(TEST_ELEMENTS_ID)).thenReturn(
                Mono.empty()
        );

        when(dockerAPI.getContainerPortAPI(TEST_ELEMENTS_ID)).thenReturn(
                Mono.just(TEST_CONTAINER_PORT)
        );

        // When
        Mono<ContainerInfo> result = this.sandboxService.assignUserContainer();

        // Then
        StepVerifier.create(result)
                .expectNextMatches(response ->
                        response.getContainerId().equals(TEST_ELEMENTS_ID) &&
                        response.getContainerPort().equals(TEST_CONTAINER_PORT)
                )
                .expectComplete()
                .verify();
    }

    @Test
    @DisplayName("사용자의 Docker환경에서 Elements를 불러오기 테스트")
    public void getUserContainersImagesTest() {
        // Given
        when(dockerAPI.getUserImagesAPI(Integer.parseInt(TEST_CONTAINER_PORT))).thenReturn(
                Mono.just(new Elements.Image[]{new Elements.Image(
                      TEST_ELEMENTS_ID,
                      TEST_IMAGE_NAME
              )})
        );

        when(dockerAPI.getContainersAPI(Integer.parseInt(TEST_CONTAINER_PORT))).thenReturn(
            Mono.just(new Elements.Container[]{})
        );

        Mono<Elements> result = sandboxService.getUserContainersImages(Integer.parseInt(TEST_CONTAINER_PORT));

        // Then
        StepVerifier.create(result)
                .expectNextMatches(response -> {
                    Elements.Image image = response.getImages()[0];
                    Elements.Container[] containers = response.getContainers();
                    return (
                        image.getId().equals(TEST_ELEMENTS_ID) &&
                        image.getName().equals(TEST_IMAGE_NAME) &&
                        containers.length == 0
                    );
                }).expectComplete()
                .verify();
    }

}
