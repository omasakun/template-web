import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import linaria from '@linaria/rollup'
import tsconfigPaths from 'vite-tsconfig-paths'
import { InlineConfig } from 'vitest'

// https://vitest.dev/config/
const test: InlineConfig = {
  globals: true, // otherwise, `@testing-library/jest-dom` won't work
  environment: 'jsdom',
  setupFiles: 'test/setup.ts',
  includeSource: ['src/**/*.ts'],
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    linaria({
      sourceMap: process.env.NODE_ENV !== 'production',
    }),
    tsconfigPaths(),
  ],
  define: {
    'import.meta.vitest': 'undefined', // https://vitest.dev/guide/in-source.html#production-build
  },
  server: {
    port: 8137,
  },
  test,
})
