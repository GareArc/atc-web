import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, '..', "VITE_") }
  return defineConfig({

    plugins: [react()],
    envDir: '..',
    root: '.',

    server: {
      host: true,
      port: env.VITE_PORT,
    },

    build: {
      manifest: true,
    },
  })
})
