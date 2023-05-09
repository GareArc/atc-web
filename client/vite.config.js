import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({ mode }) => { 
  process.env = {...process.env, ...loadEnv(mode, process.cwd())}  
  /** @type {import('vite').UserConfig} */
  return defineConfig({
  
    plugins: [react()],
    envDir: '..',
    root: '.',
    
    server: {
      host: true,
      port: process.env.VITE_PORT,
    },
  
    build: {
      manifest: true,
    },
  })
}
