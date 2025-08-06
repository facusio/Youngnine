import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Set-Cookie", serialize("admin", "", {
    httpOnly: true,
    path: "/admin",
    maxAge: -1,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  }));
  res.status(200).json({ success: true });
}