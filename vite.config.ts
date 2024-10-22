import fs from 'node:fs/promises';
import { join } from 'node:path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import handlebars from 'vite-plugin-handlebars'

const root = 'html-handlebars';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), handlebars({
    root: root,
    async context(pagePath) {
      const data = JSON.parse(await fs.readFile(join(__dirname, root, '/data', pagePath+'.json'), { encoding: 'utf8' }));
      return {
        ...data,
        pagePath,
      } 
    },
  })],
})
