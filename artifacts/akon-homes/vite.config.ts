import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const isReplit = process.env.REPL_ID !== undefined;
const isDev = process.env.NODE_ENV !== "production";

// Safe fallbacks for Vercel
const port = Number(process.env.PORT) || 5173;
const basePath = process.env.BASE_PATH || "/";

// Group ALL Replit-specific plugins here.
// Using a ternary operator prevents the TypeScript 'never[]' error.
const replitPlugins =
  isDev && isReplit
    ? [
        runtimeErrorOverlay(),
        ...(await Promise.all([
          import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          import("@replit/vite-plugin-dev-banner").then((m) => m.devBanner()),
        ])),
      ]
    : [];

export default defineConfig({
  base: basePath,

  // Vercel will only run react and tailwindcss.
  // Replit will run those PLUS the conditional replitPlugins.
  plugins: [react(), tailwindcss(), ...replitPlugins],

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
    // Vercel looks for the "dist" folder by default.
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },

  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },

  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
