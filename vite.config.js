import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import laravel from "vite-plugin-laravel";

export default defineConfig({
    plugins: [react(), laravel()],
    server: {
        https: true,
    },
});
