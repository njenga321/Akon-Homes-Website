import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const isReplit = process.env.REPL_ID !== undefined;
const isDev = process.env.NODE_ENV !== "production";

// ✅ OPTIONAL values (NO HARD FAIL)
const port = Number(process.env.PORT) || 5173;
const basePath = process.env.BASE_PATH || "/";

// Lazy-loaded Replit plugins only in Replit dev
const replitPlugins =
  isDev && isReplit
    ? await Promise.all([
        import("@replit/vite-plugin-cartographer").then((m) =>
          m.cartographer({
            root: path.resolve(import.meta.dirname, ".."),
          }),
        ),
        import("@replit/vite-plugin-dev-banner").then((m) => m.devBanner()),
      ])
    : [];

export default defineConfig({
  base: basePath,

  plugins: [react(), tailwindcss(), runtimeErrorOverlay(), ...replitPlugins],

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(
        import.meta.dirname,
        "..",
        "..",
        "attached_assets",
      ),
    },
    dedupe: ["react", "react-dom"],
  },

  root: path.resolve(import.meta.dirname),

  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },

  // ✅ DEV ONLY (Replit / local)
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },

  // optional preview (safe fallback)
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
