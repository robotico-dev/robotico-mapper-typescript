import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    globals: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      include: ["src/**/*.ts"],
      exclude: [
        "src/**/*.test.ts",
        "**/index.ts",
        "**/i-mapper.ts",
        "**/i-mapper-async.ts",
        "**/mapper-async-concurrency-options.ts",
      ],
      thresholds: { branches: 95, functions: 95, lines: 95, statements: 95 },
    },
  },
});
