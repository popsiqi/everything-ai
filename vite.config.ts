import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  test: {
    environment: 'jsdom'
  },
  build: {
    emptyOutDir: false,
    lib: {
      entry: {
        'everything-ai': resolve(__dirname, 'src/index.ts'),
        'react': resolve(__dirname, 'src/frameworks/react.tsx'),
        'vue': resolve(__dirname, 'src/frameworks/vue.ts')
      },
      name: 'EverythingAI',
      formats: ['es', 'cjs'],
      fileName: (format, name) => {
        if (format === 'es') {
          return `${name}.es.js`
        }
        return `${name}.js`
      }
    },
    rollupOptions: {
      external: ['react', 'vue'],
      output: {
        globals: {
          react: 'React',
          vue: 'Vue'
        }
      }
    }
  }
})