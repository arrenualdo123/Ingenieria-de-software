import { NextResponse } from "next/server"
import Stripe from "stripe"
import type { CartItem } from "@/hooks/use-cart"

// Inicializar Stripe con la clave secreta desde las variables de entorno
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-03-31.basil", // Versión actualizada
})

export async function POST(request: Request) {
  try {
    console.log("Iniciando creación de PaymentIntent")

    const body = await request.json()
    console.log("Body recibido:", JSON.stringify(body, null, 2))

    const { cartItems, amount, currency = "mxn", customerEmail, orderNote, couponCode } = body

    // Validar que se proporcionó un monto
    if (!amount || amount <= 0) {
      console.error("Error: Monto inválido", amount)
      return NextResponse.json({ error: "Se requiere un monto válido para crear un PaymentIntent" }, { status: 400 })
    }

    // IMPORTANTE: Convertir el monto a una escala adecuada para Stripe
    // Para montos grandes, podemos dividir por 100 o 1000 para mantenerlo dentro del límite
    // Esto es solo para fines de demostración - en producción deberías usar una lógica diferente
    let adjustedAmount = amount
    if (amount > 999999) {
      // Si el monto es mayor a 999,999, lo dividimos por 1000 para simulación
      adjustedAmount = amount / 1000
      console.log(`Monto ajustado para demostración: ${amount} -> ${adjustedAmount}`)
    }

    // Crear metadatos para el pedido
    const metadata: Record<string, string> = {
      orderNote: orderNote || "",
      couponCode: couponCode || "",
      originalAmount: amount.toString(), // Guardamos el monto original en los metadatos
      items: JSON.stringify(
        cartItems.map((item: CartItem) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      ),
    }

    console.log("Creando PaymentIntent con Stripe")
    console.log("Monto original:", amount)
    console.log("Monto ajustado:", adjustedAmount)
    console.log("Moneda:", currency)
    console.log("Email:", customerEmail)

    // Verificar que la clave de API de Stripe esté configurada
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("Error: STRIPE_SECRET_KEY no está configurada")
      return NextResponse.json({ error: "Error de configuración del servidor" }, { status: 500 })
    }

    // Crear un PaymentIntent con Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(adjustedAmount * 100), // Stripe requiere el monto en centavos
      currency,
      metadata,
      receipt_email: customerEmail,
      automatic_payment_methods: {
        enabled: true,
      },
    })

    console.log("PaymentIntent creado exitosamente:", paymentIntent.id)

    // Devolver el clientSecret al cliente
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      originalAmount: amount,
      adjustedAmount: adjustedAmount,
    })
  } catch (error: any) {
    console.error("Error al crear PaymentIntent:", error)

    // Proporcionar información más detallada sobre el error
    const errorMessage = error.message || "Error desconocido"
    const errorType = error.type || "unknown_error"
    const errorCode = error.statusCode || 500

    console.error(`Tipo: ${errorType}, Código: ${errorCode}, Mensaje: ${errorMessage}`)

    return NextResponse.json(
      {
        error: "Error al procesar la solicitud de pago",
        details: errorMessage,
        type: errorType,
      },
      { status: 500 },
    )
  }
}
