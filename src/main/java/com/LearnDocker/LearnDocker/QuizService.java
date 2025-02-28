package com.LearnDocker.LearnDocker;

import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.ErrorResponseException;

@Service
public class QuizService {
    private QuizRepository quizRepository;

    public QuizService(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    public String getQuizById(int quizId) {
        String quiz = this.quizRepository.findById(quizId).toString();
        System.out.println(quiz);
        return this.quizRepository.findById(quizId).toString();
    }

    public void accessQuiz(int quizId, int level) {
        if (quizId < level) {
            throw new ErrorResponseException(HttpStatusCode.valueOf(400));
        }
    }
}
