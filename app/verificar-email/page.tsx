"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import Link from "next/link"

export default function VerificarEmail() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!token) {
      setStatus("error")
      setMessage("Token de verificación no proporcionado")
      return
    }

    const verifyToken = async () => {
      try {
        const response = await fetch("/api/auth/confirm-verification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        })

        const data = await response.json()

        if (response.ok) {
          setStatus("success")
          setMessage(data.message || "Tu correo electrónico ha sido verificado correctamente")
        } else {
          setStatus("error")
          setMessage(data.error || "Error al verificar el correo electrónico")
        }
      } catch (error) {
        setStatus("error")
        setMessage("Error al conectar con el servidor")
      }
    }

    verifyToken()
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Verificación de correo</CardTitle>
          <CardDescription className="text-center">
            {status === "loading" ? "Verificando tu correo electrónico..." : ""}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6">
          {status === "loading" && <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />}
          {status === "success" && <CheckCircle className="h-16 w-16 text-green-500 mb-4" />}
          {status === "error" && <XCircle className="h-16 w-16 text-red-500 mb-4" />}
          <p className="text-center text-lg mt-4">{message}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          {status !== "loading" && (
            <Button asChild>
              <Link href="/login">Ir al inicio de sesión</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
