import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { staticSite } from "./scripts/static-site";

export default defineConfig({
  plugins: [react(), staticSite()],
  base: "/",
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  build: {
    outDir: "dist",
    target: "es2022",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (/[/\\]node_modules[/\\](react|react-dom|react-router|scheduler)[/\\]/.test(id)) {
            return "vendor-react";
          }
        },
      },
    },
  },
});
