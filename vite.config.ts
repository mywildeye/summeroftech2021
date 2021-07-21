import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        host: '0.0.0.0',
        // comment out hmr if developing on local computer
        hmr: {
            port: 443,
        },
        cors: true,
        "proxy": {
            "/api": {
                target: 'https://app.outpostcentral.com',
                rewrite: path => {
                   return path.replace(/^\/api/, '/OutpostAPICore')
                },
                headers: {
                    "Cache-Control": "no-cache",
                    "Authorization": "Basic c3VtbWVyb2Z0ZWNoYXBpOjlIajJLU3EzUDFTeg==",
                    "Connection": "keep-alive",
                    "Content-Type": "application/json",
                },
                changeOrigin: true,
                autoRewrite: true,
            }
        }

    }
})
