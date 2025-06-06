package com.LearnDocker.LearnDocker.Service;

import com.LearnDocker.LearnDocker.DTO.Elements;
import com.LearnDocker.LearnDocker.DockerAPI;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import static org.mockito.Mockito.when;

@SpringBootTest
class QuizServiceTest {
    @Autowired
    private QuizService quizService;
    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private DockerAPI dockerAPI;

    private static final int TEST_CONTAINER_PORT = 8000;

    @Test
    @DisplayName("이미지 가져오기 채점 테스트")
    public void GradeQuiz1Test() {
        // Given
        when(dockerAPI.getUserImagesAPI(TEST_CONTAINER_PORT)).thenReturn(
                Mono.just(new Elements.Image[]{
                        new Elements.Image("sha256:1edcbfcd2806e4acf851dd62791d360eb97a757e07944a7395bd796ecba06ef7", "learndocker.io/hello-world@sha256")
                })
        );

        // When
        Mono<String> result = this.quizService.gradeQuiz1(TEST_CONTAINER_PORT);

        StepVerifier.create(result)
                .expectNext("{\"quizResult\":\"SUCCESS\"}")
                .verifyComplete();
    }

    @Test
    @DisplayName("이미지 목록 확인하기 채점 테스트")
    public void GradeQuiz2Test() {
        String userAnswer = "1edcbf";
        int level = 2;
        when(dockerAPI.getUserImagesAPI(TEST_CONTAINER_PORT)).thenReturn(
                Mono.just(new Elements.Image[]{
                        new Elements.Image("sha256:1edcbfcd2806e4acf851dd62791d360eb97a757e07944a7395bd796ecba06ef7", "learndocker.io/hello-world@sha256")
                })
        );

        Mono<String> result = this.quizService.gradeQuiz2(TEST_CONTAINER_PORT, userAnswer);

        StepVerifier.create(result)
                .expectNext("{\"quizResult\":\"SUCCESS\"}")
                .verifyComplete();
    }

    @Test
    @DisplayName("이미지 삭제하기 채점 테스트")
    public void GradeQuiz3Test() {
        when(dockerAPI.getUserImagesAPI(TEST_CONTAINER_PORT)).thenReturn(
                Mono.just(new Elements.Image[]{})
        );

        Mono<String> result = this.quizService.gradeQuiz3(TEST_CONTAINER_PORT);

        StepVerifier.create(result)
                .expectNext("{\"quizResult\":\"SUCCESS\"}")
                .verifyComplete();
    }

    @Test
    @DisplayName("컨테이너 생성 채점 테스트")
    public void GradeQuiz4Test() {
        when(dockerAPI.getContainersAPI(TEST_CONTAINER_PORT)).thenReturn(
                Mono.just(new Elements.Container[]{
                        new Elements.Container("aa86eacfb3b3ed4cd362c1e88fc89a53908ad05fb3a4103bca3f9b28292d14bf",
                                "Test Name", "created", "learndocker.io/hello-world")
                })
        );

        Mono<String> result = this.quizService.gradeQuiz4(TEST_CONTAINER_PORT);

        StepVerifier.create(result)
                .expectNext("{\"quizResult\":\"SUCCESS\"}")
                .verifyComplete();
    }

    @Test
    @DisplayName("컨테이너 실행 채점 테스트")
    public void GradeQuiz5Test() {
        String userAnswer = "부스트캠프 웹모바일 9기 화이팅!";

        Mono<String> result = this.quizService.gradeQuiz5(userAnswer);

        StepVerifier.create(result)
                .expectNext("{\"quizResult\":\"SUCCESS\"}")
                .verifyComplete();
    }

    @Test
    @DisplayName("컨테이너 생성 및 실행 채점 테스트")
    public void GradeQuiz6Test() {
        when(this.dockerAPI.getContainersAPI(TEST_CONTAINER_PORT)).thenReturn(
                Mono.just(new Elements.Container[]{
                        new Elements.Container("aa86eacfb3b3ed4cd362c1e88fc89a53908ad05fb3a4103bca3f9b28292d14bf",
                                "Test Name", "running", "learndocker.io/joke")
                })
        );

        Mono<String> result = this.quizService.gradeQuiz6(TEST_CONTAINER_PORT);

        StepVerifier.create(result)
                .expectNext("{\"quizResult\":\"SUCCESS\"}")
                .verifyComplete();
    }

    @Test
    @DisplayName("컨테이너 로그 확인하기 채점 테스트")
    public void GradeQuiz7Test() {
        String userAnswer = "스페이스바";

        Mono<String> result = this.quizService.gradeQuiz7(userAnswer);

        StepVerifier.create(result)
                .expectNext("{\"quizResult\":\"SUCCESS\"}")
                .verifyComplete();
    }

    @Test
    @DisplayName("컨테이너 목록 확인하기 채점 테스트")
    public void GradeQuiz8Test() {
        String userAnswer = "bc23ea";
        when(this.dockerAPI.getContainersAPI(TEST_CONTAINER_PORT)).thenReturn(
            Mono.just(new Elements.Container[]{
                    new Elements.Container("bc23eacfb3b3ed4cd362c1e88fc89a53908ad05fb3a4103bca3f9b28292d14bf",
                            "Test Name2", "running", "learndocker.io/joke")
            })
        );

        Mono<String> result = this.quizService.gradeQuiz8(TEST_CONTAINER_PORT, userAnswer);

        StepVerifier.create(result)
                .expectNext("{\"quizResult\":\"SUCCESS\"}")
                .verifyComplete();
    }

    @Test
    @DisplayName("컨테이너 중지하기 채점 테스트")
    public void GradeQuiz9Test() {
        when(this.dockerAPI.getContainersAPI(TEST_CONTAINER_PORT)).thenReturn(
                Mono.just(new Elements.Container[]{
                        new Elements.Container("bc23eacfb3b3ed4cd362c1e88fc89a53908ad05fb3a4103bca3f9b28292d14bf",
                                "Test Name2", "exited", "learndocker.io/joke")
                })
        );

        Mono<String> result = this.quizService.gradeQuiz9(TEST_CONTAINER_PORT);

        StepVerifier.create(result)
                .expectNext("{\"quizResult\":\"SUCCESS\"}")
                .verifyComplete();
    }

    @Test
    @DisplayName("컨테이너 삭제하기 채점 테스트")
    public void GradeQuiz10Test() {
        when(this.dockerAPI.getContainersAPI(TEST_CONTAINER_PORT)).thenReturn(
                Mono.just(new Elements.Container[]{})
        );

        Mono<String> result = this.quizService.gradeQuiz10(TEST_CONTAINER_PORT);

        StepVerifier.create(result)
                .expectNext("{\"quizResult\":\"SUCCESS\"}")
                .verifyComplete();
    }
}