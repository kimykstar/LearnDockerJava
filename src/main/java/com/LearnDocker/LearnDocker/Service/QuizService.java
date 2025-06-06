package com.LearnDocker.LearnDocker.Service;

import com.LearnDocker.LearnDocker.DTO.Quiz;
import com.LearnDocker.LearnDocker.DockerAPI;
import com.LearnDocker.LearnDocker.Exception.BadQuizIdException;
import com.LearnDocker.LearnDocker.Repository.QuizRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.ErrorResponseException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Optional;

@Service
public class QuizService {
    private static final String SUCCESS = "{\"quizResult\":\"SUCCESS\"}";
    private static final String FAIL = "{\"quizResult\":\"FAIL\"}";
    private QuizRepository quizRepository;
    private DockerAPI dockerAPI;

    public QuizService(QuizRepository quizRepository, DockerAPI dockerAPI) {
        this.quizRepository = quizRepository;
        this.dockerAPI = dockerAPI;
    }

    public Quiz getQuizById(int quizId) {
        Optional<Quiz> optionalQuiz = this.quizRepository.findById(quizId);
        return optionalQuiz.orElse(null);
    }

    public void accessQuiz(int quizId, int level) {
        if (quizId < level) {
            throw new ErrorResponseException(HttpStatus.BAD_REQUEST);
        }
    }

    public Mono<String> grade(int quizId, int containerPort, String userAnswer) throws BadQuizIdException {
        switch (quizId) {
            case 1:
                return gradeQuiz1(containerPort);
            case 2:
                return gradeQuiz2(containerPort, userAnswer);
            case 3:
                return gradeQuiz3(containerPort);
            case 4:
                return gradeQuiz4(containerPort);
            case 5:
                return gradeQuiz5(userAnswer);
            case 6:
                return gradeQuiz6(containerPort);
            case 7:
                return gradeQuiz7(userAnswer);
            case 8:
                return gradeQuiz8(containerPort, userAnswer);
            case 9:
                return gradeQuiz9(containerPort);
            case 10:
                return gradeQuiz10(containerPort);
        }
        throw new BadQuizIdException();
    }

    public Mono<String> gradeQuiz1(int containerPort) {
        return this.dockerAPI.getUserImagesAPI(containerPort)
                .flatMapMany(Flux::fromArray)
                .filter(image ->  image.getName().contains("learndocker.io/hello-world"))
                .next()
                .map(image -> SUCCESS)
                .switchIfEmpty(Mono.just(FAIL));
    }

    public Mono<String> gradeQuiz2(int containerPort, String userAnswer) {
        return this.dockerAPI.getUserImagesAPI(containerPort)
                .flatMapMany(Flux::fromArray)
                .filter(image -> {
                    if (userAnswer.length() < 4) return false;
                    for (int i = 0; i < userAnswer.length(); i++) {
                        if (userAnswer.charAt(i) != image.getId().charAt(i + 7)) {
                            return false;
                        }
                    }
                    return true;
                })
                .next()
                .map(image -> SUCCESS)
                .switchIfEmpty(Mono.just(FAIL));
    }

    public Mono<String> gradeQuiz3(int containerPort) {
        return this.dockerAPI.getUserImagesAPI(containerPort)
                .flatMapMany(Flux::fromArray)
                .filter(image -> {
                    if (image.getName().contains("learndocker.io/hello-world")) return false;
                    return true;
                })
                .next()
                .map(image -> FAIL)
                .switchIfEmpty(Mono.just(SUCCESS));
    }

    public Mono<String> gradeQuiz4(int containerPort) {
        String answerContainerName = "learndocker.io/hello-world";
        return this.dockerAPI.getContainersAPI(containerPort)
                .flatMapMany(Flux::fromArray)
                .filter(container ->{
                    System.out.println("RRRR" + container.getImage());
                    return container.getImage().equals(answerContainerName);
                })
                .next()
                .map(container -> SUCCESS)
                .switchIfEmpty(Mono.just(FAIL));
    }

    public Mono<String> gradeQuiz5(String userAnswer) {
        String answer = "부스트캠프 웹모바일 9기 화이팅!";

        return (answer.equals(userAnswer)) ? Mono.just(SUCCESS) : Mono.just(FAIL);
    }

    public Mono<String> gradeQuiz6(int containerPort) {
        String containerName = "learndocker.io/joke";
        String containerStatus = "running";

        return this.dockerAPI.getContainersAPI(containerPort)
                .flatMapMany(Flux::fromArray)
                .filter(container -> (container.getImage().equals(containerName) && container.getStatus().equals(containerStatus)))
                .next()
                .map(container -> SUCCESS)
                .switchIfEmpty(Mono.just(FAIL));
    }

    public Mono<String> gradeQuiz7(String userAnswer) {
        String answer = "스페이스바";

        return (userAnswer.equals(answer)) ? Mono.just(SUCCESS) : Mono.just(FAIL);
    }

    public Mono<String> gradeQuiz8(int containerPort, String userAnswer) {
        return this.dockerAPI.getContainersAPI(containerPort)
                .flatMapMany(Flux::fromArray)
                .filter(container -> {
                    if (userAnswer.length() < 4) return false;
                    return container.getId().startsWith(userAnswer);
                }).next()
                .map(container -> SUCCESS)
                .switchIfEmpty(Mono.just(FAIL));
    }

    public Mono<String> gradeQuiz9(int containerPort) {
        String answerContainerName = "learndocker.io/joke";
        String answerStatus = "exited";

        return this.dockerAPI.getContainersAPI(containerPort)
                .flatMapMany(Flux::fromArray)
                .filter(container -> {
                    return container.getImage().equals(answerContainerName) && container.getStatus().equals(answerStatus);
                })
                .next()
                .map(container -> SUCCESS)
                .switchIfEmpty(Mono.just(FAIL));
    }

    public Mono<String> gradeQuiz10(int containerPort) {
        return this.dockerAPI.getContainersAPI(containerPort)
                .filter(containers -> (containers.length > 0) ? false : true)
                .map(containers -> SUCCESS)
                .switchIfEmpty(Mono.just(FAIL));
    }
}
