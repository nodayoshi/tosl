import { fileURLToPath, URL } from "url";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
import mkcert from "vite-plugin-mkcert";
import { visualizer } from "rollup-plugin-visualizer";
import svgLoader from "vite-svg-loader";
import { VitePWA } from "vite-plugin-pwa";

const hash = Math.floor(Math.random() * 90000) + 10000;

const pwaOptions = {
  manifest: {
    name: "Temple of Sound Nagoya",
    short_name: "tosn",
    description: "イギリスのGhost In The Tapesを迎え、名古屋が誇るミュージシャンが名古屋の東別院で繋がる音楽祭「Temple Of Sound Nagoya」",
    icons: [
      {
        src: "app_icons/196.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "app_icons/512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "app_icons/512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    start_url: "index.html",
    background_color: "#173b51",
    theme_color: "#101f28",
    lang: "ja",
  },
  includeAssets: ["/app_iconss/*.svg"],
  devOptions: {
    enabled: true,
  },
};

export default defineConfig(({ mode }) => {
  return {
    base: "./",
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      https: true,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "./src/scss/_variables.scss";
        `,
        },
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          entryFileNames: `[name]` + hash + `.js`,
          chunkFileNames: `[name]` + hash + `.js`,
          assetFileNames: `[name]` + hash + `.[ext]`,
        },
      },
    },
    plugins: [
      vue(),
      mkcert(),
      svgLoader({ defaultImport: "component" }),
      legacy({
        targets: ["defaults", "not IE 11"],
      }),
      VitePWA(pwaOptions),
      mode === "localtest" &&
        visualizer({
          open: true,
          filename: "dist/stats.html",
          gzipSize: true,
          brotliSize: true,
        }),
      splitVendorChunkPlugin(),
    ],
  };
});
