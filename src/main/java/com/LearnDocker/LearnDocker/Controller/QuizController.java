package com.LearnDocker.LearnDocker.Controller;

import com.LearnDocker.LearnDocker.DTO.Quiz;
import com.LearnDocker.LearnDocker.Exception.BadQuizIdException;
import com.LearnDocker.LearnDocker.Service.QuizService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping(value="api/quiz")
public class QuizController {
    private QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }
    
    @GetMapping(value="/{quizId}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable(value="quizId") int quizId) {
        Quiz quiz = this.quizService.getQuizById(quizId);
        return ResponseEntity.ok(quiz);
    }

    @GetMapping("/{quizId}/access")
    public Mono<Void> accessQuiz(@PathVariable("quizId") int quizId, ServerWebExchange request) {
        return request.getSession()
                .flatMap(session -> {
                    int level = Integer.parseInt(Objects.requireNonNull(Objects.toString(session.getAttribute("level"), null)));
                    return Mono.fromRunnable(() -> this.quizService.accessQuiz(quizId, level));
                });
    }

    @GetMapping("/{quizId}/submit")
    public Mono<String> gradeQuiz(@PathVariable("quizId") int quizId, @RequestParam(value="userAnswer", required=false) String userAnswer, ServerWebExchange request) {
        return request.getSession()
                .flatMap(session -> {
                    int containerPort = Integer.parseInt(Objects.requireNonNull(Objects.toString(session.getAttribute("containerPort"))));
                    try {
                        return this.quizService.grade(quizId, containerPort, userAnswer);
                    } catch (BadQuizIdException e) {
                        // Todo: 예외 처리
                        e.printStackTrace();
                    }
                    return Mono.empty();
                });
    }

}
