import "dotenv/config";

import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma-v7-schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
