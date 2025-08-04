"use client";
import heroImg from "@/images/fondogym.jpg";

export default function Hero() {
  return (
    <section className="fixed inset-0 w-full h-screen overflow-hidden">
      <img
        src={heroImg.src}
        alt="Fondo gimnasio"
        className="object-cover w-full h-full"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-5xl font-extrabold">YOUNGNINE</h1>
        <p className="text-white mt-4 text-lg">Train Hard, Dress Harder</p>
        <button
          onClick={() => window.location.href = "/products"}
          className="mt-8 bg-white text-black px-6 py-2 rounded-full font-semibold"
        >
          Ver Productos
        </button>
      </div>
    </section>
  );
}