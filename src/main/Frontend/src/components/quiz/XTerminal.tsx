import { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { useTerminal } from '../../hooks/useTerminal';
import { createTerminal } from '../../utils/terminalUtils';
import '@xterm/xterm/css/xterm.css';
import { HostStatus, HOST_STATUS } from '../../constant/hostStatus';
import LoadingTerminal from '../../utils/LoadingTerminal';
import { BrowserClipboardProvider } from '@xterm/addon-clipboard';

type XTerminalProps = {
    updateVisualizationData: (command: string) => Promise<void>;
    hostStatus: HostStatus;
    showAlert: (alertMessage: string) => void;
};

const XTerminal = ({ updateVisualizationData, hostStatus, showAlert }: XTerminalProps) => {
    const terminalRef = useRef<HTMLDivElement>(null);
    const terminalInstanceRef = useRef<Terminal | null>(null);
    const clipboardProviderRef = useRef<BrowserClipboardProvider | null>(null);
    const { handleKeyInput } = useTerminal(updateVisualizationData, showAlert);
    const loadingRef = useRef<LoadingTerminal | null>(null);

    useEffect(() => {
        if (!terminalRef.current) return;

        const { terminal, clipboardProvider, fitAddon } = createTerminal(terminalRef.current);
        terminalInstanceRef.current = terminal;
        loadingRef.current = new LoadingTerminal(terminal);
        clipboardProviderRef.current = clipboardProvider;

        if (hostStatus === HOST_STATUS.STARTING) {
            loadingRef.current.hostSpinnerStart();
            terminal.options.disableStdin = true; // 입력 비활성화
        } else {
            terminal.write('~$ ');
        }
        fitAddon.fit();

        return () => terminal.dispose();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!terminalInstanceRef.current || !clipboardProviderRef.current) return;

        if (!loadingRef.current) return;

        if (hostStatus === HOST_STATUS.READY) {
            loadingRef.current.hostSpinnerStop();
            terminalInstanceRef.current.write('~$ ');
            terminalInstanceRef.current.options.disableStdin = false; // 입력 활성화
            terminalInstanceRef.current.onKey((event) => {
                if (hostStatus === HOST_STATUS.READY) {
                    handleKeyInput(
                        terminalInstanceRef.current as Terminal,
                        event,
                        clipboardProviderRef.current as BrowserClipboardProvider
                    );
                }
            });
            terminalInstanceRef.current.focus();
        }
    }, [hostStatus]);

    return (
        <div className='border rounded-lg border-black bg-black flex-1 min-w-0'>
            <div ref={terminalRef} className='p-2 custom-terminal h-full' />
        </div>
    );
};

export default XTerminal;
