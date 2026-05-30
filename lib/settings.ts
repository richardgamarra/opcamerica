import pool from "./db";

export async function getSectionSettings(section: string): Promise<{ canView: boolean; canPost: boolean }> {
  const result = await pool.query(
    "SELECT key, value FROM site_settings WHERE key = $1 OR key = $2",
    [`${section}_view`, `${section}_post`]
  );
  const map = Object.fromEntries(result.rows.map((r) => [r.key, r.value]));
  return {
    canView: map[`${section}_view`] !== "false",
    canPost: map[`${section}_post`] !== "false",
  };
}
