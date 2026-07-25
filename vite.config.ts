import { defineConfig } from "vite";
import { fresh } from "@fresh/plugin-vite";

export default defineConfig({
    server: {
        // 1. Disable Hot Module Replacement (HMR)
        hmr: false,
    },
    plugins: [fresh()],
});
