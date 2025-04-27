import { NextResponse } from "next/server"
import { Resend } from "resend"
import ContactFormEmail from "@/components/emails/contact-form-email"

// Inicializar Resend con tu API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    // Obtener los datos del formulario
    const body = await request.json()
    const { name, email, phone, message } = body

    // Validar los datos
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Nombre, email y mensaje son obligatorios" }, { status: 400 })
    }

    // Enviar el correo
    const { data, error } = await resend.emails.send({
      from: "TasDrives <onboarding@resend.dev>", // Cambia esto por tu dominio verificado en Resend
      to: ["arreenunaola24@gmail.com"], // Correo donde quieres recibir los mensajes
      subject: `Nuevo mensaje de contacto de ${name}`,
      react: ContactFormEmail({ name, email, phone, message }),
      replyTo: email,
    })

    if (error) {
      console.error("Error al enviar el correo:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Mensaje enviado correctamente",
      data,
    })
  } catch (error: any) {
    console.error("Error en la API de contacto:", error)
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 })
  }
}
