import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  const backendHost = env.BACKEND_HOST || '127.0.0.1';
  const backendPort = env.BACKEND_PORT || '8006';
  const frontendPort = Number(env.PUBLIC_PORT || env.VITE_PORT || '3000');
  const frontendHost = env.VITE_HOST || '0.0.0.0';
  const apiProxy = {
    '/api': {
      target: `http://${backendHost}:${backendPort}`,
      changeOrigin: true,
    },
    '/media': {
      target: `http://${backendHost}:${backendPort}`,
      changeOrigin: true,
    },
  };

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: Number(env.VITE_PORT || '3000'),
      host: frontendHost,
      strictPort: false,
      hmr: env.DISABLE_HMR !== 'true',
      watch: env.DISABLE_HMR === 'true' ? null : {},
      proxy: apiProxy,
    },
    preview: {
      port: frontendPort,
      host: frontendHost,
      strictPort: true,
      proxy: apiProxy,
    },
  };
});
