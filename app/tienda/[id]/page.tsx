"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/hooks/use-cart"
import { formatCurrency } from "@/utils/format"
import { ShoppingCart, Heart, Share2, Check } from 'lucide-react'
import { getVehicleById, type Vehicle } from "@/lib/supabase"

export default function VehicleDetailPage() {
  const params = useParams()
  const vehicleId = Number(params.id)
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { addToCart } = useCart()

  useEffect(() => {
    async function loadVehicle() {
      try {
        setIsLoading(true)
        const vehicleData = await getVehicleById(vehicleId)

        if (!vehicleData) {
          throw new Error("Vehículo no encontrado")
        }

        setVehicle(vehicleData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido")
        console.error("Error loading vehicle:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadVehicle()
  }, [vehicleId])

  const handleAddToCart = () => {
    if (vehicle) {
      addToCart({
        id: vehicle.id,
        name: vehicle.nombre,
        price: vehicle.precio,
        year: vehicle.anio,
        km: vehicle.kilometraje,
        image: vehicle.imagen,
      })
      setIsAddedToCart(true)
      setTimeout(() => setIsAddedToCart(false), 2000)
    }
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const changeImage = (index: number) => {
    if (vehicle?.imagenes && index >= 0 && index < vehicle.imagenes.length) {
      setCurrentImageIndex(index)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
        <p className="mt-4 text-lg">Cargando información del vehículo...</p>
      </div>
    )
  }

  if (error || !vehicle) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Vehículo no encontrado</h1>
        <p className="mb-8">{error || "Lo sentimos, no pudimos encontrar el vehículo que estás buscando."}</p>
        <Button onClick={() => window.history.back()}>Volver</Button>
      </div>
    )
  }

  // Obtener la imagen actual
  const currentImage =
    vehicle.imagenes && vehicle.imagenes.length > 0 ? vehicle.imagenes[currentImageIndex] : vehicle.imagen

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Galería de imágenes */}
        <div className="space-y-4">
          <div className="relative h-96 w-full rounded-lg overflow-hidden">
            <Image
              src={currentImage || "/car-placeholder.jpg"}
              alt={vehicle.nombre}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Miniaturas */}
          {vehicle.imagenes && vehicle.imagenes.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {vehicle.imagenes.map((image: string, index: number) => (
                <button
                  key={index}
                  className={`w-24 h-16 relative flex-shrink-0 rounded overflow-hidden ${
                    currentImageIndex === index ? "ring-2 ring-red-500" : ""
                  }`}
                  onClick={() => changeImage(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${vehicle.nombre} - Imagen ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Información del vehículo */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{vehicle.nombre}</h1>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold text-gray-900">{formatCurrency(vehicle.precio)}</span>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <span className="text-sm text-gray-500">Año</span>
              <p className="font-medium">{vehicle.anio}</p>
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <span className="text-sm text-gray-500">Kilometraje</span>
              <p className="font-medium">{vehicle.kilometraje.toLocaleString()} km</p>
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <span className="text-sm text-gray-500">Categoría</span>
              <p className="font-medium">{vehicle.categoria}</p>
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <span className="text-sm text-gray-500">Color</span>
              <p className="font-medium">{vehicle.color}</p>
            </div>
          </div>

          <p className="text-gray-700 mb-6">{vehicle.descripcion}</p>

          <div className="flex flex-wrap gap-3 mb-8">
            <Button onClick={handleAddToCart} className="flex-1 bg-gray-800 hover:bg-gray-700">
              {isAddedToCart ? (
                <>
                  <Check className="mr-2 h-5 w-5" /> Añadido
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" /> Añadir al carrito
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={toggleFavorite}
              className={isFavorite ? "text-red-500 border-red-500" : ""}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
            </Button>
            <Button variant="outline">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Pestañas de información adicional */}
      <div className="mt-12">
        <Tabs defaultValue="features">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="features">Características</TabsTrigger>
            <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
            <TabsTrigger value="financing">Financiación</TabsTrigger>
          </TabsList>
          <TabsContent value="features" className="p-6 border rounded-b-lg">
            <h3 className="text-xl font-semibold mb-4">Características destacadas</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {vehicle.caracteristicas &&
                vehicle.caracteristicas.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2 h-1.5 w-1.5 rounded-full bg-gray-800"></span>
                    {feature}
                  </li>
                ))}
            </ul>
          </TabsContent>
          <TabsContent value="specifications" className="p-6 border rounded-b-lg">
            <h3 className="text-xl font-semibold mb-4">Especificaciones técnicas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vehicle.especificaciones &&
                Object.entries(vehicle.especificaciones).map(([key, value]) => (
                  <div key={key} className="border-b pb-2">
                    <span className="text-gray-500 capitalize">{key}:</span>{" "}
                    <span className="font-medium">{value as string}</span>
                  </div>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="financing" className="p-6 border rounded-b-lg">
            <h3 className="text-xl font-semibold mb-4">Opciones de financiación</h3>
            <p className="mb-4">
              Ofrecemos varias opciones de financiación para que puedas adquirir tu vehículo de la manera que mejor se
              adapte a tus necesidades.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Financiación estándar</h4>
              <p className="text-sm text-gray-600 mb-2">
                Desde {formatCurrency(Math.round(vehicle.precio / 60))} al mes en 60 cuotas
              </p>
              <Button variant="outline" size="sm">
                Calcular cuota
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
