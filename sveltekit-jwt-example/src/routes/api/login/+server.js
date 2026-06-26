import { json } from "@sveltejs/kit";
import bcrypt from "bcrypt"; // or 'bcryptjs'

import { createToken } from "$lib/auth";
import db from "$lib/db";

export async function POST({ request, cookies }) {
  const { email, password } = await request.json();
  const result = await db.execute("SELECT * FROM users WHERE email=?", [email]);
  const user = result.rows[0];

  if (!user) {
    return json({ error: "Invalid credentials" }, { status: 401 });
  }

  const validLogin = await bcrypt.compare(password, user.password);
  if (!validLogin) {
    return json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = createToken(user);

  cookies.set("token", token, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 3600,
  });

  return json({
    token,
    user: { id: user.id, email: user.email, role: user.role },
  });
}
