import db from '$lib/db';
import { json } from '@sveltejs/kit';

export async function GET() {
	const res = await db.execute('SELECT * FROM products');
	return json(res.rows);
}

export async function POST({ request }) {
	const contentType = request.headers.get('content-type') || '';

	if (!contentType.includes('multipart/form-data')) {
		return json({ error: 'Content-Type must be multipart/form-data' }, { status: 415 });
	}

	const form = await request.formData();
	const name = form.get('name');
	const price = Number(form.get('price')) || 0;
	const stock = Number(form.get('stock')) || 0;
	const file = form.get('image');
	let mime = null;
	let b64 = null;
	if (file && typeof file.arrayBuffer === 'function') {
		const buf = Buffer.from(await file.arrayBuffer());
		b64 = buf.toString('base64');
		mime = file.type || 'application/octet-stream';
	}

	const res = await db.execute(
		'INSERT INTO products (name, price, stock, image_mime, image_data) VALUES (?, ?, ?, ?, ?)',
		[name, price, stock, mime, b64]
	);

	return json({ id: res.lastInsertRowid });
}

export async function PUT({ request }) {
	const contentType = request.headers.get('content-type') || '';

	if (!contentType.includes('multipart/form-data')) {
		return json({ error: 'Content-Type must be multipart/form-data' }, { status: 415 });
	}

	const form = await request.formData();
	const id = Number(form.get('id'));
	if (!id) return json({ error: 'missing id' }, { status: 400 });
	const file = form.get('image');
	let mime = null;
	let b64 = null;
	if (file && typeof file.arrayBuffer === 'function') {
		const buf = Buffer.from(await file.arrayBuffer());
		b64 = buf.toString('base64');
		mime = file.type || 'application/octet-stream';
	}

	await db.execute('UPDATE products SET image_mime = ?, image_data = ? WHERE id = ?', [
		mime,
		b64,
		id
	]);
	return json({ success: true });
}
