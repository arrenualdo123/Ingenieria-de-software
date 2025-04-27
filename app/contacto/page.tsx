"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react"

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar el mensaje")
      }

      setStatus("success")
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      })

      // Resetear el estado después de 5 segundos
      setTimeout(() => {
        setStatus("idle")
      }, 5000)
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Error al enviar el mensaje")

      // Resetear el estado de error después de 5 segundos
      setTimeout(() => {
        setStatus("idle")
        setErrorMessage("")
      }, 5000)
    }
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Contacto</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Información de contacto */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Estamos aquí para ayudarte</h2>
          <p className="text-gray-600 mb-8">
            ¿Tienes alguna pregunta sobre nuestros vehículos o servicios? No dudes en contactarnos. Nuestro equipo
            estará encantado de atenderte.
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <Phone className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium">Teléfono</h3>
                <p className="text-gray-600">(123) 456-7890</p>
                <p className="text-gray-600">Lun - Vie: 9:00 - 18:00</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <Mail className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-600">info@tasdrives.com</p>
                <p className="text-gray-600">soporte@tasdrives.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <MapPin className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium">Dirección</h3>
                <p className="text-gray-600">Calle Principal 123</p>
                <p className="text-gray-600">Ciudad, CP 12345</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="font-medium mb-4">Síguenos en redes sociales</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm5.5 16.5h-2.5v-4.5c0-1.5-1-2.5-2-2.5s-2 1-2 2v5h-2.5v-10h2.5v1.5c.5-1 1.5-1.5 2.5-1.5 2 0 4 1.5 4 4v5z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm-1-6.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM17 15h-2v-3c0-.55-.45-1-1-1s-1 .45-1 1v3h-2V9h2v1.5c.5-.75 1.5-1.5 2.5-1.5 1.5 0 2.5 1.25 2.5 3v3z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 14c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-9 0c-.83 0-1.5-.67-1.5-1.5S6.67 13 7.5 13s1.5.67 1.5 1.5S8.33 16 7.5 16zm4.5-9c-2.03 0-3.8 1.11-4.75 2.75-.19.33-.06.75.27.94.33.19.75.06.94-.27C9.2 8.9 10.53 8 12 8c1.47 0 2.8.9 3.54 2.42.19.33.61.46.94.27.33-.19.46-.61.27-.94C15.8 8.11 14.03 7 12 7z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Formulario de contacto */}
        <div className="bg-white p-8 rounded-lg shadow-sm border">
          <h2 className="text-2xl font-semibold mb-6">Envíanos un mensaje</h2>

          {status === "success" && (
            <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-md flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <div>
                <h3 className="font-medium text-green-800">¡Mensaje enviado!</h3>
                <p className="text-green-700 text-sm">Gracias por contactarnos. Te responderemos lo antes posible.</p>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-800">Error al enviar el mensaje</h3>
                <p className="text-red-700 text-sm">{errorMessage || "Por favor, inténtalo de nuevo más tarde."}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tu nombre"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(123) 456-7890"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Mensaje <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="¿En qué podemos ayudarte?"
                rows={5}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-700" disabled={status === "loading"}>
              {status === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar mensaje
                </>
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Mapa */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Encuéntranos</h2>
        <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.4319339488697!2d-99.16869732393511!3d19.39641644131121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff0f4fca3fd9%3A0x5d6c4bde7291b75e!2sPaseo%20de%20la%20Reforma%2C%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1682456429912!5m2!1ses-419!2smx"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  )
}
