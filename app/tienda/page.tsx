"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/utils/format"

// Datos de ejemplo para los autos
const autos = [
  {
    id: 1,
    nombre: "Lamborghini",
    marca: "Lamborghini",
    categoria: "Deportivo",
    anio: 2023,
    kilometraje: 0,
    precio: 9290000,
    color: "Amarillo y Negro",
    destacado: true,
    etiqueta: "Más vendido",
    imagen: "/productos/lamborghini/lamborghini-urus.jpg",
  },
  {
    id: 2,
    nombre: "Jeep Wrangler",
    marca: "Jeep",
    categoria: "SUV",
    anio: 2023,
    kilometraje: 5000,
    precio: 2000000,
    color: "Blanco",
    destacado: false,
    etiqueta: "",
    imagen: "/productos/jeep-wrangler/jeep-wrangler.jpg",
  },
  {
    id: 3,
    nombre: "Lamborghini Aventador Matte",
    marca: "Aventador S",
    categoria: "Deportivo",
    anio: 2021,
    kilometraje: 15000,
    precio: 900000,
    color: "Gris Matte",
    destacado: false,
    etiqueta: "",
    imagen: "/productos/lamborghini/Lamborghini-Aventador-Matte.jpg",
  },
  {
    id: 4,
    nombre: "Ford Mustang Shelby",
    marca: "Ford",
    categoria: "Deportivo",
    anio: 2023,
    kilometraje: 3000,
    precio: 2500000,
    color: "Rojo",
    destacado: false,
    etiqueta: "",
    imagen: "/productos/ford/Ford-Shelby-GT500.jpg",
  },
  {
    id: 5,
    nombre: "Toyota Supra MK4",
    marca: "A80",
    categoria: "Supra",
    anio: 2023,
    kilometraje: 0,
    precio: 1800000,
    color: "Negro",
    destacado: false,
    etiqueta: "Nuevo",
    imagen: "/productos/toyota-supra-mk4/Supra-MK4-2.jpg",
  },
  {
    id: 6,
    nombre: "Nissan GTR R35",
    marca: "Nissan",
    categoria: "Deportivo",
    anio: 2021,
    kilometraje: 8000,
    precio: 3500000,
    color: "Personalizado",
    destacado: false,
    etiqueta: "",
    imagen: "/productos/nissan/Nissan-GTR-R35.jpg",
  },
  {
    id: 7,
    nombre: "Bugatti Veyron",
    marca: "Bugatti",
    categoria: "SuperDeportivo",
    anio: 2023,
    kilometraje: 0,
    precio: 1950000,
    color: "Beige",
    destacado: false,
    etiqueta: "",
    imagen: "/productos/bugatti/Bugatti-Veyron.jpg",
  },
  {
    id: 8,
    nombre: "Jeep Gladiator",
    marca: "Jeep",
    categoria: "Pickup",
    anio: 2022,
    kilometraje: 12000,
    precio: 1750000,
    color: "Azul",
    destacado: false,
    etiqueta: "",
    imagen: "/jeep-gladiator.jpg",
  },
]

// Opciones para los filtros
const marcas = ["Lamborghini", "Jeep", "Nissan", "Ford", "Mercedes-Benz", "Porsche", "Toyota"]
const categorias = ["Deportivo", "SUV", "Pickup", "Sedán"]
const anios = [2023, 2022, 2021]

export default function TiendaPage() {
  const [filtroMarca, setFiltroMarca] = useState<string[]>([])
  const [filtroCategoria, setFiltroCategoria] = useState<string[]>([])
  const [filtroAnio, setFiltroAnio] = useState<number[]>([])
  const [precioMin, setPrecioMin] = useState<number | "">("")
  const [precioMax, setPrecioMax] = useState<number | "">("")

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

  // Función para resetear todos los filtros
  const resetFiltros = () => {
    setFiltroMarca([])
    setFiltroCategoria([])
    setFiltroAnio([])
    setPrecioMin("")
    setPrecioMax("")
  }

  // Filtrar los autos según los criterios seleccionados
  const autosFiltrados = autos.filter((auto) => {
    // Filtro por marca
    if (filtroMarca.length > 0 && !filtroMarca.includes(auto.marca)) return false

    // Filtro por categoría
    if (filtroCategoria.length > 0 && !filtroCategoria.includes(auto.categoria)) return false

    // Filtro por año
    if (filtroAnio.length > 0 && !filtroAnio.includes(auto.anio)) return false

    // Filtro por precio mínimo
    if (precioMin !== "" && auto.precio < precioMin) return false

    // Filtro por precio máximo
    if (precioMax !== "" && auto.precio > precioMax) return false

    return true
  })

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Nuestros Autos</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar de filtros */}
        <div className="lg:w-1/4 bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-semibold mb-4">Filtros</h2>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Marca</h3>
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
                  <label htmlFor={`marca-${marca}`}>{marca}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Categoría</h3>
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
                  <label htmlFor={`categoria-${categoria}`}>{categoria}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Año</h3>
            <div className="space-y-2">
              {anios.map((anio) => (
                <div key={anio} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`anio-${anio}`}
                    checked={filtroAnio.includes(anio)}
                    onChange={(e) => handleCheckboxChange(anio, e.target.checked, filtroAnio, setFiltroAnio)}
                    className="mr-2"
                  />
                  <label htmlFor={`anio-${anio}`}>{anio}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Precio</h3>
            <div className="space-y-3">
              <div>
                <label htmlFor="precio-min" className="block text-sm mb-1">
                  Mínimo (€)
                </label>
                <input
                  type="number"
                  id="precio-min"
                  value={precioMin}
                  onChange={(e) => setPrecioMin(e.target.value ? Number(e.target.value) : "")}
                  className="w-full p-2 border rounded"
                  min="0"
                />
              </div>
              <div>
                <label htmlFor="precio-max" className="block text-sm mb-1">
                  Máximo (€)
                </label>
                <input
                  type="number"
                  id="precio-max"
                  value={precioMax}
                  onChange={(e) => setPrecioMax(e.target.value ? Number(e.target.value) : "")}
                  className="w-full p-2 border rounded"
                  min="0"
                />
              </div>
            </div>
          </div>

          <Button onClick={resetFiltros} variant="outline" className="w-full">
            Resetear filtros
          </Button>
        </div>

        {/* Grid de productos */}
        <div className="lg:w-3/4">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              Mostrando {autosFiltrados.length} de {autos.length} resultados
            </p>
            <select className="p-2 border rounded">
              <option>Ordenar por defecto</option>
              <option>Precio: menor a mayor</option>
              <option>Precio: mayor a menor</option>
              <option>Más recientes</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {autosFiltrados.map((auto) => (
              <div key={auto.id} className="relative group">
                <Link href={`/tienda/${auto.id}`}>
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={auto.imagen || "/car-placeholder.jpg"}
                      alt={auto.nombre}
                      fill
                      className="object-cover"
                    />
                    {auto.etiqueta && (
                      <div className="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 text-sm z-10">
                        {auto.etiqueta}
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-white">
                    <h3 className="text-lg font-medium">{auto.nombre}</h3>
                    <p className="text-2xl font-bold mt-1">{formatCurrency(auto.precio)}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {autosFiltrados.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
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
