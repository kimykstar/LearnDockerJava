package com.LearnDocker.LearnDocker;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.ErrorResponseException;

import java.util.Optional;

@Service
public class QuizService {
    private QuizRepository quizRepository;

    public QuizService(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
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
