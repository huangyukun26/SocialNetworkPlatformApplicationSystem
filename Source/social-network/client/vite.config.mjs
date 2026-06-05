import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';

const jsAsJsx = () => ({
  name: 'load-js-files-as-jsx',
  async transform(code, id) {
    if (!id.match(/src\/.*\.js$/)) {
      return null;
    }

    return transformWithEsbuild(code, id, {
      loader: 'jsx',
      jsx: 'automatic'
    });
  }
});

export default defineConfig({
  plugins: [jsAsJsx(), react()],
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  },
  server: {
    port: 5173
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js'
  }
});
