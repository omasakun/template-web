import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

// https://vitest.dev/config/
/** @type {import('vitest').InlineConfig} */
const test = {
  globals: true, // otherwise, `@testing-library/jest-dom` won't work
  environment: 'jsdom',
  setupFiles: 'test/setup.ts',
  includeSource: ['src/**/*.ts'],
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter({
      pages: 'dist',
      assets: 'dist',
      // fallback: '200.html', // SPA mode: https://github.com/sveltejs/kit/tree/master/packages/adapter-static#spa-mode
    }),
    trailingSlash: 'always', // see: https://kit.svelte.dev/docs/adapters#supported-environments-static-sites
    vite: {
      server: {
        port: 8137,
      },
      test,
    },
  },

  define: {
    'import.meta.vitest': 'undefined', // https://vitest.dev/guide/in-source.html#production-build
  },
}

export default config
