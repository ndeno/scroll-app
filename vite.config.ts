import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const s3Path = '/scroll'; 
const base = import.meta.env?.CDN ? `${import.meta.env?.CDN}${s3Path}` : "/"; 

export default defineConfig({
  base,
  plugins: [react()],
})
