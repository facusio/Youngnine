import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ admin: true }, process.env.JWT_SECRET!, {
      expiresIn: '4h',
    });
    res.setHeader(
      'Set-Cookie',
      `admin-token=${token}; HttpOnly; Path=/; Max-Age=14400`
    );
    return res.status(200).json({ ok: true });
  } else {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
}