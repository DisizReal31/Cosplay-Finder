import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuration pour que Vercel puisse construire l'app
export default defineConfig({
  plugins: [react()],
  define: {
    // Permet d'utiliser process.env.API_KEY dans le code client
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});