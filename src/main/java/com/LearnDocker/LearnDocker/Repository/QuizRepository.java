package com.LearnDocker.LearnDocker.Repository;

import com.LearnDocker.LearnDocker.DTO.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Integer> {
}
