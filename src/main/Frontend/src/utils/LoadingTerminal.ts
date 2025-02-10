import { Terminal } from '@xterm/xterm';

export default class LoadingTerminal {
    private term: Terminal;
    private spinnerFrames: string[];
    private hostSpinnerFrames: string[];
    private currentFrame: number;
    private loadingInterval: number;
    private loadingTimeout: number;

    constructor(term: Terminal) {
        this.term = term;
        this.spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
        this.hostSpinnerFrames = [
            '🐳  ∘°◦         ',
            ' 🐳  ∘°◦        ',
            '  🐳  ∘°◦       ',
            '   🐳  ∘°◦      ',
            '    🐳  ∘°◦     ',
            '     🐳  ∘°◦    ',
            '      🐳  ∘°◦   ',
            '       🐳  ∘°◦  ',
            '        🐳  ∘°◦ ',
            '         🐳  ∘°◦',
            '◦         🐳  ∘°',
            '°◦         🐳  ∘',
            '∘°◦         🐳  ',
            ' ∘°◦         🐳 ',
            '  ∘°◦         🐳',
        ];
        this.currentFrame = 0;
        this.loadingInterval = 0;
        this.loadingTimeout = 0;
    }

    public spinnerStart(timeDelay: number = 1500) {
        this.loadingTimeout = setTimeout(() => {
            this.showSpinner();
        }, timeDelay);
    }

    private showSpinner() {
        this.loadingInterval = setInterval(() => {
            this.term.write(`\r${this.spinnerFrames[this.currentFrame]} 실행 중...`);
            this.currentFrame = (this.currentFrame + 1) % this.spinnerFrames.length;
        }, 80);
    }

    public spinnerStop() {
        if (this.loadingTimeout) {
            clearTimeout(this.loadingTimeout);
            this.loadingTimeout = 0;
        }
        clearInterval(this.loadingInterval);
        this.term.write('\r\x1b[2K');
    }

    public hostSpinnerStart(timeDelay: number = 500) {
        this.loadingTimeout = setTimeout(() => {
            this.term.write('\r도커 컨테이너 준비중...\r\n');
            this.showHostSpinner();
        }, timeDelay);
    }

    private showHostSpinner() {
        this.loadingInterval = setInterval(() => {
            this.term.write(`\r${this.hostSpinnerFrames[this.currentFrame]}`);
            this.currentFrame = (this.currentFrame + 1) % this.hostSpinnerFrames.length;
        }, 200);
    }

    public hostSpinnerStop() {
        if (this.loadingTimeout) {
            clearTimeout(this.loadingTimeout);
            this.loadingTimeout = 0;
        }
        clearInterval(this.loadingInterval);
        this.term.clear();
        this.term.write('\r\x1b[2K');
    }
}
