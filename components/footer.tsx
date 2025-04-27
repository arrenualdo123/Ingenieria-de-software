import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">TasDrives</h3>
          <p>Empresa de compra y venta de autos. Especialistas en customización tuning.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Enlaces</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:underline">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/tienda" className="hover:underline">
                Tienda
              </Link>
            </li>
            <li>
              <Link href="/sobre" className="hover:underline">
                Sobre nosotros
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:underline">
                Contacto
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Contacto</h3>
          <address className="not-italic">
            <p>Calle Principal 123</p>
            <p>Ciudad, CP 12345</p>
            <p className="mt-2">Email: info@tasdrives.com</p>
            <p>Teléfono: (123) 456-7890</p>
          </address>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-6 text-center">
        <p>© {new Date().getFullYear()} TasDrives. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
