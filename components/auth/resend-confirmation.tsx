"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/AuthContext"
import { Loader2 } from "lucide-react"

export default function ResendConfirmation() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const { resendConfirmationEmail } = useAuth()

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const { error } = await resendConfirmationEmail(email)

      if (error) {
        setMessage({ type: "error", text: error.message })
      } else {
        setMessage({
          type: "success",
          text: "Se ha enviado un nuevo correo de confirmación. Por favor revisa tu bandeja de entrada.",
        })
        setEmail("")
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Ha ocurrido un error al enviar el correo de confirmación.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-6 p-4 border rounded-lg">
      <h3 className="text-lg font-medium mb-2">¿No recibiste el correo de confirmación?</h3>
      <p className="text-sm text-gray-500 mb-4">
        Si no has recibido el correo de confirmación, puedes solicitar uno nuevo.
      </p>

      <form onSubmit={handleResend} className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            "Reenviar correo de confirmación"
          )}
        </Button>
      </form>

      {message && (
        <div
          className={`mt-4 p-3 rounded-md ${
            message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  )
}
