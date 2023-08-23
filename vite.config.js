// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/index.ts"),
      name: "ActiveHandoutComponents",
      // the proper extensions will be added
      fileName: "ah-components",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      /*external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },*/
    },
  },
});
