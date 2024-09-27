import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import mdx from '@mdx-js/rollup'
import svgr from 'vite-plugin-svgr'
import { } from 'vite-react-ssg'
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  base: '/ods/',
  // optimizeDeps: {
  //   include: ["@mui/x-date-pickers/AdapterDayjs"],
  // },
  plugins: [
    svgr(),
    mdx(),
    react(),
  ],
  resolve: {
    alias: {
      "@mui/x-date-pickers/AdapterDayjs": path.resolve(
        __dirname,
        'node_modules/@mui/x-date-pickers/AdapterDayjs/AdapterDayjs.js'
      ),
    },
  },
  ssgOptions: {
    mode: 'nested',
    includeAllRoutes: true,
    dirStyle: 'nested'
  }
})
