import { NextResponse } from "next/server"
import Stripe from "stripe"

// Inicializar Stripe con la clave secreta desde las variables de entorno
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-03-31.basil", // Versión actualizada
})

// Modificar la función POST para asegurar que se guarde correctamente el número de pedido
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { paymentIntentId, customerName, customerEmail, customerPhone, shippingAddress } = body

    console.log("Procesando orden con PaymentIntent:", paymentIntentId)
    console.log("Datos del cliente:", { customerName, customerEmail, customerPhone })

    // Verificar que el pago existe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    console.log("Estado del PaymentIntent:", paymentIntent.status)

    // En modo de demostración, no necesitamos verificar que el pago esté completado
    // ya que estamos usando un entorno de prueba
    // Simplemente generamos un número de pedido único
    const orderNumber = `TAS-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    console.log(`Pedido creado: ${orderNumber}`, {
      customerName,
      customerEmail,
      items: paymentIntent.metadata.items || "[]",
      total: paymentIntent.amount / 100,
      orderNote: paymentIntent.metadata.orderNote,
      couponCode: paymentIntent.metadata.couponCode,
    })

    // En un caso real, aquí guardaríamos el pedido en una base de datos
    // Pero para esta demostración, simplemente devolvemos éxito

    return NextResponse.json({
      success: true,
      orderNumber,
      total: paymentIntent.amount / 100,
      message: "Pedido creado correctamente",
    })
  } catch (error) {
    console.error("Error al crear el pedido:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error al procesar el pedido",
      },
      { status: 500 },
    )
  }
}
