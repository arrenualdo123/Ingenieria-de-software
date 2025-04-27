import { NextResponse } from "next/server"
import Stripe from "stripe"

// Inicializar Stripe con la clave secreta desde las variables de entorno
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-03-31.basil", // Versión actualizada
})

export async function GET(request: Request) {
  try {
    // Obtener el email del usuario de los parámetros de consulta
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json({ success: false, error: "Email no proporcionado" }, { status: 400 })
    }

    // Obtener los pagos (PaymentIntents) de Stripe para este usuario
    const paymentIntents = await stripe.paymentIntents.list({
      limit: 100,
    })

    // Y luego filtrar manualmente los resultados:
    const filteredPaymentIntents = paymentIntents.data.filter((payment) => payment.receipt_email === email)

    // Transformar los datos para la respuesta
    const orders = filteredPaymentIntents
      .filter((payment) => payment.status === "succeeded") // Solo pagos exitosos
      .map((payment) => {
        // Intentar parsear los items del pedido desde los metadatos
        let items = []
        try {
          items = JSON.parse(payment.metadata.items || "[]")
        } catch (e) {
          console.error("Error al parsear items:", e)
        }

        // Generar un número de pedido basado en el ID del PaymentIntent
        const orderNumber = `TAS-${payment.created}-${payment.id.substring(0, 6)}`

        return {
          id: payment.id,
          orderNumber,
          createdAt: new Date(payment.created * 1000).toISOString(),
          status: "completed", // Asumimos que todos los pagos exitosos son pedidos completados
          items,
          total: payment.amount / 100, // Convertir de centavos a unidades
          discount: payment.metadata.discount || 0,
          couponCode: payment.metadata.couponCode || "",
          orderNote: payment.metadata.orderNote || "",
        }
      })

    return NextResponse.json({
      success: true,
      orders,
    })
  } catch (error) {
    console.error("Error al obtener los pedidos:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener los pedidos",
      },
      { status: 500 },
    )
  }
}
