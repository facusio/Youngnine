import React from "react";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";

export const metadata = {
  title: "Nuestros productos – Youngnine",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}