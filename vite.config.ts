// import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

export default defineConfig({
    plugins: [
        tailwindcss(),
        tsconfigPaths(),
        tanstackRouter({
            target: 'react',
            autoCodeSplitting: true,
            generatedRouteTree: './src/route-tree.gen.ts',
        }),
    ],
});
