"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertTriangle,
  MapPin,
  ArrowLeft,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react"

// Tipos para los datos de seguimiento
interface TrackingHistoryItem {
  status: string
  location: string
  timestamp: string
  description: string
}

interface Carrier {
  name: string
  phone: string
  email: string
  trackingUrl: string
}

interface TrackingData {
  trackingNumber: string
  status: string
  orderDate: string
  estimatedDelivery: string
  actualDelivery: string | null
  carrier: Carrier
  trackingHistory: TrackingHistoryItem[]
  shippingAddress: {
    name: string
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
}

export default function ShippingTrackingPage() {
  const params = useParams()
  const trackingNumber = params.trackingNumber as string

  const [trackingData, setTrackingData] = useState<TrackingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/shipping/${trackingNumber}`)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Error al obtener datos de seguimiento")
        }

        const data = await response.json()
        setTrackingData(data.data)
      } catch (error) {
        console.error("Error:", error)
        setError(error instanceof Error ? error.message : "Error desconocido")
      } finally {
        setLoading(false)
      }
    }

    if (trackingNumber) {
      fetchTrackingData()
    }
  }, [trackingNumber])

  // Función para obtener el icono según el estado
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="text-yellow-500" size={24} />
      case "processing":
        return <Package className="text-blue-500" size={24} />
      case "shipped":
        return <Package className="text-blue-500" size={24} />
      case "in_transit":
        return <Truck className="text-blue-500" size={24} />
      case "out_for_delivery":
        return <Truck className="text-green-500" size={24} />
      case "delivered":
        return <CheckCircle className="text-green-500" size={24} />
      case "exception":
        return <AlertTriangle className="text-red-500" size={24} />
      default:
        return <Clock className="text-gray-500" size={24} />
    }
  }

  // Función para obtener el texto del estado
  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendiente"
      case "processing":
        return "En procesamiento"
      case "shipped":
        return "Enviado"
      case "in_transit":
        return "En tránsito"
      case "out_for_delivery":
        return "En reparto"
      case "delivered":
        return "Entregado"
      case "exception":
        return "Problema con el envío"
      default:
        return "Desconocido"
    }
  }

  // Función para formatear fechas
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Calcular el progreso del envío
  const calculateProgress = (status: string) => {
    const statusMap: Record<string, number> = {
      pending: 0,
      processing: 20,
      shipped: 40,
      in_transit: 60,
      out_for_delivery: 80,
      delivered: 100,
      exception: 60, // Si hay un problema, mostramos progreso parcial
    }

    return statusMap[status] || 0
  }

  if (loading) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
        <p className="mt-4 text-lg">Cargando información de seguimiento...</p>
      </div>
    )
  }

  if (error || !trackingData) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Link href="/mi-cuenta/pedidos" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft size={16} className="mr-2" /> Volver a mis pedidos
          </Link>
        </div>

        <div className="bg-red-50 p-6 rounded-lg border border-red-100 text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No se pudo obtener la información de seguimiento</h2>
          <p className="text-red-800 mb-4">{error || "Número de seguimiento no encontrado"}</p>
          <Button onClick={() => window.location.reload()}>Intentar de nuevo</Button>
        </div>
      </div>
    )
  }

  const progressPercentage = calculateProgress(trackingData.status)

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
              <h1 className="text-2xl font-bold mb-2">Seguimiento de envío</h1>
              <p className="text-gray-500">
                Número de seguimiento: <span className="font-medium">{trackingData.trackingNumber}</span>
              </p>
            </div>

            <div className="flex items-center mt-4 md:mt-0 bg-gray-100 px-4 py-2 rounded-full">
              {getStatusIcon(trackingData.status)}
              <span className="ml-2 font-medium">{getStatusText(trackingData.status)}</span>
            </div>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="p-6 border-b">
          <div className="mb-2 flex justify-between text-sm">
            <span>Pedido recibido</span>
            <span>Entregado</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${trackingData.status === "exception" ? "bg-red-500" : "bg-green-500"}`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Fecha de pedido</p>
              <p className="font-medium">{formatDate(trackingData.orderDate)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Entrega estimada</p>
              <p className="font-medium">
                {trackingData.status === "delivered"
                  ? "Entregado el " + formatDate(trackingData.actualDelivery as string)
                  : formatDate(trackingData.estimatedDelivery)}
              </p>
            </div>
          </div>
        </div>

        {/* Historial de seguimiento */}
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold mb-4">Historial de seguimiento</h2>

          <div className="space-y-8">
            {trackingData.trackingHistory.map((event, index) => (
              <div key={index} className="relative">
                {/* Línea vertical que conecta los eventos */}
                {index < trackingData.trackingHistory.length - 1 && (
                  <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-gray-200 h-full"></div>
                )}

                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        event.status === "delivered"
                          ? "bg-green-500"
                          : event.status === "exception"
                            ? "bg-red-500"
                            : "bg-blue-500"
                      }`}
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <p className="font-medium">{event.description}</p>
                      <p className="text-sm text-gray-500">{formatDate(event.timestamp)}</p>
                    </div>
                    <p className="text-sm text-gray-600">{event.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Información del transportista y dirección */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Truck className="mr-2" size={18} /> Información del transportista
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium mb-2">{trackingData.carrier.name}</p>
              <p className="mb-2 flex items-center">
                <Phone className="mr-2" size={16} /> {trackingData.carrier.phone}
              </p>
              <p className="mb-2 flex items-center">
                <Mail className="mr-2" size={16} /> {trackingData.carrier.email}
              </p>
              <a
                href={trackingData.carrier.trackingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center mt-2"
              >
                <ExternalLink size={16} className="mr-2" /> Ver en sitio del transportista
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <MapPin className="mr-2" size={18} /> Dirección de entrega
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium mb-2">{trackingData.shippingAddress.name}</p>
              <p className="mb-1">{trackingData.shippingAddress.street}</p>
              <p className="mb-1">
                {trackingData.shippingAddress.city}, {trackingData.shippingAddress.state}{" "}
                {trackingData.shippingAddress.postalCode}
              </p>
              <p>{trackingData.shippingAddress.country}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mapa simulado */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Ubicación del envío</h2>
        <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.3593619197366!2d-3.7037974842861566!3d40.41694997936419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422997800a3c81%3A0xc436dec1618c2269!2sMadrid%2C%20Spain!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button variant="outline">
          <Phone className="mr-2" size={16} /> Contactar con el transportista
        </Button>
        <Button>
          <Mail className="mr-2" size={16} /> Reportar un problema
        </Button>
      </div>
    </div>
  )
}
