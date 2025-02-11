import { useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import {
    handleEnter,
    handleBackspace,
    handleDefaultKey,
    isPrintableKey,
} from '../utils/terminalUtils';
import { ENTER_KEY, BACKSPACE_KEY } from '../constant/xterm';
import { HttpStatusCode } from 'axios';
import { BrowserClipboardProvider, ClipboardSelectionType } from '@xterm/addon-clipboard';

export function useTerminal(
    updateVisualizationData: (command: string) => Promise<void>,
    showAlert: (alertMessage: string) => void
) {
    const currentLineRef = useRef<string>('');
    const blockingRef = useRef<boolean>(false);
    const tooManyRequestRef = useRef<boolean>(false);

    const handleCommandError = (term: Terminal, statusCode: number, errorMessage: string) => {
        if (!term) return;
        if (statusCode === HttpStatusCode.TooManyRequests) {
            showAlert('잠시후 다시 시도해주세요');

            tooManyRequestRef.current = true;
            setTimeout(() => {
                tooManyRequestRef.current = false;
            }, 1000);

            return;
        }

        const message = errorMessage || '허용되지 않은 명령어 입니다.';
        term.write(`\x1b[91m${message}\x1b[0m\r\n`);
    };

    const handleKeyInput = async (
        term: Terminal,
        event: { key: string; domEvent: KeyboardEvent },
        clipboardProvider: BrowserClipboardProvider
    ) => {
        if (blockingRef.current || tooManyRequestRef.current) return;

        if ((event.domEvent.metaKey || event.domEvent.ctrlKey) && event.domEvent.key === 'c') {
            const selection = term.getSelection();
            if (selection) {
                await clipboardProvider.writeText('c' as ClipboardSelectionType, selection);
            }
            return;
        }

        if ((event.domEvent.metaKey || event.domEvent.ctrlKey) && event.domEvent.key === 'v') {
            try {
                const text = await clipboardProvider.readText('c' as ClipboardSelectionType);
                term.write(text);
                currentLineRef.current += text;
            } catch (err) {
                console.error('Failed to paste:', err);
            }
            return;
        }

        switch (event.key) {
            case ENTER_KEY: {
                blockingRef.current = true;
                await handleEnter(
                    term,
                    currentLineRef.current.trim(),
                    handleCommandError,
                    updateVisualizationData
                );
                currentLineRef.current = '';
                blockingRef.current = false;
                break;
            }

            case BACKSPACE_KEY: {
                currentLineRef.current = handleBackspace(term, currentLineRef.current);
                break;
            }

            default: {
                if (!isPrintableKey(event.key)) return;
                currentLineRef.current = handleDefaultKey(term, event.key, currentLineRef.current);
                break;
            }
        }
    };

    return { handleKeyInput };
}
