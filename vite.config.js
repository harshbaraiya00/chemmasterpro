import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: "es2022",
    rollupOptions: { output: { manualChunks(id) {
      if (!id.includes('node_modules')) return;
      if (id.includes('smiles-drawer') || id.includes('chroma-js')) return 'molecule-engine';
      if (id.includes('lucide-react')) return 'icons';
      if (id.includes('/react') || id.includes('\\react') || id.includes('scheduler')) return 'react-runtime';
    } } },
  },
});
