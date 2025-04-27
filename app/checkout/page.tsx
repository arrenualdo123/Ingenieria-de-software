"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { useCart } from "@/hooks/use-cart"
import CheckoutForm from "./checkout-form"

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const { cartItems, cartTotal, orderNote, couponCode } = useCart()

  useEffect(() => {
    // Create a PaymentIntent as soon as the page loads
    const createPaymentIntent = async () => {
      try {
        setLoading(true)
        setError(null)

        // Get user info from localStorage if available
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          setCustomerInfo((prev) => ({
            ...prev,
            name: userData.name || "",
            email: userData.email || "",
          }))
        }

        // Don't create a payment intent if cart is empty
        if (cartItems.length === 0) {
          setLoading(false)
          return
        }

        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartItems,
            amount: cartTotal,
            currency: "eur",
            customerEmail: customerInfo.email || undefined,
            orderNote,
            couponCode,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Error al crear la intención de pago")
        }

        const data = await response.json()
        setClientSecret(data.clientSecret)
        setPaymentIntentId(data.paymentIntentId)
      } catch (error) {
        console.error("Error creating payment intent:", error)
        setError(error instanceof Error ? error.message : "Error al inicializar el pago")
      } finally {
        setLoading(false)
      }
    }

    createPaymentIntent()
  }, [cartItems, cartTotal, orderNote, couponCode, customerInfo.email])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  if (loading) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
        <p className="mt-4 text-lg">Preparando el checkout...</p>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold mb-6">Tu carrito está vacío</h1>
        <p className="mb-6">No puedes realizar el checkout sin productos en tu carrito.</p>
        <a href="/tienda" className="text-blue-600 hover:text-blue-800">
          Volver a la tienda
        </a>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Información del cliente */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-4">Información de contacto</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>
            <div className="divide-y">
              {cartItems.map((item) => (
                <div key={item.id} className="py-3 flex justify-between">
                  <div className="flex items-center">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-500 ml-2">x{item.quantity}</span>
                  </div>
                  <span>{(item.price * item.quantity).toLocaleString("es-ES")} €</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{cartTotal.toLocaleString("es-ES")} €</span>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de pago */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Pago</h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-md">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {clientSecret && paymentIntentId ? (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: "stripe",
                  variables: {
                    colorPrimary: "#6b7280",
                    colorBackground: "#ffffff",
                    colorText: "#1f2937",
                  },
                },
              }}
            >
              <CheckoutForm paymentIntentId={paymentIntentId} customerInfo={customerInfo} />
            </Elements>
          ) : (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800 mx-auto"></div>
              <p className="mt-2 text-gray-600">Cargando opciones de pago...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
