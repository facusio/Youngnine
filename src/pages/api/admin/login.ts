import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "POST") return res.status(405).end();

    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ role: "admin" }, SECRET, { expiresIn: "8h" });
        res.setHeader(
            "Set-Cookie",
            serialize("admintoken", token, {
                httpOnly: true,
                path: "/",
                maxAge: 60 * 60 * 8,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
            })
        );
        return res.status(200).json({ ok: true });
    }
    return res.status(401).json({ error: "Email o contraseña incorrectos" });
}