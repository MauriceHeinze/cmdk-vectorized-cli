import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
  },
  plugins: [
    {
      name: "markdown-as-text",
      transform(code, id) {
        if (!id.endsWith(".md")) {
          return;
        }
        return {
          code: `export default ${JSON.stringify(code)};`,
          map: null,
        };
      },
    },
  ],
});
