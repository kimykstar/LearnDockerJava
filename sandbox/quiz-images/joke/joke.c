#include <unistd.h>
#include <signal.h>

static sig_atomic_t running = 1;

void signal_handler(int signum) {
    if (signum == SIGTERM) {
        running = 0;
    }
}

size_t strlen(const char *str) {
    const char *s;
    for (s = str; *s; ++s)
        ;
    return s - str;
}

int main() {
    signal(SIGTERM, signal_handler);

    const char *msg = "넌센스 퀴즈입니다!\n우주인이 술 마시는 장소는?\n";

    write(STDOUT_FILENO, msg, strlen(msg));

    while(running) {
        sleep(2);
    }
    
    
    return 0;
}