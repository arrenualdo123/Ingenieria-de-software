import { NextResponse } from "next/server"

// Simulación de estados de envío
const shippingStatuses = [
  "pending", // Pendiente de procesamiento
  "processing", // En procesamiento
  "shipped", // Enviado
  "in_transit", // En tránsito
  "out_for_delivery", // En reparto
  "delivered", // Entregado
  "exception", // Problema con el envío
]

// Función para generar datos de seguimiento aleatorios pero realistas
function generateTrackingData(trackingNumber: string) {
  // Determinar el estado basado en el número de seguimiento
  // Para demo: los números que terminan en 1-3 están en proceso, 4-7 en tránsito, 8-9 entregados, 0 con problemas
  const lastDigit = Number.parseInt(trackingNumber.slice(-1))
  let statusIndex = 0

  if (lastDigit >= 1 && lastDigit <= 3) {
    statusIndex = 1 // processing
  } else if (lastDigit >= 4 && lastDigit <= 6) {
    statusIndex = 3 // in_transit
  } else if (lastDigit === 7) {
    statusIndex = 4 // out_for_delivery
  } else if (lastDigit >= 8) {
    statusIndex = 5 // delivered
  } else if (lastDigit === 0) {
    statusIndex = 6 // exception
  }

  const status = shippingStatuses[statusIndex]

  // Generar fechas realistas
  const now = new Date()
  const orderDate = new Date(now.getTime() - Math.random() * 10 * 24 * 60 * 60 * 1000) // Entre hoy y 10 días atrás

  // Calcular fecha estimada de entrega (entre 3 y 7 días después del pedido)
  const deliveryDays = 3 + Math.floor(Math.random() * 5)
  const estimatedDelivery = new Date(orderDate.getTime() + deliveryDays * 24 * 60 * 60 * 1000)

  // Generar historial de seguimiento
  const trackingHistory = []

  // Siempre añadir el evento de pedido recibido
  trackingHistory.push({
    status: "order_received",
    location: "Centro de procesamiento, Madrid",
    timestamp: orderDate.toISOString(),
    description: "Pedido recibido y registrado en el sistema",
  })

  // Si está al menos en procesamiento, añadir ese evento
  if (statusIndex >= 1) {
    const processingDate = new Date(orderDate.getTime() + 1 * 24 * 60 * 60 * 1000)
    trackingHistory.push({
      status: "processing",
      location: "Centro de procesamiento, Madrid",
      timestamp: processingDate.toISOString(),
      description: "Pedido en preparación",
    })
  }

  // Si está al menos enviado, añadir ese evento
  if (statusIndex >= 2) {
    const shippedDate = new Date(orderDate.getTime() + 2 * 24 * 60 * 60 * 1000)
    trackingHistory.push({
      status: "shipped",
      location: "Centro de distribución, Madrid",
      timestamp: shippedDate.toISOString(),
      description: "Pedido enviado",
    })
  }

  // Si está al menos en tránsito, añadir ese evento
  if (statusIndex >= 3) {
    const transitDate = new Date(orderDate.getTime() + 3 * 24 * 60 * 60 * 1000)
    trackingHistory.push({
      status: "in_transit",
      location: "En ruta hacia destino",
      timestamp: transitDate.toISOString(),
      description: "El pedido está en camino hacia la dirección de entrega",
    })
  }

  // Si está en reparto, añadir ese evento
  if (statusIndex >= 4) {
    const outForDeliveryDate = new Date(orderDate.getTime() + (deliveryDays - 1) * 24 * 60 * 60 * 1000)
    trackingHistory.push({
      status: "out_for_delivery",
      location: "Centro de distribución local",
      timestamp: outForDeliveryDate.toISOString(),
      description: "El pedido está en reparto para entrega hoy",
    })
  }

  // Si está entregado, añadir ese evento
  if (statusIndex === 5) {
    const deliveredDate = new Date(orderDate.getTime() + deliveryDays * 24 * 60 * 60 * 1000)
    trackingHistory.push({
      status: "delivered",
      location: "Dirección de entrega",
      timestamp: deliveredDate.toISOString(),
      description: "Pedido entregado con éxito",
    })
  }

  // Si hay un problema, añadir ese evento
  if (statusIndex === 6) {
    const exceptionDate = new Date(orderDate.getTime() + 3 * 24 * 60 * 60 * 1000)
    trackingHistory.push({
      status: "exception",
      location: "Centro de distribución",
      timestamp: exceptionDate.toISOString(),
      description: "Problema con la entrega. Contacte con atención al cliente.",
    })
  }

  // Ordenar el historial por fecha
  trackingHistory.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

  // Datos del transportista
  const carrier = {
    name: "TasDrives Express",
    phone: "+34 912 345 678",
    email: "envios@tasdrives.com",
    trackingUrl: `https://tasdrives.com/tracking/${trackingNumber}`,
  }

  return {
    trackingNumber,
    status,
    orderDate: orderDate.toISOString(),
    estimatedDelivery: estimatedDelivery.toISOString(),
    actualDelivery: status === "delivered" ? trackingHistory[trackingHistory.length - 1].timestamp : null,
    carrier,
    trackingHistory,
    shippingAddress: {
      name: "Cliente de Ejemplo",
      street: "Calle Principal 123",
      city: "Madrid",
      state: "Madrid",
      postalCode: "28001",
      country: "España",
    },
  }
}

export async function GET(request: Request, { params }: { params: { trackingNumber: string } }) {
  try {
    const { trackingNumber } = params

    // Validar el número de seguimiento (formato simple para demo)
    if (!trackingNumber || trackingNumber.length < 8) {
      return NextResponse.json({ error: "Número de seguimiento inválido" }, { status: 400 })
    }

    // Generar datos de seguimiento simulados
    const trackingData = generateTrackingData(trackingNumber)

    // Simular un pequeño retraso para que parezca una API real
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      data: trackingData,
    })
  } catch (error) {
    console.error("Error al obtener datos de seguimiento:", error)
    return NextResponse.json({ error: "Error al procesar la solicitud de seguimiento" }, { status: 500 })
  }
}
