import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const s3Path = '/scroll'; 
const base = process.env.NDENO_CDN && s3Path ? 
  `${process.env.NDENO_CDN}${s3Path}` : "/"; 

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base,
    define: {
      __NDENO_CDN__: env.NDENO_CDN,
    },
    plugins: [react()],
  }
});
 