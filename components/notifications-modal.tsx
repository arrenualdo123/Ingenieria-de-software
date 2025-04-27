"use client"
import { X, ShoppingBag, Bell, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { formatCurrency } from "@/utils/format"
import type { Notification } from "@/context/NotificationsContext"

interface NotificationsModalProps {
  isOpen: boolean
  onClose: () => void
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
  onMarkAllAsRead: () => void
  onClearAll: () => void
}

export default function NotificationsModal({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
}: NotificationsModalProps) {
  if (!isOpen) return null

  // Asegurarse de que notifications es un array
  const safeNotifications = Array.isArray(notifications) ? notifications : []
  const unreadCount = safeNotifications.filter((n) => !n.read).length

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay semi-transparente */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* Panel de notificaciones */}
      <div className="relative w-full max-w-md bg-white h-full overflow-auto shadow-xl flex flex-col animate-slide-in-right">
        <div className="p-4 border-b flex justify-between items-center bg-gray-800 text-white">
          <h2 className="text-xl font-bold flex items-center">
            <Bell className="mr-2 h-5 w-5" /> Notificaciones
          </h2>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 border-b flex justify-between items-center bg-gray-100">
          <div>
            {unreadCount > 0 ? (
              <span className="text-sm font-medium">Tienes {unreadCount} notificaciones sin leer</span>
            ) : (
              <span className="text-sm text-gray-500">No hay notificaciones nuevas</span>
            )}
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={onMarkAllAsRead} disabled={unreadCount === 0}>
              Marcar todo como leído
            </Button>
            <Button variant="ghost" size="sm" onClick={onClearAll} disabled={safeNotifications.length === 0}>
              Borrar todo
            </Button>
          </div>
        </div>

        <div className="flex-grow overflow-auto">
          {safeNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <Bell className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No hay notificaciones</h3>
              <p className="text-gray-500">
                Las notificaciones aparecerán aquí cuando realices compras o recibas actualizaciones.
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {safeNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${!notification.read ? "bg-blue-50" : ""}`}
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  <div className="flex">
                    <div className="flex-shrink-0 mr-3">
                      {notification.type === "purchase" ? (
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <ShoppingBag className="h-5 w-5 text-green-600" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Bell className="h-5 w-5 text-blue-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(notification.date).toLocaleDateString()}{" "}
                          {new Date(notification.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{notification.message}</p>

                      {notification.type === "purchase" && notification.data?.orderNumber && (
                        <div className="mt-2 flex flex-col space-y-1">
                          <Link
                            href={`/mi-cuenta/pedidos/${notification.data.orderNumber}`}
                            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                          >
                            <span>Ver detalles del pedido</span>
                            {notification.data.total && (
                              <span className="ml-2 text-gray-600">({formatCurrency(notification.data.total)})</span>
                            )}
                          </Link>
                          <Link
                            href={`/envio/${notification.data.orderNumber.replace(/[^a-zA-Z0-9-]/g, "")}`}
                            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                          >
                            <Truck size={14} className="mr-1" /> Seguir envío
                          </Link>
                        </div>
                      )}
                    </div>
                    {!notification.read && (
                      <div className="ml-2 flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
