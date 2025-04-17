package com.LearnDocker.LearnDocker.Service;

import com.LearnDocker.LearnDocker.DTO.Elements;
import com.LearnDocker.LearnDocker.DTO.Quiz;
import com.LearnDocker.LearnDocker.DockerAPI;
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

    public Mono<String> gradeQuiz1(String sessionId, int containerPort, int level) {
        return this.dockerAPI.getUserImagesAPI(containerPort)
                .flatMapMany(Flux::fromArray)
                .filter(image ->  image.getName().contains("learndocker.io/hello-world"))
                .next()
                .map(image -> SUCCESS)
                .switchIfEmpty(Mono.just(FAIL));

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
}
