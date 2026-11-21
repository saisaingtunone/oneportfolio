import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const pagesPath = process.env.PAGES_BASE_PATH?.replace(/^\/+|\/+$/g, '')

export default defineConfig({
  base: pagesPath ? `/${pagesPath}/` : '/',
  plugins: [tailwindcss()],
  resolve: { alias: { '@': fileURLToPath(new URL('.', import.meta.url)) } },
})
