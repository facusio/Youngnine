import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-12 py-6 px-6 lg:px-12 flex flex-col sm:flex-row justify-between items-center">
      <p className="text-gray-600">&copy; {new Date().getFullYear()} Youngnine — Todos los derechos reservados</p>
      <div className="flex space-x-4 mt-4 sm:mt-0">
        <a href="https://www.instagram.com/youngnine.uy/" target="_blank" rel="noopener" className="text-gray-600 hover:text-black">
          <FaInstagram size={24} />
        </a>
        <a href="https://wa.me/59892409036" target="_blank" rel="noopener" className="text-gray-600 hover:text-black">
          <FaWhatsapp size={24} />
        </a>
      </div>
    </footer>
  );
}