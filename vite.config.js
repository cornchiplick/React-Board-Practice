import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      host: true,
      port: 6677,
      proxy: {
        '/mock': {
          target: env.VITE_SERVER_MOCK,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/mock/, ''),
          secure: false,
        },
      },
    },
  };
});
