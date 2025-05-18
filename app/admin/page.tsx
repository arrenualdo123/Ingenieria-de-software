"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Users, ShoppingBag, CreditCard, TrendingUp, DollarSign } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

interface RecentSale {
  id: number
  vehicle: string
  customer: string
  amount: number
  date: string
}

interface TopVehicle {
  id: number
  name: string
  sales: number
  revenue: number
}

interface DashboardStats {
  totalVehicles: number
  totalUsers: number
  totalOrders: number
  totalRevenue: number
  recentSales: RecentSale[]
  topVehicles: TopVehicle[]
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalVehicles: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentSales: [],
    topVehicles: [],
  })

  useEffect(() => {
    // En un entorno real, aquí cargaríamos los datos desde la API
    // Por ahora, usamos datos de ejemplo
    setStats({
      totalVehicles: 24,
      totalUsers: 156,
      totalOrders: 38,
      totalRevenue: 128500,
      recentSales: [
        { id: 1, vehicle: "BMW Serie 3", customer: "Juan Pérez", amount: 35000, date: "2023-05-10" } as const,
        { id: 2, vehicle: "Mercedes Clase C", customer: "María López", amount: 42000, date: "2023-05-08" } as const,
        { id: 3, vehicle: "Audi A4", customer: "Carlos Rodríguez", amount: 38000, date: "2023-05-05" } as const,
      ] as const,
      topVehicles: [
        { id: 1, name: "BMW Serie 3", sales: 5, revenue: 175000 } as const,
        { id: 2, name: "Toyota RAV4", sales: 4, revenue: 128000 } as const,
        { id: 3, name: "Mercedes Clase C", sales: 3, revenue: 126000 } as const,
      ] as const,
    })
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Vehículos</CardTitle>
            <Car className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVehicles}</div>
            <p className="text-xs text-gray-500">Total de vehículos en inventario</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Usuarios</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-gray-500">Usuarios registrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
            <ShoppingBag className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-gray-500">Pedidos realizados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
            <CreditCard className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-gray-500">Ingresos totales</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Ventas recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {stats.recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <DollarSign className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{sale.vehicle}</p>
                      <p className="text-sm text-gray-500">{sale.date}</p>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-gray-500">{sale.customer}</p>
                      <p className="font-medium">${sale.amount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vehículos más vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {stats.topVehicles.map((vehicle) => (
                <div key={vehicle.id} className="flex items-center">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <Car className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{vehicle.name}</p>
                      <div className="flex items-center text-green-500">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="text-sm">{vehicle.sales} ventas</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-gray-500">Ingresos generados</p>
                      <p className="font-medium">${vehicle.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
