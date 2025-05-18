"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import type { Session, User } from "@supabase/supabase-js"

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signUp: (
    email: string,
    password: string,
    userData?: any,
  ) => Promise<{
    error: any | null
    data: any | null
  }>
  signIn: (
    email: string,
    password: string,
  ) => Promise<{
    error: any | null
    data: any | null
  }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{
    error: any | null
    data: any | null
  }>
  resendConfirmationEmail: (email: string) => Promise<{
    error: any | null
    data: any | null
  }>
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Obtener la sesión actual
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error("Error getting session:", error)
      }
      setSession(data.session)
      setUser(data.session?.user || null)

      // Verificar si el usuario es administrador
      if (data.session?.user?.email === "tasdrivesdev1@gmail.com") {
        setIsAdmin(true)
      }

      setIsLoading(false)
    }

    getSession()

    // Escuchar cambios en la autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email)
      setSession(session)
      setUser(session?.user || null)

      // Verificar si el usuario es administrador
      if (session?.user?.email === "tasdrivesdev1@gmail.com") {
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
      }

      setIsLoading(false)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  // Registrar un nuevo usuario
  const signUp = async (email: string, password: string, userData?: any) => {
    setIsLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    })
    setIsLoading(false)
    return { data, error }
  }

  // Iniciar sesión
  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setIsLoading(false)
    return { data, error }
  }

  // Cerrar sesión
  const signOut = async () => {
    setIsLoading(true)
    await supabase.auth.signOut()
    setIsLoading(false)
  }

  // Restablecer contraseña
  const resetPassword = async (email: string) => {
    setIsLoading(true)
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    setIsLoading(false)
    return { data, error }
  }

  // Reenviar correo de confirmación
  const resendConfirmationEmail = async (email: string) => {
    setIsLoading(true)
    // Supabase no tiene un método directo para reenviar correos de confirmación
    // Usamos signUp con el mismo correo para forzar un reenvío
    const { data, error } = await supabase.auth.resend({
      type: "signup",
      email: email,
    })
    setIsLoading(false)
    return { data, error }
  }

  const value = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    resendConfirmationEmail,
    isAdmin,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

