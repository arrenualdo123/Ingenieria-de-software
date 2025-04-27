import { NextResponse } from "next/server"
import Stripe from "stripe"

// Inicializar Stripe con la clave secreta desde las variables de entorno
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-03-31.basil", // Versión actualizada
})

export async function GET() {
  try {
    // En un entorno real, aquí verificaríamos la autenticación del administrador

    // Obtener los pagos (PaymentIntents) de Stripe
    const paymentIntents = await stripe.paymentIntents.list({
      limit: 100, // Limitar a los últimos 100 pagos
    })

    // Transformar los datos para la respuesta
    const payments = paymentIntents.data.map((payment) => ({
      id: payment.id,
      amount: payment.amount,
      status: payment.status,
      created: payment.created,
      customer: payment.receipt_email,
      description: payment.description,
      metadata: payment.metadata,
    }))

    return NextResponse.json({
      success: true,
      payments,
    })
  } catch (error) {
    console.error("Error al obtener los pagos:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener los pagos",
      },
      { status: 500 },
    )
  }
}
