package com.LearnDocker.LearnDocker.DTO;

import lombok.Getter;

public class ExecStart {
    @Getter
    private boolean Detach;
    @Getter
    private boolean Tty;
    public ExecStart(boolean Detach, boolean Tty) {
        this.Detach = Detach;
        this.Tty = Tty;
    }
}
