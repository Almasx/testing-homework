import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    clearMocks: true,
    setupFiles: ["dotenv/config", "./test/unit/setup.ts"], //this line,
    environment: "jsdom",
    include: ["./test/unit/*.test.tsx"],
  },
});
