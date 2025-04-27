"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, ShoppingBag, Heart, Settings, LogOut, Edit, MapPin, Phone, Mail } from "lucide-react"

export default function PerfilPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error parsing user data:", error)
        router.push("/")
      }
    } else {
      // Redirect to home if not logged in
      router.push("/")
    }
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <p>Cargando información de usuario...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <p>Debes iniciar sesión para acceder a esta página</p>
        <Button onClick={() => router.push("/")} className="mt-4">
          Volver al inicio
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Mi Cuenta</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <User size={40} className="text-gray-500" />
              </div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-500 text-sm mb-4">{user.email}</p>
              <Button variant="outline" size="sm" className="flex items-center">
                <Edit size={16} className="mr-2" /> Editar perfil
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <Button
              variant="destructive"
              className="w-full flex items-center justify-center text-white bg-red-600 hover:bg-red-700 border-0 font-bold py-3"
              onClick={handleLogout}
            >
              <LogOut size={16} className="mr-2" /> Cerrar Sesión
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="md:col-span-3">
          <Tabs defaultValue="perfil" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="perfil" className="flex items-center justify-center">
                <User size={16} className="mr-2" /> Perfil
              </TabsTrigger>
              <TabsTrigger value="pedidos" className="flex items-center justify-center">
                <ShoppingBag size={16} className="mr-2" /> Pedidos
              </TabsTrigger>
              <TabsTrigger value="favoritos" className="flex items-center justify-center">
                <Heart size={16} className="mr-2" /> Favoritos
              </TabsTrigger>
              <TabsTrigger value="ajustes" className="flex items-center justify-center">
                <Settings size={16} className="mr-2" /> Ajustes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="perfil" className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Información personal</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                  <input
                    type="text"
                    value={user.name}
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    placeholder="No especificado"
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de nacimiento</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md bg-gray-50" />
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4">Dirección de envío</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Dirección</h4>
                    <p className="text-gray-600">No has añadido ninguna dirección</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Teléfono</h4>
                    <p className="text-gray-600">No especificado</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>
              </div>

              <Button>Actualizar información</Button>
            </TabsContent>

            <TabsContent value="pedidos" className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Mis pedidos</h3>
              <div className="text-center py-8">
                <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 mb-4">No tienes pedidos recientes</p>
                <Button onClick={() => router.push("/tienda")}>Ir a la tienda</Button>
              </div>
            </TabsContent>

            <TabsContent value="favoritos" className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Mis favoritos</h3>
              <div className="text-center py-8">
                <Heart size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 mb-4">No tienes vehículos favoritos</p>
                <Button onClick={() => router.push("/tienda")}>Explorar vehículos</Button>
              </div>
            </TabsContent>

            <TabsContent value="ajustes" className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Ajustes de cuenta</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Cambiar contraseña</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña actual</label>
                      <input type="password" className="w-full p-3 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nueva contraseña</label>
                      <input type="password" className="w-full p-3 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar nueva contraseña</label>
                      <input type="password" className="w-full p-3 border border-gray-300 rounded-md" />
                    </div>
                    <Button>Actualizar contraseña</Button>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h4 className="font-medium mb-2">Preferencias de notificaciones</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="email-notif" className="mr-2" />
                      <label htmlFor="email-notif">Recibir notificaciones por email</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="promo-notif" className="mr-2" />
                      <label htmlFor="promo-notif">Recibir ofertas y promociones</label>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h4 className="font-medium mb-2 text-red-600">Zona de peligro</h4>
                  <p className="text-gray-600 mb-4">Una vez eliminada, no podrás recuperar esta cuenta</p>
                  <Button variant="destructive">Eliminar cuenta</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
