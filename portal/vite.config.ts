import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // shadcn/ui convention: `@/` points at the design system source, so the app
  // imports components as `@/components/ui/*` and consumes them as source.
  resolve: { alias: { '@': fileURLToPath(new URL('../design-system/src', import.meta.url)) } },
  server: { port: 5173 },
  build: {
    rollupOptions: {
      output: {
        // Long-term caching: vendor code changes less often than the app
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (/recharts|d3-|victory-vendor/.test(id)) return 'charts';
          if (/@radix-ui|radix-ui|@floating-ui/.test(id)) return 'radix';
          if (/[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react';
        },
      },
    },
  },
});
