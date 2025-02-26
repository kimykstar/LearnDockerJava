package com.LearnDocker.LearnDocker;

import com.LearnDocker.LearnDocker.Configuration.SessionConfig;
import org.springframework.session.web.context.AbstractHttpSessionApplicationInitializer;

public class Initializer extends AbstractHttpSessionApplicationInitializer {
    public Initializer() {
        super(SessionConfig.class);
    }
}
