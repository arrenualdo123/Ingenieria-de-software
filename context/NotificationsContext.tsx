"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Definir el tipo de notificación
export interface Notification {
  id: string
  type: "purchase" | "system" | "info"
  title: string
  message: string
  date: Date
  read: boolean
  data?: {
    orderNumber?: string
    total?: number
  }
}

interface NotificationsContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "date" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearAll: () => void
}

// Crear un valor por defecto para el contexto para evitar el undefined
const defaultContextValue: NotificationsContextType = {
  notifications: [],
  unreadCount: 0,
  addNotification: () => {},
  markAsRead: () => {},
  markAllAsRead: () => {},
  clearAll: () => {},
}

const NotificationsContext = createContext<NotificationsContextType>(defaultContextValue)

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [mounted, setMounted] = useState(false)

  // Cargar notificaciones del localStorage al montar el componente
  useEffect(() => {
    try {
      setMounted(true)
      const storedNotifications = localStorage.getItem("notifications")

      if (storedNotifications) {
        // Convertir las fechas de string a Date
        const parsedNotifications = JSON.parse(storedNotifications)
        const notificationsWithDates = parsedNotifications.map((n: any) => ({
          ...n,
          date: new Date(n.date),
        }))
        setNotifications(notificationsWithDates)
      }
    } catch (error) {
      console.error("Error al cargar notificaciones:", error)
      // No establecer notificaciones en caso de error
    }
  }, [])

  // Guardar notificaciones en localStorage cuando cambien
  useEffect(() => {
    if (mounted) {
      try {
        console.log("Guardando notificaciones en localStorage:", notifications)
        localStorage.setItem("notifications", JSON.stringify(notifications))
      } catch (error) {
        console.error("Error al guardar notificaciones:", error)
      }
    }
  }, [notifications, mounted])

  // Calcular el número de notificaciones no leídas
  const unreadCount = notifications.filter((n) => !n.read).length

  // Añadir una nueva notificación
  const addNotification = (notification: Omit<Notification, "id" | "date" | "read">) => {
    console.log("Añadiendo notificación:", notification)
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      date: new Date(),
      read: false,
    }

    setNotifications((prev) => {
      const updatedNotifications = [newNotification, ...prev]
      console.log("Notificaciones actualizadas:", updatedNotifications)
      return updatedNotifications
    })
  }

  // Marcar una notificación como leída
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Marcar todas las notificaciones como leídas
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  // Eliminar todas las notificaciones
  const clearAll = () => {
    setNotifications([])
  }

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearAll,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider")
  }
  return context
}
