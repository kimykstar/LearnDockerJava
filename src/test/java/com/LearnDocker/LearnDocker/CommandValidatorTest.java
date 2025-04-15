package com.LearnDocker.LearnDocker;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.stream.Stream;

class CommandValidatorTest {
    @ParameterizedTest
    @DisplayName("Invalid Command 유효성 검증 테스트")
    @MethodSource("invalidCommandProvider")
    public void userCommandInvalidationTest(String command) {
        CommandValidator validator = new CommandValidator();

        Assertions.assertThatThrownBy(() -> validator.getValidCommand(command))
                .isInstanceOf(Exception.class);
    }

    @ParameterizedTest
    @DisplayName("Valid Command 유효성 검증 테스트")
    @MethodSource("validCommandProvider")
    public void userCommandValidationTest(String command) {
        CommandValidator validator = new CommandValidator();

        try {
            String result = validator.getValidCommand(command);
            Assertions.assertThat(result)
                    .isEqualTo(command);
        } catch (Exception e) {
            Assertions.fail("예외가 발생하면 안됩니다.");
        }
    }

    public static Stream<Arguments> invalidCommandProvider() {
        return Stream.of(
                // Option Check
                Arguments.of("docker run -v /:/host ubuntu cat /host/etc/passwd"),
                Arguments.of("docker run --volume /:/host ubuntu cat /host/etc/passwd"),
                Arguments.of("docker container create -v /:/host ubuntu cat /host/etc/passwd"),
                Arguments.of("docker run -p 8080:80"),
                // Shell command
                Arguments.of("sh -c docker ps; docker images"),
                Arguments.of("docker ps | grep my_container"),
                // push, exec
                Arguments.of("docker push hello-world"),
                Arguments.of("docker exec -it ubuntu")
        );
    }

    public static Stream<Arguments> validCommandProvider() {
        return Stream.of(
                Arguments.of("docker run hello-world"),
                Arguments.of("docker start hello-world"),
                Arguments.of("docker ps"),
                Arguments.of("docker images"),
                Arguments.of("docker create hello-world"),
                Arguments.of("docker stop hello-world")
        );
    }
}