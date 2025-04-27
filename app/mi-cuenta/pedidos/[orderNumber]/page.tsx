"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Package, Clock, CheckCircle, XCircle, Truck, MapPin, User, Mail, Phone } from "lucide-react"
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
  status: string // Cambiamos de un tipo específico a string para evitar problemas de comparación
  items: OrderItem[]
  total: number
  discount?: number
  couponCode?: string
  orderNote?: string
  customerName?: string
  customerEmail?: string
  customerPhone?: string
  shippingAddress?: {
    line1?: string
    line2?: string
    city?: string
    state?: string
    postal_code?: string
    country?: string
  }
}

export default function DetallesPedidoPage() {
  const params = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const orderNumber = params.orderNumber as string

  useEffect(() => {
    const fetchOrderDetails = async () => {
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
          // Encontrar el pedido específico
          const foundOrder = data.orders.find((o: Order) => o.orderNumber === orderNumber)

          if (foundOrder) {
            // Añadir información del usuario al pedido
            foundOrder.customerName = userData.name
            foundOrder.customerEmail = userData.email

            setOrder(foundOrder)
          } else {
            throw new Error("Pedido no encontrado")
          }
        } else {
          throw new Error(data.error || "Error al obtener los pedidos")
        }
      } catch (error) {
        console.error("Error:", error)
        setError("No pudimos cargar los detalles del pedido. Por favor, intenta de nuevo más tarde.")
      } finally {
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [orderNumber, router])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="text-yellow-500" size={24} />
      case "processing":
        return <Package className="text-blue-500" size={24} />
      case "completed":
        return <CheckCircle className="text-green-500" size={24} />
      case "cancelled":
        return <XCircle className="text-red-500" size={24} />
      default:
        return <Clock className="text-gray-500" size={24} />
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
        <p className="mt-4 text-lg">Cargando detalles del pedido...</p>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Link href="/mi-cuenta/pedidos" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft size={16} className="mr-2" /> Volver a mis pedidos
          </Link>
        </div>

        <div className="bg-red-50 p-6 rounded-lg border border-red-100 text-center">
          <p className="text-red-800 mb-4">{error || "No se encontró el pedido solicitado."}</p>
          <Button onClick={() => router.push("/mi-cuenta/pedidos")}>Ver todos mis pedidos</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/mi-cuenta/pedidos" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft size={16} className="mr-2" /> Volver a mis pedidos
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Pedido #{order.orderNumber}</h1>
              <p className="text-gray-500">
                Realizado el{" "}
                {new Date(order.createdAt).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div className="flex items-center mt-4 md:mt-0 bg-gray-100 px-4 py-2 rounded-full">
              {getStatusIcon(order.status)}
              <span className="ml-2 font-medium">{getStatusText(order.status)}</span>
            </div>
          </div>
        </div>

        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold mb-4">Productos</h2>
          <div className="divide-y">
            {order.items.map((item) => (
              <div key={item.id} className="py-4 flex justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(item.price)}</p>
                  <p className="text-sm text-gray-500">
                    {formatCurrency(item.price)} x {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(order.total)}</span>
            </div>

            {order.discount && order.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Descuento {order.couponCode && `(${order.couponCode})`}</span>
                <span>-{formatCurrency(order.total * order.discount)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Envío</span>
              <span className="text-green-600">GRATIS</span>
            </div>

            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span>{formatCurrency(order.total - (order.discount ? order.total * order.discount : 0))}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <User className="mr-2" size={18} /> Información del cliente
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="mb-2">
                <strong>Nombre:</strong> {order.customerName || "No disponible"}
              </p>
              <p className="mb-2 flex items-center">
                <Mail className="mr-2" size={16} /> {order.customerEmail || "No disponible"}
              </p>
              <p className="flex items-center">
                <Phone className="mr-2" size={16} /> {order.customerPhone || "No disponible"}
              </p>
            </div>
          </div>

          {order.shippingAddress && (
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <MapPin className="mr-2" size={18} /> Dirección de envío
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                {order.shippingAddress.line1 && <p>{order.shippingAddress.line1}</p>}
                {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
                {order.shippingAddress.city && order.shippingAddress.state && (
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postal_code}
                  </p>
                )}
                {order.shippingAddress.country && <p>{order.shippingAddress.country}</p>}
              </div>
            </div>
          )}
        </div>

        {order.orderNote && (
          <div className="p-6 border-t">
            <h2 className="text-lg font-semibold mb-4">Nota del pedido</h2>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="text-blue-800">{order.orderNote}</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Truck className="mr-2" size={18} /> Seguimiento del pedido
        </h2>

        {order.status === "completed" ? (
          <div className="text-center py-4">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">¡Tu pedido ha sido entregado!</p>
            <p className="text-gray-600 mb-4">Gracias por comprar en TasDrives.</p>
            <Link href={`/envio/${order.orderNumber.replace(/[^a-zA-Z0-9-]/g, "")}`}>
              <Button>Ver detalles del envío</Button>
            </Link>
          </div>
        ) : order.status === "cancelled" ? (
          <div className="text-center py-4">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">Este pedido ha sido cancelado</p>
            <p className="text-gray-600">Si tienes alguna pregunta, contáctanos.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    order.status !== "pending" ? "bg-green-500" : "bg-blue-500"
                  }`}
                >
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div className="ml-4">
                  <p className="font-medium">Pedido recibido</p>
                  <p className="text-sm text-gray-500">Tu pedido ha sido recibido y está siendo procesado</p>
                </div>
              </div>
              <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-300 h-12"></div>
            </div>

            <div className="relative">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    order.status === "processing" || order.status === "completed" ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  <Package className="h-5 w-5 text-white" />
                </div>
                <div className="ml-4">
                  <p className="font-medium">Preparando pedido</p>
                  <p className="text-sm text-gray-500">Estamos preparando tu pedido para el envío</p>
                </div>
              </div>
              <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-300 h-12"></div>
            </div>

            <div className="relative">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    order.status === "completed" ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <Truck className="h-5 w-5 text-white" />
                </div>
                <div className="ml-4">
                  <p className="font-medium">Pedido en camino</p>
                  <p className="text-sm text-gray-500">Tu pedido está en camino hacia tu dirección</p>
                  {order.status === "processing" && (
                    <Link
                      href={`/envio/${order.orderNumber.replace(/[^a-zA-Z0-9-]/g, "")}`}
                      className="text-blue-600 hover:text-blue-800 text-sm mt-1 inline-block"
                    >
                      Seguir envío
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-4">¿Tienes alguna pregunta sobre tu pedido?</p>
        <Link href="/contacto">
          <Button variant="outline">Contactar con soporte</Button>
        </Link>
      </div>
    </div>
  )
}
