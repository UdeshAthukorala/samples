import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    // In BFF mode the dev server forwards /api/auth to the BFF, so the app and the BFF share this
    // origin and the BFF's session cookie is first party.
    server: env.VITE_THUNDERID_BFF === 'true'
      ? { proxy: { '/api/auth': { target: env.BFF_URL || 'http://localhost:3001' } } }
      : undefined,
  }
})
