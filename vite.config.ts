import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        require: "undefined",
    },
    optimizeDeps: {
        exclude: ["lucide-react"],
        esbuildOptions: {
            loader: {
                ".js": "jsx",
            },
        },
    },
});
