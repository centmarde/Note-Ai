import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "./src",
  build: {
    outDir: "../dist",
    minify: false,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "./src/index.html",
        register: "./src/register.html",
        note: "./src/note.html",
        profile: "./src/profile.html",
      },
    },
  },
});
