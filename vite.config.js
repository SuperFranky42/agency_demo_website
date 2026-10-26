import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function shareImageUrl() {
  return {
    name: 'share-image-url',
    transformIndexHtml(html) {
      const site = (process.env.URL || process.env.DEPLOY_PRIME_URL || process.env.DEPLOY_URL || '').replace(/\/$/, '')
      const image = site ? `${site}/og.png` : '/og.png'
      return html.replaceAll('%OG_IMAGE_URL%', image)
    },
  }
}

export default defineConfig({
  plugins: [shareImageUrl(), react(), tailwindcss()],
})
