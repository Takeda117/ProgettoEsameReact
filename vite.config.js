import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@router': path.resolve(__dirname, 'src/router'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@layout': path.resolve(__dirname, 'src/layout'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@character': path.resolve(__dirname, 'src/components/character'),
      '@admin': path.resolve(__dirname, 'src/components/admin'),
      '@dashboard': path.resolve(__dirname, 'src/components/dashboard'),
      '@auth': path.resolve(__dirname, 'src/components/auth'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@data': path.resolve(__dirname, 'src/data'),
      '@constant': path.resolve(__dirname, 'src/constant'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@compendium': path.resolve(__dirname, 'src/components/compendium'),
      '@ui': path.resolve(__dirname, 'src/ui')
    }
  }
})
