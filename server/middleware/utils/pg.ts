import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

// Connect to the database using the DATABASE_URL environment
//   variable injected by Railway
const db = new pg.Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT!),
    database: process.env.PG_DB,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

pg.defaults.parseInt8 = true

export default db