"use client";
import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

interface MobileMenuProps {
  isHome: boolean;
}

export default function MobileMenu({ isHome }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  const iconClass = isHome ? "text-white" : "text-black";
  const panelBg = isHome ? "bg-white" : "bg-black";
  const linkColor = isHome ? "text-black" : "text-white";

  return (
    <>
      <button
        className={`md:hidden p-2 focus:outline-none ${iconClass}`}
        onClick={() => setOpen(true)}
        aria-label="Abrir menú"
      >
        <FaBars size={24} />
      </button>

      <div
        className={`
          fixed inset-0 z-40 bg-black/50 transition-opacity
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setOpen(false)}
      />

      <aside
        className={`
          fixed top-16 right-0 w-64 z-40 transform h-[calc(100vh-4rem)] transition-transform
          ${open ? "translate-x-0" : "translate-x-full"}
          ${panelBg}
        `}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setOpen(false)}
            className={iconClass}
            aria-label="Cerrar menú"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <nav className="flex flex-col space-y-4 px-6">
          {[
            { label: "Inicio", href: "/" },
            { label: "Hombre", href: "/products?gender=Hombre" },
            { label: "Mujer", href: "/products?gender=Mujer" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`text-lg font-semibold ${linkColor} hover:opacity-80`}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}