"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Package, Clock, CheckCircle, XCircle } from "lucide-react"
import { formatCurrency } from "@/utils/format"

interface OrderItem {
  id: number
  name: string
  quantity: number
  price: number
}

interface Order {
  id: string
  orderNumber: string
  createdAt: string
  status: "pending" | "processing" | "completed" | "cancelled"
  items: OrderItem[]
  total: number
}

export default function PedidosPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Verificar si el usuario está autenticado
        const user = localStorage.getItem("user")
        if (!user) {
          router.push("/login?redirect=/mi-cuenta/pedidos")
          return
        }

        const userData = JSON.parse(user)

        // Obtener pedidos del usuario
        const response = await fetch(`/api/user/orders?email=${encodeURIComponent(userData.email)}`)

        if (!response.ok) {
          throw new Error("Error al obtener los pedidos")
        }

        const data = await response.json()

        if (data.success) {
          setOrders(data.orders)
        } else {
          throw new Error(data.error || "Error al obtener los pedidos")
        }
      } catch (error) {
        console.error("Error:", error)
        setError("No pudimos cargar tus pedidos. Por favor, intenta de nuevo más tarde.")
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [router])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="text-yellow-500" size={20} />
      case "processing":
        return <Package className="text-blue-500" size={20} />
      case "completed":
        return <CheckCircle className="text-green-500" size={20} />
      case "cancelled":
        return <XCircle className="text-red-500" size={20} />
      default:
        return <Clock className="text-gray-500" size={20} />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendiente"
      case "processing":
        return "En proceso"
      case "completed":
        return "Completado"
      case "cancelled":
        return "Cancelado"
      default:
        return "Desconocido"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
        <p className="mt-4 text-lg">Cargando tus pedidos...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex items-center">
        <Link href="/mi-cuenta" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
          <ArrowLeft size={16} className="mr-2" /> Volver a mi cuenta
        </Link>
        <h1 className="text-2xl font-bold">Mis Pedidos</h1>
      </div>

      {error ? (
        <div className="bg-red-50 p-6 rounded-lg border border-red-100 text-center">
          <p className="text-red-800 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Intentar de nuevo</Button>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg border text-center">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No tienes pedidos todavía</h2>
          <p className="text-gray-600 mb-6">Cuando realices una compra, tus pedidos aparecerán aquí.</p>
          <Link href="/tienda">
            <Button>Explorar productos</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex flex-col sm:flex-row justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Pedido #{order.orderNumber}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center mt-2 sm:mt-0">
                    {getStatusIcon(order.status)}
                    <span className="ml-2 font-medium">{getStatusText(order.status)}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-medium mb-4">Productos</h3>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                      </div>
                      <p className="font-medium">{formatCurrency(item.price)}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatCurrency(order.total)}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border-t">
                <Link href={`/mi-cuenta/pedidos/${order.orderNumber}`}>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    Ver detalles del pedido
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
