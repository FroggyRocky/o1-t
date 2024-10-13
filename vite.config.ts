import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@ui': path.resolve(__dirname, 'app/ui'),
            '@api': path.resolve(__dirname, 'app/api'),
            '@hooks': path.resolve(__dirname, 'app/hooks'),
            '@appTypes': path.resolve(__dirname, 'app/types'),
            '@db': path.resolve(__dirname, 'db'),
            '@components': path.resolve(__dirname, 'components'),
            '@modules': path.resolve(__dirname, 'modules')
        },
    },
});