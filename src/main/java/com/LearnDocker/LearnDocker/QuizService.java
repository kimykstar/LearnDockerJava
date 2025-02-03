package com.LearnDocker.LearnDocker;

import org.springframework.stereotype.Service;

@Service
public class QuizService {
    private QuizRepository quizRepository;

    public QuizService(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    public String getQuizById(long quizId) {
        return this.quizRepository.findById(quizId).toString();
    }
}
