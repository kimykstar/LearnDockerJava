package com.LearnDocker.LearnDocker.Controller;

import com.LearnDocker.LearnDocker.DTO.Quiz;
import com.LearnDocker.LearnDocker.Service.QuizService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

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

    @GetMapping(value="/{quizId}/access")
    public void accessQuiz(@PathVariable(value="quizId") int quizId, HttpServletRequest request) {
        HttpSession session = request.getSession();
        int level = Integer.parseInt(Objects.toString(session.getAttribute("level"), null));
        this.quizService.accessQuiz(quizId, level);
    }
}
