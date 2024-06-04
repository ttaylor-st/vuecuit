import { defineConfig, mergeConfig } from 'vite'
import common from './vite.config'

const proxyHost = process.env.PROXY
console.log('proxyHost:', proxyHost)

const devConfig = defineConfig({
  mode: 'development',
  build: {
    rollupOptions: {
      output: {
        entryFileNames: '[name].[hash].js'
      }
    },
    sourcemap: true
  },
  server: {
    proxy: proxyHost
      ? {
          '/api': {
            target: proxyHost,
            changeOrigin: true,
            secure: false
          },
          '/images': {
            target: proxyHost,
            changeOrigin: true,
            secure: false
          }
        }
      : undefined
  }
})

export default mergeConfig(common, devConfig)
