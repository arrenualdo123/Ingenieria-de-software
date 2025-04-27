"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, Package, Heart, CreditCard, LogOut, Settings } from "lucide-react"

export default function MiCuentaPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      router.push("/login?redirect=/mi-cuenta")
    }
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (loading) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
        <p className="mt-4 text-lg">Cargando...</p>
      </div>
    )
  }

  if (!user) {
    return null // Redirigiendo a login
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Mi Cuenta</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Panel de información del usuario */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <User size={40} className="text-gray-500" />
              </div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push("/mi-cuenta/editar")}
              >
                <Settings className="mr-2 h-4 w-4" /> Editar perfil
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-500" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
              </Button>
            </div>
          </div>
        </div>

        {/* Panel principal */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Panel de control</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/mi-cuenta/pedidos">
                <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Package className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Mis Pedidos</h3>
                      <p className="text-sm text-gray-500">Ver historial de compras</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/mi-cuenta/favoritos">
                <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                      <Heart className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Mis Favoritos</h3>
                      <p className="text-sm text-gray-500">Ver vehículos guardados</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/mi-cuenta/metodos-pago">
                <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <CreditCard className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Métodos de Pago</h3>
                      <p className="text-sm text-gray-500">Gestionar formas de pago</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/mi-cuenta/direcciones">
                <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-purple-600"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Mis Direcciones</h3>
                      <p className="text-sm text-gray-500">Gestionar direcciones de envío</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Actividad reciente</h2>
            <div className="border-t pt-4">
              <p className="text-gray-500 text-center py-4">No hay actividad reciente para mostrar.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
