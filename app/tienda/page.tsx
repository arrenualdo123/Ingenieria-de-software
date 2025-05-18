"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/utils/format"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Vehicle } from "@/lib/supabase"
import { getAllVehicles, filterVehicles } from "@/lib/supabase"

export default function TiendaPage() {
  const [autos, setAutos] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [filtroMarca, setFiltroMarca] = useState<string[]>([])
  const [filtroCategoria, setFiltroCategoria] = useState<string[]>([])
  const [filtroAnio, setFiltroAnio] = useState<number[]>([])
  const [selectedYear, setSelectedYear] = useState<string>("todos")
  const [precioMin, setPrecioMin] = useState<number | "">("")
  const [precioMax, setPrecioMax] = useState<number | "">("")
  const [ordenamiento, setOrdenamiento] = useState<string>("defecto")

  // Obtener datos de marcas, categorías y años de los vehículos
  const [marcas, setMarcas] = useState<string[]>([])
  const [categorias, setCategories] = useState<string[]>([])
  const [anios, setAnios] = useState<number[]>([])

  // Cargar vehículos directamente desde Supabase
  useEffect(() => {
    async function loadVehicles() {
      try {
        setLoading(true)
        const vehicles = await getAllVehicles()
        setAutos(vehicles)

        // Extraer marcas, categorías y años únicos
        const uniqueMarcas = Array.from(new Set(vehicles.map((auto: Vehicle) => auto.marca)))
        const uniqueCategories = Array.from(new Set(vehicles.map((auto: Vehicle) => auto.categoria)))
        const uniqueYears = Array.from(new Set(vehicles.map((auto: Vehicle) => auto.anio))).sort((a, b) => b - a)

        setMarcas(uniqueMarcas as string[])
        setCategories(uniqueCategories as string[])
        setAnios(uniqueYears as number[])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido")
        console.error("Error loading vehicles:", err)
      } finally {
        setLoading(false)
      }
    }

    loadVehicles()
  }, [])

  // Función para manejar los cambios en los filtros de checkbox
  const handleCheckboxChange = (
    value: string | number,
    isChecked: boolean,
    filtro: string[] | number[],
    setFiltro: React.Dispatch<React.SetStateAction<any[]>>,
  ) => {
    if (isChecked) {
      setFiltro([...filtro, value])
    } else {
      setFiltro(filtro.filter((item) => item !== value))
    }
  }

  // Función para manejar el cambio de año en el menú desplegable
  const handleYearChange = (year: string) => {
    setSelectedYear(year)
    if (year === "todos") {
      setFiltroAnio([])
    } else {
      setFiltroAnio([Number.parseInt(year)])
    }
  }

  // Función para manejar el cambio de ordenamiento
  const handleOrdenamientoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrdenamiento(e.target.value)
  }

  // Función para resetear todos los filtros
  const resetFiltros = () => {
    setFiltroMarca([])
    setFiltroCategoria([])
    setFiltroAnio([])
    setSelectedYear("todos")
    setPrecioMin("")
    setPrecioMax("")
    setOrdenamiento("defecto")
  }

  // Aplicar filtros en el cliente
  const aplicarFiltros = async () => {
    try {
      setLoading(true)

      // Crear objeto de filtros
      const filters: {
        marca?: string[]
        categoria?: string[]
        anio?: number[]
        precioMin?: number
        precioMax?: number
      } = {}

      if (filtroMarca.length > 0) filters.marca = filtroMarca
      if (filtroCategoria.length > 0) filters.categoria = filtroCategoria
      if (filtroAnio.length > 0) filters.anio = filtroAnio
      if (precioMin !== "") filters.precioMin = Number(precioMin)
      if (precioMax !== "") filters.precioMax = Number(precioMax)

      // Obtener vehículos filtrados
      const filteredVehicles = await filterVehicles(filters)
      setAutos(filteredVehicles)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al aplicar filtros")
      console.error("Error applying filters:", err)
    } finally {
      setLoading(false)
    }
  }

  // Ordenar los autos según el criterio seleccionado
  let autosFiltrados = [...autos]
  if (ordenamiento === "precio-asc") {
    autosFiltrados = autosFiltrados.sort((a, b) => a.precio - b.precio)
  } else if (ordenamiento === "precio-desc") {
    autosFiltrados = autosFiltrados.sort((a, b) => b.precio - a.precio)
  } else if (ordenamiento === "recientes") {
    autosFiltrados = autosFiltrados.sort((a, b) => b.anio - a.anio)
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-8">Cargando vehículos...</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 dark:border-white mx-auto"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-8">Error</h1>
        <p className="text-red-500">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Intentar de nuevo
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Nuestros Autos</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar de filtros */}
        <div className="lg:w-1/4 sidebar-filters">
          <h2 className="text-xl filter-title mb-4">Filtros</h2>

          <div className="mb-6">
            <h3 className="filter-title mb-2">Marca</h3>
            <div className="space-y-2">
              {marcas.map((marca) => (
                <div key={marca} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`marca-${marca}`}
                    checked={filtroMarca.includes(marca)}
                    onChange={(e) => handleCheckboxChange(marca, e.target.checked, filtroMarca, setFiltroMarca)}
                    className="mr-2"
                  />
                  <label htmlFor={`marca-${marca}`} className="filter-option">
                    {marca}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="filter-title mb-2">Categoría</h3>
            <div className="space-y-2">
              {categorias.map((categoria) => (
                <div key={categoria} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`categoria-${categoria}`}
                    checked={filtroCategoria.includes(categoria)}
                    onChange={(e) =>
                      handleCheckboxChange(categoria, e.target.checked, filtroCategoria, setFiltroCategoria)
                    }
                    className="mr-2"
                  />
                  <label htmlFor={`categoria-${categoria}`} className="filter-option">
                    {categoria}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="filter-title mb-2">Año</h3>
            <Select value={selectedYear} onValueChange={handleYearChange}>
              <SelectTrigger className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600">
                <SelectValue placeholder="Seleccionar año" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:text-white dark:border-gray-700">
                <SelectItem value="todos">Todos los años</SelectItem>
                {anios.map((anio) => (
                  <SelectItem key={anio} value={anio.toString()}>
                    {anio}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mb-6">
            <h3 className="filter-title mb-2">Precio</h3>
            <div className="space-y-3">
              <div>
                <label htmlFor="precio-min" className="block text-sm mb-1 filter-option">
                  Mínimo (MXN)
                </label>
                <input
                  type="number"
                  id="precio-min"
                  value={precioMin}
                  onChange={(e) => setPrecioMin(e.target.value ? Number(e.target.value) : "")}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  min="0"
                />
              </div>
              <div>
                <label htmlFor="precio-max" className="block text-sm mb-1 filter-option">
                  Máximo (MXN)
                </label>
                <input
                  type="number"
                  id="precio-max"
                  value={precioMax}
                  onChange={(e) => setPrecioMax(e.target.value ? Number(e.target.value) : "")}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button onClick={aplicarFiltros} className="w-full bg-red-500 hover:bg-red-600">
              Aplicar filtros
            </Button>
            <Button onClick={resetFiltros} variant="outline" className="w-full dark:border-gray-600 dark:text-white">
              Resetear filtros
            </Button>
          </div>
        </div>

        {/* Grid de productos */}
        <div className="lg:w-3/4">
          <div className="mb-4 flex justify-between items-center">
            <p className="results-count">
              Mostrando {autosFiltrados.length} de {autos.length} resultados
            </p>
            <select
              className="p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
              value={ordenamiento}
              onChange={handleOrdenamientoChange}
            >
              <option value="defecto">Ordenar por defecto</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="recientes">Más recientes</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {autosFiltrados.map((auto) => (
              <div key={auto.id} className="relative group product-container">
                <Link href={`/tienda/${auto.id}`}>
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={auto.imagen || "/car-placeholder.jpg"}
                      alt={auto.nombre}
                      fill
                      className="object-cover"
                    />
                    {auto.etiqueta && (
                      <div className="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 text-sm z-10 rounded">
                        {auto.etiqueta}
                      </div>
                    )}
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{auto.nombre}</h3>
                    <p className="product-price">{formatCurrency(auto.precio)}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {autosFiltrados.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No se encontraron autos que coincidan con los filtros seleccionados.
              </p>
              <Button onClick={resetFiltros} className="mt-4">
                Ver todos los autos
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
