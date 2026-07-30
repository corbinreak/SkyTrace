// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxies http://localhost:5173/opensky-auth -> https://auth.opensky-network.org
      "/opensky-auth": {
        target: "https://auth.opensky-network.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/opensky-auth/, ""),
      },
      // Proxies http://localhost:5173/opensky-api -> https://opensky-network.org
      "/opensky-api": {
        target: "https://opensky-network.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/opensky-api/, ""),
      },
    },
  },
});
