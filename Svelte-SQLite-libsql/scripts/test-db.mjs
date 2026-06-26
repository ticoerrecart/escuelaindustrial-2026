import db from '../src/lib/db.js';

const res = await db.execute('SELECT COUNT(*) as total FROM products');
console.log(
	'COUNT:',
	res.rows && res.rows[0] ? res.rows[0].total || Object.values(res.rows[0])[0] : 0
);

const all = await db.execute('SELECT * FROM products');
console.log('ROWS:', all.rows ? all.rows.length : 0);
