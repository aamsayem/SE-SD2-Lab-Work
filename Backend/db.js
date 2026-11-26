import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Copy .env.example to .env and add your Supabase PostgreSQL connection string."
  );
}

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export const checkDBConnection = async () => {
  const client = await pool.connect();
  try {
    await client.query("SELECT 1");
    console.log("✅ Database connected successfully!");
  } finally {
    client.release();
  }
};
export default pool;
