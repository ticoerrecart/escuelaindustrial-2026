import Database from 'better-sqlite3';

const db = new Database('pets.db');

db.exec(`
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    stock INTEGER NOT NULL
)
`);

const count = db.prepare('SELECT COUNT(*) as total FROM products').get();

if (count.total === 0) {
	const insert = db.prepare(`
        INSERT INTO products (name, price, stock)
        VALUES (?, ?, ?)
    `);

	insert.run('Alimento para perro', 15000, 10);
	insert.run('Juguete para gato', 8000, 5);
	insert.run('Correa', 12000, 7);
}

export default db;
