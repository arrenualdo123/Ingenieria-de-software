import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Verificar que las variables de entorno estén configuradas
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    const secretKey = process.env.STRIPE_SECRET_KEY

    // Ocultar parte de las claves por seguridad
    const maskKey = (key: string | undefined) => {
      if (!key) return "no configurada"
      if (key.length <= 8) return "***"
      return key.substring(0, 4) + "..." + key.substring(key.length - 4)
    }

    return NextResponse.json({
      success: true,
      environment: process.env.NODE_ENV,
      publishableKey: {
        configured: !!publishableKey,
        value: maskKey(publishableKey),
      },
      secretKey: {
        configured: !!secretKey,
        value: maskKey(secretKey),
      },
    })
  } catch (error) {
    console.error("Error en test-stripe:", error)
    return NextResponse.json({ success: false, error: "Error al verificar la configuración" }, { status: 500 })
  }
}
