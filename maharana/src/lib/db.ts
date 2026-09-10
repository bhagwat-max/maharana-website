import { Pool } from "pg";

const globalForPostgres = globalThis as typeof globalThis & {
  maharanaPool?: Pool;
};

export function getDatabase() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (!globalForPostgres.maharanaPool) {
    globalForPostgres.maharanaPool = new Pool({
      connectionString,
    });
  }

  return globalForPostgres.maharanaPool;
}