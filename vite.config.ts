import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        cors: true,
        "proxy": {
            "/api": {
                target: 'https://app.outpostcentral.com',
                rewrite: path => {
                   return path.replace(/^\/api/, '/OutpostAPICore')
                },
                headers: {
                    "Cache-Control": "no-cache",
                    "Authorization": "Basic ",
                    "Connection": "keep-alive",
                    "Content-Type": "application/json",
                },
                changeOrigin: true,
                autoRewrite: true,
            }
        }

    }
})
