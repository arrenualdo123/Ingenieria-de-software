"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { X, User, Facebook, Github, Linkedin, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setIsLoggedIn(true)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!isOpen) return null

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!email || !password) {
      setError("Por favor, complete todos los campos.")
      return
    }

    // Simulate successful login
    const user = {
      name: "Usuario de prueba",
      email: email,
    }
    localStorage.setItem("user", JSON.stringify(user))
    setIsLoggedIn(true)
    setUser(user)
    onClose()
  }

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!name || !email || !password) {
      setError("Por favor, complete todos los campos.")
      return
    }

    // Simulate successful registration and login
    const user = {
      name: name,
      email: email,
    }
    localStorage.setItem("user", JSON.stringify(user))
    setIsLoggedIn(true)
    setUser(user)
    onClose()
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    setUser(null)
    onClose()
  }

  const goToProfile = () => {
    onClose()
    router.push("/perfil")
  }

  if (isLoggedIn && user) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-md overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold">Mi Cuenta</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <User size={40} className="text-gray-500" />
              </div>
            </div>

            <h3 className="text-xl font-semibold text-center mb-2">{user.name}</h3>
            <p className="text-gray-500 text-center mb-6">{user.email}</p>

            <div className="space-y-4">
              <Button variant="outline" className="w-full" onClick={goToProfile}>
                Mi Perfil
              </Button>
              <Button variant="outline" className="w-full" onClick={goToProfile}>
                Mis Pedidos
              </Button>
              <Button variant="outline" className="w-full" onClick={goToProfile}>
                Favoritos
              </Button>
              <Button variant="destructive" className="w-full flex items-center justify-center" onClick={handleLogout}>
                <LogOut size={16} className="mr-2" /> Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Lado izquierdo */}
          <div
            className={`w-full md:w-1/2 ${activeTab === "login" ? "bg-white p-8" : "bg-red-500 text-white p-8 flex flex-col items-center justify-center"}`}
          >
            {activeTab === "login" ? (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Iniciar Sesión</h2>
                  <p className="text-gray-600">o usa tu correo electrónico y contraseña</p>
                </div>

                <div className="flex justify-center space-x-2 mb-6">
                  <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="sr-only">Google</span>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                      />
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Facebook size={20} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Github size={20} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Linkedin size={20} />
                  </button>
                </div>

                {error && (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                    role="alert"
                  >
                    <span className="block sm:inline">{error}</span>
                  </div>
                )}

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      placeholder="Correo Electrónico"
                      className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Contraseña"
                      className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="text-right">
                    <a href="#" className="text-sm text-gray-600 hover:underline">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">
                    INICIAR SESIÓN
                  </Button>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-4">¡Hola, Amigo!</h2>
                <p className="text-center mb-8">
                  Regístrate con tus datos personales para usar todas las funciones del sitio
                </p>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-red-500"
                  onClick={() => setActiveTab("login")}
                >
                  INICIAR SESIÓN
                </Button>
              </>
            )}
          </div>

          {/* Lado derecho */}
          <div
            className={`w-full md:w-1/2 ${activeTab === "register" ? "bg-white p-8" : "bg-red-500 text-white p-8 flex flex-col items-center justify-center"}`}
          >
            {activeTab === "register" ? (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Crear Cuenta</h2>
                  <p className="text-gray-600">o usa tu correo electrónico para registrarte</p>
                </div>

                <div className="flex justify-center space-x-2 mb-6">
                  <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="sr-only">Google</span>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                      />
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Facebook size={20} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Github size={20} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Linkedin size={20} />
                  </button>
                </div>

                {error && (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                    role="alert"
                  >
                    <span className="block sm:inline">{error}</span>
                  </div>
                )}

                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Nombre"
                      className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Correo Electrónico"
                      className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Contraseña"
                      className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">
                    REGISTRARSE
                  </Button>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-4">¡Bienvenido de Nuevo!</h2>
                <p className="text-center mb-8">
                  Introduce tus datos personales para usar todas las funciones del sitio
                </p>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-red-500"
                  onClick={() => setActiveTab("register")}
                >
                  REGISTRARSE
                </Button>
              </>
            )}
          </div>
        </div>

        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>
    </div>
  )
}
