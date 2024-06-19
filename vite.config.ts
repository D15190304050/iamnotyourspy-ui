import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({mode}) => {
    // Load environment configurations and set it as proxy target.
    const env: Record<string, string> = loadEnv(mode, "./env");

    return {
        envDir: "./env",
        plugins: [react()],
        server: {
            host: '127.0.0.1',
            port: 3400,
            open: false,
            cors: true,
            proxy:
                {
                    "/api":
                        {
                            target: env.VITE_API_URL,
                            changeOrigin: true,
                            rewrite: (path) => path.replace(/^\/api/, "")
                        }
                }
        }
    }
})
