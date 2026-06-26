import { createClient } from '@libsql/client/sqlite3';

const dbUrl = new URL('../../pets.db', import.meta.url).toString();
const db = createClient({ url: dbUrl });

await db.executeMultiple(`
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
	stock INTEGER NOT NULL
)
`);
// Add image columns if they don't exist (ALTER TABLE will fail if column exists,
// so ignore errors)
try {
	await db.execute('ALTER TABLE products ADD COLUMN image_mime TEXT');
} catch (e) {}

try {
	await db.execute('ALTER TABLE products ADD COLUMN image_data TEXT');
} catch (e) {}

const countRes = await db.execute('SELECT COUNT(*) as total FROM products');
const total =
	countRes.rows && countRes.rows.length > 0
		? countRes.rows[0].total || Object.values(countRes.rows[0])[0]
		: 0;

if (Number(total) === 0) {
	await db.execute('INSERT INTO products (name, price, stock) VALUES (?, ?, ?)', [
		'Alimento para perro',
		15000,
		10
	]);
	await db.execute('INSERT INTO products (name, price, stock) VALUES (?, ?, ?)', [
		'Juguete para gato',
		8000,
		5
	]);
	await db.execute('INSERT INTO products (name, price, stock) VALUES (?, ?, ?)', [
		'Correa',
		12000,
		7
	]);
}

export default db;
