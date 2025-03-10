package com.LearnDocker.LearnDocker;

import java.util.regex.Pattern;

public class CommandValidator {
    private static final Pattern VALID_REGEX = Pattern.compile("^docker\s(?:(?!.*\b(?:sh|bash|exec|tag|commit)\b|.*[;&|<>$`]))");
    private static final Pattern VOLUME_MOUNT_CHECK_REGEX =
                Pattern.compile("^docker\s+(?:(?:container\s+)?(?:create|run))\s+.*(?:-v\b|--volume\b)");
    private static final Pattern PUSH_CHECK_REGEX = Pattern.compile("^docker\s+(?:(?:image\s+)?(?:push))");
    private static final Pattern DOCKER_RUN_CHECK_REGEX = Pattern.compile("^docker\s+(?:(?:container\s+)?(?:run))");
    private static final Pattern DETACH_OPTION_REGEX = Pattern.compile("(?:-d\b|--detach\b)");
    private static final Pattern JOKE_IMAGE_NAME = Pattern.compile("learndocker.io/joke");

    public static String getValidCommand(String command) throws Exception {
        command = command.trim();

        boolean baseValidation = VALID_REGEX.matcher(command).find();
        boolean volumeMountValidation = VOLUME_MOUNT_CHECK_REGEX.matcher(command).matches();
        boolean pushValidation = PUSH_CHECK_REGEX.matcher(command).find();
        boolean isValid = baseValidation && !volumeMountValidation && !pushValidation;
        if (!isValid) {
            throw new Exception("해당 명령은 사용이 불가능합니다.");
        }

        return command;
    }
}
