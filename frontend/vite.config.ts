import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Base path configuration based on environment
  const baseConfig = mode === "production" ? "/talan-cup/" : "/";

  return {
    plugins: [react(), tsconfigPaths()],
    base: baseConfig,
  };
});
