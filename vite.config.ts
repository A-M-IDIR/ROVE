import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "node:path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
  resolve: {
    alias: {
      RESOURCES: path.resolve(__dirname, "./src/RESOURCES"),
      PAGES: path.resolve(__dirname, "./src/PAGES"),
      COMPONENTS: path.resolve(__dirname, "./src/COMPONENTS"),
    },
  },
});
