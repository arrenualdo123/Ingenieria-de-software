"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2, ChevronLeft, ChevronRight, Car, ArrowUpDown, Filter, Loader2 } from "lucide-react"
import { formatCurrency } from "@/utils/format"
import { getAllVehicles, type Vehicle } from "@/lib/supabase"
import { supabase } from "@/lib/supabase"

export default function AdminVehiclesPage() {
  const router = useRouter()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar vehículos
  useEffect(() => {
    async function loadVehicles() {
      try {
        setIsLoading(true)
        const vehiclesData = await getAllVehicles()
        setVehicles(vehiclesData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar los vehículos")
        console.error("Error loading vehicles:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadVehicles()
  }, [])

  // Filtrar vehículos según término de búsqueda
  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.categoria.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este vehículo?")) {
      try {
        setIsLoading(true)

        // Eliminar el vehículo de Supabase
        const { error } = await supabase.from("vehicles").delete().eq("id", id)

        if (error) {
          throw error
        }

        // Actualizar el estado local
        setVehicles(vehicles.filter((vehicle) => vehicle.id !== id))
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al eliminar el vehículo")
        console.error("Error deleting vehicle:", err)
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (isLoading && vehicles.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Cargando vehículos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Intentar de nuevo</Button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Administración de Vehículos</h1>
        <Button onClick={() => router.push("/admin/vehiculos/nuevo")} className="bg-red-500 hover:bg-red-600">
          <Plus size={16} className="mr-2" /> Añadir vehículo
        </Button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Buscar por nombre, marca, categoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center">
              <Filter size={16} className="mr-2" /> Filtros
            </Button>
            <Button variant="outline" className="flex items-center">
              <ArrowUpDown size={16} className="mr-2" /> Ordenar
            </Button>
          </div>
        </div>
      </div>

      {/* Tabla de vehículos */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Vehículo
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Detalles
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Precio
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Estado
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-16 w-24 flex-shrink-0 relative">
                          <Image
                            src={vehicle.imagen || "/car-placeholder.jpg"}
                            alt={vehicle.nombre}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{vehicle.nombre}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {vehicle.marca} - {vehicle.categoria}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{vehicle.anio}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {vehicle.kilometraje.toLocaleString()} km
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(vehicle.precio)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          vehicle.stock && vehicle.stock > 0
                            ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {vehicle.stock && vehicle.stock > 0 ? "Disponible" : "Agotado"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/admin/vehiculos/editar/${vehicle.id}`)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(vehicle.id)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                    <Car className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-2" />
                    <p>No se encontraron vehículos</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Mostrando <span className="font-medium">{filteredVehicles.length}</span> de{" "}
            <span className="font-medium">{vehicles.length}</span> vehículos
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft size={16} className="mr-1" /> Anterior
            </Button>
            <Button variant="outline" size="sm" disabled>
              Siguiente <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
