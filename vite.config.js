import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
  ],
  css: {
    postcss: "./postcss.config.js",
  },
  server: {
    proxy: {
      "/api": {
        target: "https://cloud.appwrite.io/v1",
        changeOrigin: true,
        secure: true,
        headers: {
          Origin: "https://sinusoid-team-brocoders.vercel.app",
        },
      },
    },
    cors: {
      origin: [
        "https://cloud.appwrite.io",
        "https://localhost:5173",
        "https://hivesigner.com",
        "https://sinusoid-team-brocoders.vercel.app",
      ],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: [
        "Content-Type",
        "X-Appwrite-Project",
        "X-Appwrite-Key",
        "Authorization",
      ],
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["hivesigner"],
        },
      },
    },
  },
});
