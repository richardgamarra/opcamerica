import { Pool } from "pg";

const pool = new Pool({
  host: "127.0.0.1",
  port: 5432,
  database: "opcamerica",
  user: "opcamerica",
  password: "OPCAmerica2026DB!",
  max: 10,
  idleTimeoutMillis: 30000,
});

export default pool;
