package com.LearnDocker.LearnDocker;

import org.springframework.stereotype.Service;

@Service
public class QuizService {
    private QuizRepository quizRepository;

    public QuizService(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    public String getQuizById(int quizId) {
        return this.quizRepository.findById(quizId).toString();
    }
}
