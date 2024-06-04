import { defineConfig, mergeConfig } from 'vite'
import common from './vite.config'

const prodConfig = defineConfig({})

export default mergeConfig(common, prodConfig)
