import { defineConfig } from '@tanstack/start/config'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    vite: {
        //@ts-ignore
        plugins: () => [
            viteTsConfigPaths({
                projects: ['./tsconfig.json'],
            }),
        ],
    },
})