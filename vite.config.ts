import { defineConfig, type Plugin } from 'vite'
import fs from 'fs'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Resolves the Figma Make `figma:` virtual-module scheme that the
// auto-generated `__figma__entrypoint__.ts` relies on. Without this, Vite
// fails with "Failed to resolve import figma:foundry-client-api", which the
// browser surfaces as "Importing a module script failed".
function figmaScheme(): Plugin {
  const PREFIX = '\0figma:'
  return {
    name: 'figma-scheme',
    enforce: 'pre',
    resolveId(id) {
      if (id === 'figma:foundry-client-api') return PREFIX + 'foundry-client-api'
      if (id.startsWith('figma:asset/')) {
        const file = id.slice('figma:asset/'.length)
        const abs = path.resolve(__dirname, 'src/imports', file)
        if (fs.existsSync(abs)) return abs
        return PREFIX + 'asset' // missing asset -> harmless stub
      }
      return null
    },
    load(id) {
      if (id === PREFIX + 'foundry-client-api') return 'export {}'
      if (id === PREFIX + 'asset') return 'export default ""'
      return null
    },
  }
}

export default defineConfig({
  plugins: [
    // Must run before the React/import-analysis plugins so the `figma:`
    // scheme is resolved.
    figmaScheme(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
