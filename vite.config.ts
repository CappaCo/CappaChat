import { defineConfig } from "vite";
import { fresh } from "@fresh/plugin-vite";

export default defineConfig({
    server: {
        // 1. Disable Hot Module Replacement (HMR)
        hmr: false,

        // 2. Prevent Vite from watching file changes
        watch: {
            ignored: ["**/*"],
        },
    },
    plugins: [fresh()],
});
