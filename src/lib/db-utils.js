import { query } from "./db";

// ADD
export async function addRecord(table, data) {
  const keys = Object.keys(data);
  const values = Object.values(data);

  const queryText = `
    INSERT INTO ${table} (${keys.join(",")})
    VALUES (${keys.map((_, i) => `$${i + 1}`).join(",")})
    RETURNING *;
  `;

  const res = await query(queryText, values);
  return res.rows[0];
}

// GET
export async function getRecords(table) {
  const res = await query(`SELECT * FROM ${table} ORDER BY created_at DESC`);
  return res.rows;
}

// DELETE
export async function deleteRecord(table, id) {
  await query(`DELETE FROM ${table} WHERE id = $1`, [id]);
}