import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.development.local" });

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env.POSTGRES_URL ||
      "postgres://default:Yhvu6Hb7zDJg@ep-delicate-darkness-a40yv1rd-pooler.us-east-1.aws.neon.tech/verceldb?sslmode=require",
  },
});
