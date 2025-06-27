// src/components/Navbar.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logoWhite from "@/images/logoy9blanco.png";
import logoBlack from "@/images/logoy9negro.png";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const headerBg = isHome
    ? "bg-transparent"
    : "bg-white/80 backdrop-blur-sm shadow-md";

  return (
    <header
      className={`${headerBg} fixed inset-x-0 top-0 z-50 h-16 transition-colors duration-200`}
    >
      <div className="max-w-screen-xl mx-auto h-full flex items-center justify-between px-4">
        <Link href="/" className="flex-shrink-0 mt-5">
          <Image
            src={isHome ? logoWhite : logoBlack}
            alt="Y9 Logo"
            width={80}
            height={80}
          />
        </Link>

        <nav className="hidden md:flex space-x-8">
          {[
            { label: "Inicio", href: "/" },
            { label: "Hombre", href: "/products?gender=Hombre" },
            { label: "Mujer", href: "/products?gender=Mujer" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`font-bold text-lg ${
                isHome ? "text-white" : "text-brand"
              } hover:text-accent`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <MobileMenu isHome={isHome} />
      </div>
    </header>
  );
}