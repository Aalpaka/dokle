import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

// .env za testove koji trebaju bazu (preskaču se ako DATABASE_URL nije postavljen)
try {
  process.loadEnvFile();
} catch {}

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "server-only": fileURLToPath(new URL("./test/empty.ts", import.meta.url)),
    },
  },
  test: { include: ["src/**/*.test.ts"], fileParallelism: false },
});
