"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { Loader2 } from "lucide-react"

export default function AdminProtected({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const [checking, setChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAdmin = async () => {
      if (!isLoading) {
        if (!user) {
          router.push("/login?redirect=/admin")
          return
        }

        try {
          // Verificar si el usuario es administrador
          // Solo permitir tasdrivesdev1@gmail.com como administrador
          const isUserAdmin = user.email === "arreenunaola24@gmail.com"

          if (!isUserAdmin) {
            console.log("Usuario no es administrador:", user.email)
            router.push("/")
          }
        } catch (error) {
          console.error("Error checking admin status:", error)
          router.push("/")
        } finally {
          setChecking(false)
        }
      }
    }

    checkAdmin()
  }, [user, isLoading, router])

  if (isLoading || checking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Verificando permisos...</p>
        </div>
      </div>
    )
  }

  // Solo mostrar el contenido si el usuario es tasdrivesdev1@gmail.com
  if (user?.email !== "arreenunaola24@gmail.com") {
    return null
  }

  return <>{children}</>
}
