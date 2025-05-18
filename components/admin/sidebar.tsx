"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Car,
  Users,
  ShoppingBag,
  Settings,
  BarChart2,
  FileText,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  LogOut,
} from "lucide-react"
import { useAuth } from "@/context/AuthContext"

export default function AdminSidebar() {
  const pathname = usePathname()
  const { signOut } = useAuth()
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    vehiculos: true,
    usuarios: false,
    ventas: false,
  })

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }))
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 h-screen overflow-y-auto fixed">
      <div className="p-6">
        <Link href="/admin" className="flex items-center">
          <span className="text-2xl font-bold text-red-500">TAS</span>
          <span className="text-2xl font-bold ml-1 dark:text-white">Admin</span>
        </Link>
      </div>

      <nav className="mt-6">
        <div className="px-4 py-2">
          <Link
            href="/admin"
            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg ${
              isActive("/admin")
                ? "bg-red-50 text-red-600 dark:bg-gray-700 dark:text-red-400"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <Home className="h-5 w-5 mr-3" />
            Dashboard
          </Link>
        </div>

        {/* Vehículos */}
        <div className="px-4 py-2">
          <button
            onClick={() => toggleMenu("vehiculos")}
            className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <div className="flex items-center">
              <Car className="h-5 w-5 mr-3" />
              Vehículos
            </div>
            {openMenus.vehiculos ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>

          {openMenus.vehiculos && (
            <div className="mt-1 ml-4 pl-6 border-l border-gray-200 dark:border-gray-700">
              <Link
                href="/admin/vehiculos"
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  isActive("/admin/vehiculos")
                    ? "bg-red-50 text-red-600 dark:bg-gray-700 dark:text-red-400"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                Todos los vehículos
              </Link>
              <Link
                href="/admin/vehiculos/nuevo"
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  isActive("/admin/vehiculos/nuevo")
                    ? "bg-red-50 text-red-600 dark:bg-gray-700 dark:text-red-400"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                Añadir vehículo
              </Link>
              <Link
                href="/admin/categorias"
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  isActive("/admin/categorias")
                    ? "bg-red-50 text-red-600 dark:bg-gray-700 dark:text-red-400"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                Categorías
              </Link>
            </div>
          )}
        </div>

        {/* Usuarios */}
        <div className="px-4 py-2">
          <button
            onClick={() => toggleMenu("usuarios")}
            className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-3" />
              Usuarios
            </div>
            {openMenus.usuarios ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>

          {openMenus.usuarios && (
            <div className="mt-1 ml-4 pl-6 border-l border-gray-200 dark:border-gray-700">
              <Link
                href="/admin/usuarios"
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  isActive("/admin/usuarios")
                    ? "bg-red-50 text-red-600 dark:bg-gray-700 dark:text-red-400"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                Todos los usuarios
              </Link>
              <Link
                href="/admin/roles"
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  isActive("/admin/roles")
                    ? "bg-red-50 text-red-600 dark:bg-gray-700 dark:text-red-400"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                Roles y permisos
              </Link>
            </div>
          )}
        </div>

        {/* Ventas */}
        <div className="px-4 py-2">
          <button
            onClick={() => toggleMenu("ventas")}
            className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <div className="flex items-center">
              <ShoppingBag className="h-5 w-5 mr-3" />
              Ventas
            </div>
            {openMenus.ventas ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>

          {openMenus.ventas && (
            <div className="mt-1 ml-4 pl-6 border-l border-gray-200 dark:border-gray-700">
              <Link
                href="/admin/pedidos"
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  isActive("/admin/pedidos")
                    ? "bg-red-50 text-red-600 dark:bg-gray-700 dark:text-red-400"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                Pedidos
              </Link>
              <Link
                href="/admin/pagos"
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  isActive("/admin/pagos")
                    ? "bg-red-50 text-red-600 dark:bg-gray-700 dark:text-red-400"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                Pagos
              </Link>
              <Link
                href="/admin/promociones"
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  isActive("/admin/promociones")
                    ? "bg-red-50 text-red-600 dark:bg-gray-700 dark:text-red-400"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                Promociones
              </Link>
            </div>
          )}
        </div>

        {/* Otros enlaces */}
        <div className="px-4 py-2">
          <Link
            href="/admin/estadisticas"
            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg ${
              isActive("/admin/estadisticas")
                ? "bg-red-50 text-red-600 dark:bg-gray-700 dark:text-red-400"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <BarChart2 className="h-5 w-5 mr-3" />
            Estadísticas
          </Link>
        </div>

        <div className="px-4 py-2">
          <Link
            href="/admin/blog"
            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg ${
              isActive("/admin/blog")
                ? "bg-red-50 text-red-600 dark:bg-gray-700 dark:text-red-400"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FileText className="h-5 w-5 mr-3" />
            Blog
          </Link>
        </div>

        <div className="px-4 py-2">
          <Link
            href="/admin/mensajes"
            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg ${
              isActive("/admin/mensajes")
                ? "bg-red-50 text-red-600 dark:bg-gray-700 dark:text-red-400"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <MessageSquare className="h-5 w-5 mr-3" />
            Mensajes
          </Link>
        </div>

        <div className="px-4 py-2">
          <Link
            href="/admin/configuracion"
            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg ${
              isActive("/admin/configuracion")
                ? "bg-red-50 text-red-600 dark:bg-gray-700 dark:text-red-400"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <Settings className="h-5 w-5 mr-3" />
            Configuración
          </Link>
        </div>

        <div className="px-4 py-2 mt-6">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-gray-700"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Cerrar sesión
          </button>
        </div>
      </nav>
    </div>
  )
}
