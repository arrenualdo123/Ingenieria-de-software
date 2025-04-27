"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingCart, User, Menu, X, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import LoginModal from "@/components/login-modal"
import CartModal from "@/components/cart-modal"
import NotificationsModal from "@/components/notifications-modal"
import { useCart } from "@/hooks/use-cart"
import { useNotifications } from "@/context/NotificationsContext"

export default function Navbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const { itemCount } = useCart()
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } = useNotifications()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Check if user is logged in from localStorage
    try {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setIsLoggedIn(true)
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error("Error checking user login status:", error)
    }
  }, [])

  const handleLoginClick = () => {
    setIsLoginModalOpen(true)
  }

  const handleCartClick = () => {
    setIsCartModalOpen(true)
  }

  const handleNotificationsClick = () => {
    console.log("Abriendo modal de notificaciones, notificaciones:", notifications)
    console.log("Contador de no leídas:", unreadCount)
    setIsNotificationsModalOpen(true)
  }

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false)
    // Check if login state changed
    try {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setIsLoggedIn(true)
        setUser(JSON.parse(storedUser))
      } else {
        setIsLoggedIn(false)
        setUser(null)
      }
    } catch (error) {
      console.error("Error updating user login status:", error)
    }
  }

  const handleCloseCartModal = () => {
    setIsCartModalOpen(false)
  }

  const handleCloseNotificationsModal = () => {
    setIsNotificationsModalOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // No renderizar nada hasta que el componente esté montado
  if (!isMounted) {
    return null
  }

  return (
    <>
      {/* Dark Info Bar */}
      <div className="w-full bg-gray-800 text-white py-3 text-center">
        TasDrives empresa de compra y venta de autos. Customización tuning.
      </div>

      {/* Navigation */}
      <nav className="w-full py-4 px-6 flex justify-between items-center border-b bg-white sticky top-0 z-30">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold">TasDrives</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-blue-600 transition">
            Inicio
          </Link>
          <Link href="/tienda" className="hover:text-blue-600 transition">
            Tienda
          </Link>
          <Link href="/sobre" className="hover:text-blue-600 transition">
            Sobre Nosotros
          </Link>
          <Link href="/contacto" className="hover:text-blue-600 transition">
            Contacto
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications Button */}
          <Button variant="ghost" size="icon" onClick={handleNotificationsClick} className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
            <span className="sr-only">Notificaciones</span>
          </Button>

          <Button variant="ghost" size="icon" onClick={handleLoginClick} className="relative">
            <User className="h-5 w-5" />
            {isLoggedIn && <span className="absolute -top-1 -right-1 bg-green-500 rounded-full w-3 h-3"></span>}
            <span className="sr-only">{isLoggedIn ? "Mi cuenta" : "Entrar"}</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={handleCartClick} className="relative">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
            <span className="sr-only">Carrito</span>
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white w-full py-4 px-6 border-b absolute z-20">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="hover:text-blue-600 transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
              Inicio
            </Link>
            <Link
              href="/tienda"
              className="hover:text-blue-600 transition py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tienda
            </Link>
            <Link
              href="/sobre"
              className="hover:text-blue-600 transition py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sobre Nosotros
            </Link>
            <Link
              href="/contacto"
              className="hover:text-blue-600 transition py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contacto
            </Link>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />

      {/* Cart Modal */}
      <CartModal isOpen={isCartModalOpen} onClose={handleCloseCartModal} />

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={isNotificationsModalOpen}
        onClose={handleCloseNotificationsModal}
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
        onClearAll={clearAll}
      />
    </>
  )
}
