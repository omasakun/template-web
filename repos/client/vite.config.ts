import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import linaria from 'vite-plugin-linaria'
import tsconfigPaths from 'vite-tsconfig-paths'
import { InlineConfig } from 'vitest'

// https://vitest.dev/config/
const test: InlineConfig = {
  globals: true, // otherwise, `@testing-library/jest-dom` won't work
  environment: 'jsdom',
  setupFiles: 'test/setup.ts',
  includeSource: ['src/**/*.{js,ts}'],
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), linaria(), tsconfigPaths()],
  define: {
    'import.meta.vitest': 'undefined', // https://vitest.dev/guide/in-source.html#production-build
  },
  test,
})
