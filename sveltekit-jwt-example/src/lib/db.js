import { createClient } from "@libsql/client/sqlite3";
import bcrypt from "bcrypt";

const dbUrl = new URL("../../usuarios.db", import.meta.url).toString();
const db = createClient({ url: dbUrl });

await db.executeMultiple(`
CREATE TABLE IF NOT EXISTS users(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 email TEXT UNIQUE NOT NULL,
 password TEXT NOT NULL,
 role TEXT NOT NULL DEFAULT 'user'
);
`);

const user = await db.execute("SELECT id FROM users WHERE email=?", [
  "admin@test.com",
]);

if (!user.rows[0]) {
  const hash = await bcrypt.hash("123456", 10);
  await db.execute("INSERT INTO users(email,password,role) VALUES(?,?,?)", [
    "admin@test.com",
    hash,
    "admin",
  ]);
}

export default db;
