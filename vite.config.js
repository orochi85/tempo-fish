// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Adicione se você usa React

export default defineConfig({
  plugins: [react()], // Opcional, apenas se você usa React
  build: {
    rollupOptions: {
      external: ['@rollup/rollup-linux-x64-gnu'], // Ignora o módulo nativo
    },
  },
});