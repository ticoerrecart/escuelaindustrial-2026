import db from '$lib/db';
import { json } from '@sveltejs/kit';

export async function GET() {
	const products = db.prepare('SELECT * FROM products').all();

	return json(products);
}

export async function POST({ request }) {
	const body = await request.json();

	const { name, price, stock } = body;

	const result = db
		.prepare(
			`
        INSERT INTO products (name, price, stock)
        VALUES (?, ?, ?)
    `
		)
		.run(name, price, stock);

	return json({
		id: result.lastInsertRowid
	});
}
