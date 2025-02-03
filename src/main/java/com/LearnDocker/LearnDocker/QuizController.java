package com.LearnDocker.LearnDocker;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/quiz") // Base Path 설정
public class QuizController {
    private QuizService quizService;
    public QuizController(QuizService quizService) {
        // Quiz를 가져오기 위한 Service 의존성 주입
        this.quizService = quizService;
    }
    
    @GetMapping(value="/{quizId}")
    public String getQuizById(@PathVariable(value="quizId") int quizId) {
        return this.quizService.getQuizById(quizId);
    }
}
