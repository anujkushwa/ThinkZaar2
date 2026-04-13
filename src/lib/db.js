import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// helper query function
export async function query(text, params) {
  const res = await pool.query(text, params);
  return res;
}