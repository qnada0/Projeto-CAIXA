import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Projeto-CAIXA/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
