"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ShoppingCart, User, Bell, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useAuth } from "@/context/AuthContext"
import CartModal from "./cart-modal"
import NotificationsModal from "./notifications-modal"
import { useCart } from "@/hooks/use-cart"
import { useNotifications } from "@/context/NotificationsContext"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { user, signOut } = useAuth()
  const { itemCount = 0 } = useCart()
  const { notifications = [], markAsRead, markAllAsRead, clearAll } = useNotifications()

  // Detectar scroll para cambiar el estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Cerrar el menú móvil cuando cambia la ruta
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleLogout = async () => {
    await signOut()
    setIsLoginOpen(false)
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled ? "bg-white shadow-sm dark:bg-gray-900 dark:shadow-gray-800/20" : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-red-500">TAS</span>
            <span className="text-2xl font-bold ml-1 text-gray-900 dark:text-white">Drives</span>
          </Link>

          {/* Navegación de escritorio */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-red-500 ${
                pathname === "/" ? "text-red-500" : "text-gray-700 dark:text-gray-200"
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/tienda"
              className={`text-sm font-medium transition-colors hover:text-red-500 ${
                pathname === "/tienda" || pathname.startsWith("/tienda/")
                  ? "text-red-500"
                  : "text-gray-700 dark:text-gray-200"
              }`}
            >
              Vehículos
            </Link>
            <Link
              href="/servicios"
              className={`text-sm font-medium transition-colors hover:text-red-500 ${
                pathname === "/servicios" ? "text-red-500" : "text-gray-700 dark:text-gray-200"
              }`}
            >
              Servicios
            </Link>
            <Link
              href="/contacto"
              className={`text-sm font-medium transition-colors hover:text-red-500 ${
                pathname === "/contacto" ? "text-red-500" : "text-gray-700 dark:text-gray-200"
              }`}
            >
              Contacto
            </Link>
            <Link
              href="/sobre"
              className={`text-sm font-medium transition-colors hover:text-red-500 ${
                pathname === "/sobre" ? "text-red-500" : "text-gray-700 dark:text-gray-200"
              }`}
            >
              Sobre Nosotros
            </Link>
          </nav>

          {/* Botones de acción */}
          <div className="flex items-center space-x-4">
            {/* Botón de tema */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              aria-label="Cambiar tema"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Botón de carrito */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative text-gray-700 dark:text-gray-300"
              aria-label="Carrito de compras"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Botón de notificaciones */}
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              aria-label="Notificaciones"
            >
              <Bell size={20} />
            </button>

            {/* Botón de usuario/login */}
            {user ? (
              <Link href="/mi-cuenta">
                <div className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <User size={20} />
                </div>
              </Link>
            ) : (
              <Link href="/login">
                <Button
                  size="sm"
                  variant="outline"
                  className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Iniciar sesión
                </Button>
              </Link>
            )}

            {/* Botón de menú móvil */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md md:hidden hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              aria-label="Menú"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden border-t dark:border-gray-800">
          <div className="container mx-auto px-4 py-3 space-y-1">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/"
                  ? "bg-gray-100 text-red-500 dark:bg-gray-800"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/tienda"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/tienda" || pathname.startsWith("/tienda/")
                  ? "bg-gray-100 text-red-500 dark:bg-gray-800"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              Vehículos
            </Link>
            <Link
              href="/servicios"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/servicios"
                  ? "bg-gray-100 text-red-500 dark:bg-gray-800"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              Servicios
            </Link>
            <Link
              href="/contacto"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/contacto"
                  ? "bg-gray-100 text-red-500 dark:bg-gray-800"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              Contacto
            </Link>
            <Link
              href="/sobre"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/sobre"
                  ? "bg-gray-100 text-red-500 dark:bg-gray-800"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              Sobre Nosotros
            </Link>
            {user && (
              <Link
                href="/mi-cuenta"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === "/mi-cuenta"
                    ? "bg-gray-100 text-red-500 dark:bg-gray-800"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                Mi cuenta
              </Link>
            )}
            {user && (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Cerrar sesión
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modales */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
        onClearAll={clearAll}
      />
    </header>
  )
}
