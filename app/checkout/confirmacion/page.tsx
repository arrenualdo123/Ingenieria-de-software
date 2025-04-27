"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, ArrowRight, Truck } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useNotifications } from "@/context/NotificationsContext"

export default function ConfirmacionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"success" | "error" | "loading">("loading")
  const [orderNumber, setOrderNumber] = useState("")
  const { clearCart } = useCart()
  const { addNotification } = useNotifications()
  const [isMounted, setIsMounted] = useState(false)

  // Añadir un ref para controlar si ya se procesó la notificación
  const notificationProcessed = useRef(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    // Evitar procesamiento múltiple
    if (notificationProcessed.current) return

    try {
      // Marcar como procesado inmediatamente para evitar múltiples ejecuciones
      notificationProcessed.current = true

      // Intentar obtener el número de pedido de localStorage
      const storedOrderNumber = localStorage.getItem("lastOrderNumber")

      if (storedOrderNumber) {
        setOrderNumber(storedOrderNumber)
        setStatus("success")

        // Añadir notificación de compra exitosa
        const totalStr = localStorage.getItem("lastOrderTotal")
        const total = totalStr ? Number.parseFloat(totalStr) : undefined

        // Añadir la notificación una sola vez
        addNotification({
          type: "purchase",
          title: "¡Compra realizada con éxito!",
          message: `Tu pedido #${storedOrderNumber} ha sido confirmado.`,
          data: {
            orderNumber: storedOrderNumber,
            total,
          },
        })
        console.log("Notificación de compra añadida")

        // Limpiar el número de pedido de localStorage después de un tiempo
        setTimeout(() => {
          localStorage.removeItem("lastOrderNumber")
          localStorage.removeItem("lastOrderTotal")
        }, 2000)

        return
      }

      // Si no hay número de pedido en localStorage, verificar los parámetros de URL
      const paymentIntent = searchParams?.get("payment_intent")
      const paymentStatus = searchParams?.get("redirect_status")

      if (paymentIntent && paymentStatus === "succeeded") {
        // Generar un número de orden aleatorio (en un caso real, esto vendría del backend)
        const randomOrderNumber = Math.floor(Math.random() * 1000000)
          .toString()
          .padStart(6, "0")
        setOrderNumber(randomOrderNumber)
        setStatus("success")

        // Añadir notificación de compra exitosa una sola vez
        addNotification({
          type: "purchase",
          title: "¡Compra realizada con éxito!",
          message: `Tu pedido #${randomOrderNumber} ha sido confirmado.`,
          data: {
            orderNumber: randomOrderNumber,
          },
        })
        console.log("Notificación de compra añadida (desde URL)")

        // No limpiar el carrito inmediatamente
        setTimeout(() => {
          clearCart()
        }, 1000)
      } else if (paymentStatus === "failed") {
        setStatus("error")
      } else {
        // Si no hay parámetros, asumimos que es una redirección manual después de un pago exitoso
        setStatus("success")
        // Generar un número de orden aleatorio
        const randomOrderNumber = Math.floor(Math.random() * 1000000)
          .toString()
          .padStart(6, "0")
        setOrderNumber(randomOrderNumber)

        // Añadir notificación de compra exitosa una sola vez
        addNotification({
          type: "purchase",
          title: "¡Compra realizada con éxito!",
          message: `Tu pedido #${randomOrderNumber} ha sido confirmado.`,
          data: {
            orderNumber: randomOrderNumber,
          },
        })
        console.log("Notificación de compra añadida (manual)")

        // No limpiar el carrito inmediatamente
        setTimeout(() => {
          clearCart()
        }, 1000)
      }
    } catch (error) {
      console.error("Error en la página de confirmación:", error)
      setStatus("error")
    }
  }, [searchParams, clearCart, addNotification, isMounted])

  if (!isMounted || status === "loading") {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
        <p className="mt-4 text-lg">Verificando el estado de tu pago...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-16 px-4 text-center max-w-3xl">
      <div className="bg-white p-8 rounded-lg shadow-sm border">
        {status === "success" ? (
          <>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">¡Gracias por tu compra!</h1>
            <p className="text-gray-600 mb-6">
              Tu pedido ha sido procesado correctamente. Hemos enviado un correo electrónico con los detalles de tu
              compra.
            </p>
          </>
        ) : (
          <>
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="h-10 w-10 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Hubo un problema con tu pago</h1>
            <p className="text-gray-600 mb-6">
              Lo sentimos, pero no pudimos procesar tu pago. Por favor, intenta nuevamente o contacta con nuestro
              servicio de atención al cliente.
            </p>
          </>
        )}

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-lg font-medium mb-4">Detalles del pedido</h2>
          <p className="text-gray-600 mb-3">
            Número de pedido: <span className="font-medium">{orderNumber}</span>
          </p>
          <p className="text-gray-600 mb-3">
            Fecha: <span className="font-medium">{new Date().toLocaleDateString()}</span>
          </p>
          <p className="text-gray-600 mb-3">
            Estado:{" "}
            <span className={status === "success" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
              {status === "success" ? "Confirmado" : "Fallido"}
            </span>
          </p>

          {status === "success" && (
            <div className="mt-6 border-t pt-4">
              <div className="flex items-center justify-center text-blue-600 mb-2">
                <Truck className="mr-2" size={18} />
                <span className="font-medium">Información de envío</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Recibirás un correo electrónico con los detalles de seguimiento una vez que tu pedido sea enviado.
              </p>
              <Link href={`/envio/${orderNumber}`}>
                <Button variant="outline" size="sm" className="w-full">
                  <Truck className="mr-2" size={16} /> Seguir envío
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/tienda">
            <Button variant="outline" className="w-full sm:w-auto">
              Seguir comprando
            </Button>
          </Link>
          <Link href="/">
            <Button className="w-full sm:w-auto">
              Volver al inicio <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
