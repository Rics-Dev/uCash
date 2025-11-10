import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

const env =
  process.env.NODE_ENV === "production"
    ? ".env.production.local"
    : ".env.development.local";

dotenv.config({
  path: `../../apps/web/${env}`,
});

export default defineConfig({
	schema: "./src/schema",
	out: "./src/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL || "",
	},
});
