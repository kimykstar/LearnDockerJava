import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '../');

    const apiHost = env.VITE_PROXY_HOST || 'localhost';
    const apiPort = env.VITE_PROXY_PORT || '3000';
    const apiUrl = `http://${apiHost}:${apiPort}`;

    return {
        plugins: [react()],
        server: {
            proxy: {
                '/api': {
                    target: apiUrl,
                    changeOrigin: true,
                },
            },
        },
    };
});
