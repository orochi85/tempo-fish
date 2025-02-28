import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import EnvironmentPlugin from 'vite-plugin-environment';

export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin(['VITE_API_KEY', 'VITE_API_URL', 'VITE_WEATHER_API_KEY']), // Adicione suas variáveis de ambiente aqui
  ],
  base: '/nome-do-repositorio/', // Substitua pelo nome do seu repositório
});