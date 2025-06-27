"use client"
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import heroImg from '@/images/fondogym.jpg'

export default function Hero() {
  return (
    <section className="relative w-full h-screen">
      <Image src={heroImg} alt="Fondo Gym" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/50" />

      <motion.div
        initial={{ opacity:0,y:20 }}
        animate={{ opacity:1,y:0 }}
        transition={{ duration:0.8 }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
      >
        <motion.h1
          initial={{ scale:0.8 }}
          animate={{ scale:1 }}
          transition={{ delay:0.4, type:'spring', stiffness:100 }}
          className="mt-6 text-5xl sm:text-6xl md:text-7xl font-extrabold text-white"
        >
          YOUNGNINE
        </motion.h1>
        <motion.p
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ delay:0.8 }}
          className="mt-4 text-lg sm:text-xl text-white/90 max-w-lg"
        >
          Train Hard, Dress Harder
        </motion.p>
        <Link
          href="/products"
          className="mt-8 inline-block bg-white text-black font-semibold px-8 py-3 rounded-full hover:scale-105 transition"
        >
          Ver Productos
        </Link>
      </motion.div>
    </section>
  )
}