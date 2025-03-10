package com.LearnDocker.LearnDocker.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExecCreate {
    private final boolean AttachStdin;
    private final boolean AttachStdout;
    private final boolean AttachStderr;
    private boolean Tty;
    private String[] Cmd;

    public ExecCreate(boolean AttachStdin, boolean AttachStdout, boolean AttachStderr, boolean Tty, String[] Cmd) {
        this.AttachStdin = AttachStdin;
        this.AttachStdout = AttachStdout;
        this.AttachStderr = AttachStderr;
        this.Tty = Tty;
        this.Cmd = Cmd;
    }
}
