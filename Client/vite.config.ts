import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    basicSsl({
      name: "test",
      domains: ["localhost"],
      certDir: "../cert",
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
