import type { Config } from "drizzle-kit";

export default {
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  driver: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL ?? "sqlite://:memory:",
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
} satisfies Config;
