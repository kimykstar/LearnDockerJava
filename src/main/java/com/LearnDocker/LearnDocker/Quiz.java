package com.LearnDocker.LearnDocker;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Entity
@Table(name="Quiz")
@Getter
@Setter
public class Quiz {
    @Id
    private int id;
    @NonNull
    @Column(name="content")
    private String content;
}
