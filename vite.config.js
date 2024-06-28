import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});

// ngrok http --domain=koi-pro-shortly.ngrok-free.app 5173