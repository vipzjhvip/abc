import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.', // 确保根目录正确
  base: './', // 关键：部署时必须用相对路径
})
