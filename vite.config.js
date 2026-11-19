import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative base ensures assets load properly on any GitHub Pages repository subpath
  // You can also override with VITE_BASE_PATH="/your-repo-name/" if preferred
  base: process.env.VITE_BASE_PATH || './',
});
