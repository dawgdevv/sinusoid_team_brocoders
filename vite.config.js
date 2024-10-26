import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Add this line to import the path module

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
