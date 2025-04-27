"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useStripe, useElements, PaymentElement, AddressElement } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { Check, Loader2 } from "lucide-react"

interface CheckoutFormProps {
  paymentIntentId: string
  customerInfo: {
    name: string
    email: string
    phone: string
  }
}

export default function CheckoutForm({ paymentIntentId, customerInfo }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const { clearCart } = useCart()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [succeeded, setSucceeded] = useState(false)
  const [shippingAddress, setShippingAddress] = useState<any>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    // Validar información del cliente
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      setError("Por favor, completa toda la información de contacto.")
      return
    }

    setProcessing(true)

    try {
      // Confirmar el pago con Stripe
      const { error: submitError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/confirmacion`,
        },
        redirect: "if_required",
      })

      if (submitError) {
        throw new Error(submitError.message || "Ocurrió un error al procesar tu pago.")
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        setSucceeded(true)

        try {
          console.log("Guardando pedido en el sistema...")
          // Guardar el pedido en nuestra base de datos
          const response = await fetch("/api/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              paymentIntentId,
              customerName: customerInfo.name,
              customerEmail: customerInfo.email,
              customerPhone: customerInfo.phone,
              shippingAddress,
            }),
          })

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.error || "Error al guardar el pedido")
          }

          const data = await response.json()

          if (data.success) {
            console.log("Pedido guardado exitosamente:", data.orderNumber)
            // Guardar el número de pedido en localStorage para mostrarlo en la página de confirmación
            localStorage.setItem("lastOrderNumber", data.orderNumber)
            localStorage.setItem("lastOrderTotal", data.total.toString())

            // Limpiar carrito y redirigir a página de confirmación después de 1.5 segundos
            setTimeout(() => {
              clearCart()
              router.push("/checkout/confirmacion")
            }, 1500)
          } else {
            throw new Error(data.error || "Error al procesar el pedido")
          }
        } catch (error) {
          console.error("Error al guardar el pedido:", error)
          setError(
            "Tu pago fue procesado, pero hubo un problema al registrar tu pedido. Por favor, contacta con atención al cliente.",
          )
        }
      } else {
        throw new Error("El pago no ha sido completado")
      }
    } catch (error) {
      console.error("Error en el proceso de pago:", error)
      setError(error instanceof Error ? error.message : "Error desconocido al procesar el pago")
    } finally {
      setProcessing(false)
    }
  }

  // Capturar la dirección de envío
  const handleAddressChange = (event: any) => {
    setShippingAddress(event.value)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {succeeded ? (
        <div className="bg-green-50 p-4 rounded-lg border border-green-100 flex items-center">
          <Check className="text-green-500 mr-2" size={20} />
          <span className="text-green-800 font-medium">¡Pago procesado con éxito!</span>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            <h3 className="font-medium">Información de pago</h3>
            <div className="p-4 border rounded-md bg-white">
              <PaymentElement />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Dirección de envío</h3>
            <div className="p-4 border rounded-md bg-white">
              <AddressElement options={{ mode: "shipping" }} onChange={handleAddressChange} />
            </div>
          </div>

          {error && <div className="bg-red-50 p-4 rounded-lg border border-red-100 text-red-800">{error}</div>}

          <Button type="submit" disabled={!stripe || processing} className="w-full bg-gray-800 hover:bg-gray-700 py-3">
            {processing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Procesando...
              </>
            ) : (
              "Pagar ahora"
            )}
          </Button>
        </>
      )}
    </form>
  )
}
