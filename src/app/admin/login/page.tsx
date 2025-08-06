"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import logoBlack from "@/images/logoy9negro.png";

export default function AdminLogin() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params?.get("from") ?? "/admin/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Email o contraseña incorrectos.");
    } else {
      router.push(redirectTo);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-center mb-8">
          <img
            src={logoBlack.src}
            alt="Y9 Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </div>

        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
          Welcome to Y9 Administration
        </h2>

        {error && (
          <p className="mb-4 text-center text-red-600 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold bg-black text-white hover:opacity-90 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}