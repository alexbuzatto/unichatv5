/// <reference types="vitest" />

import { defineConfig } from 'vite';
import ruby from 'vite-plugin-ruby';
import path from 'path';
import vue from '@vitejs/plugin-vue';

const isLibraryMode = process.env.BUILD_MODE === 'library';
const isTestMode = process.env.TEST === 'true';
const disableRuby = process.env.DISABLE_RUBY_PLUGIN === 'true';

const vueOptions = {
  template: {
    compilerOptions: {
      isCustomElement: tag => ['ninja-keys'].includes(tag),
    },
  },
};


let plugins = [vue(vueOptions)];

if (isLibraryMode) {
  plugins = [];
} else if (isTestMode) {
  plugins = [vue(vueOptions)];
} else if (!disableRuby) {
  plugins.unshift(ruby());
}


export default defineConfig({
  plugins: plugins,
  build: {
    rollupOptions: {
      ...(disableRuby && !isLibraryMode
        ? {
            input: {
              dashboard: path.resolve(__dirname, './app/javascript/entrypoints/dashboard.js'),
              portal: path.resolve(__dirname, './app/javascript/entrypoints/portal.js'),
              superadmin: path.resolve(__dirname, './app/javascript/entrypoints/superadmin.js'),
              superadmin_pages: path.resolve(__dirname, './app/javascript/entrypoints/superadmin_pages.js'),
              survey: path.resolve(__dirname, './app/javascript/entrypoints/survey.js'),
              v3app: path.resolve(__dirname, './app/javascript/entrypoints/v3app.js'),
              widget: path.resolve(__dirname, './app/javascript/entrypoints/widget.js'),
            },
          }
        : {}),
      output: {
        ...(isLibraryMode
          ? {
              dir: 'public/packs',
              entryFileNames: chunkInfo => {
                if (chunkInfo.name === 'sdk') {
                  return 'js/sdk.js';
                }
                return '[name].js';
              },
            }
          : {}),
        inlineDynamicImports: isLibraryMode,
      },
    },
    ...(disableRuby && !isLibraryMode
      ? {
          manifest: true,
          outDir: 'public/packs',
        }
      : {}),
    lib: isLibraryMode
      ? {
          entry: path.resolve(__dirname, './app/javascript/entrypoints/sdk.js'),
          formats: ['iife'],
          name: 'sdk',
        }
      : undefined,
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      components: path.resolve('./app/javascript/dashboard/components'),
      next: path.resolve('./app/javascript/dashboard/components-next'),
      v3: path.resolve('./app/javascript/v3'),
      dashboard: path.resolve('./app/javascript/dashboard'),
      helpers: path.resolve('./app/javascript/shared/helpers'),
      shared: path.resolve('./app/javascript/shared'),
      survey: path.resolve('./app/javascript/survey'),
      widget: path.resolve('./app/javascript/widget'),
      assets: path.resolve('./app/javascript/dashboard/assets'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [path.resolve(__dirname, './app/javascript')],
      },
    },
  },
  test: {
    environment: 'jsdom',
    include: ['app/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    coverage: {
      reporter: ['lcov', 'text'],
      include: ['app/**/*.js', 'app/**/*.vue'],
      exclude: [
        'app/**/*.@(spec|stories|routes).js',
        '**/specs/**/*',
        '**/i18n/**/*',
      ],
    },
    globals: true,
    outputFile: 'coverage/sonar-report.xml',
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
      },
    },
    server: {
      deps: {
        inline: ['tinykeys', '@material/mwc-icon'],
      },
    },
    setupFiles: ['fake-indexeddb/auto', 'vitest.setup.js'],
    mockReset: true,
    clearMocks: true,
  },
});
