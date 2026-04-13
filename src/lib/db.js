import { Pool } from "pg";

function getSslConfig() {
  // Many cloud Postgres providers require TLS, but local dev often doesn't.
  // If DATABASE_URL contains `sslmode=require`, enable SSL.
  const url = process.env.DATABASE_URL || "";
  if (!url) return undefined;

  const requiresSsl = /sslmode=require/i.test(url);
  if (!requiresSsl) return undefined;

  return { rejectUnauthorized: false };
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: getSslConfig(),
});

// helper query function
export async function query(text, params) {
  const res = await pool.query(text, params);
  return res;
}