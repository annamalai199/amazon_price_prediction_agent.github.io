import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";

// https://vitejs.dev/config/
export default defineConfig({
  // 👇 Important: set base path for GitHub Pages
  base: "/amazon-price-prediction-agent/",  // replace with your repo name

  build: {
    outDir: "build",  // custom output folder
    chunkSizeWarningLimit: 2000,
  },
  plugins: [tsconfigPaths(), react(), tagger()],
  server: {
    port: "4028",
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: [".amazonaws.com", ".builtwithrocket.new"],
  },
});
