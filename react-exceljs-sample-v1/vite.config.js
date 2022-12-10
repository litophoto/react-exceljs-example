import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: {
  //   commonjsOptions: {
  //     ignoreTryCatch: id => id !== 'stream',
  //   },
  // },
  resolve: {
    alias: [
      {
        find: 'stream',
        replacement: `stream-browserify`,
      },
    ],
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          // process: true,
          buffer: true
        })
      ]
    }
  }
})
