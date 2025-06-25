"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logoWhite from "@/images/logoy9blanco.png";
import logoBlack from "@/images/logoy9negro.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Si no estamos en home o ya bajamos, fondo blanco y texto oscuro
  const solid = !isHome || scrolled;

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full h-20 z-20 flex items-center justify-between px-6 transition-all duration-300
        ${solid ? "bg-white text-brand shadow-lg" : "bg-transparent text-white"}
      `}
    >
      <Link href="/" className="mt-7">
        <Image src={solid ? logoBlack : logoWhite} alt="Y9 Logo" width={80} height={80} />
      </Link>

      <div className="flex items-center space-x-8 mt-7">
        <Link
          href="/"
          className={`${solid ? "text-brand" : "text-white"} font-extrabold text-lg hover:text-accent`}
        >
          Inicio
        </Link>
        <Link
          href="/products?gender=Hombre"
          className={`${solid ? "text-brand" : "text-white"} font-extrabold text-lg hover:text-accent`}
        >
          Hombre
        </Link>
        <Link
          href="/products?gender=Mujer"
          className={`${solid ? "text-brand" : "text-white"} font-extrabold text-lg hover:text-accent`}
        >
          Mujer
        </Link>
      </div>
    </nav>
  );
}