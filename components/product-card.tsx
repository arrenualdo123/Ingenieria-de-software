"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { formatCurrency } from "@/utils/format"
import { useState } from "react"
import { ShoppingCart, Check } from "lucide-react"

interface ProductCardProps {
  id?: number
  name: string
  year: number
  km: number
  price: number
  isBestSeller?: boolean
  image?: string
}

export default function ProductCard({
  id = Math.floor(Math.random() * 1000), // Generate random ID if not provided
  name,
  year,
  km,
  price,
  isBestSeller = false,
  image = "/car-placeholder.jpg",
}: ProductCardProps) {
  const { addToCart } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    if (typeof window !== "undefined") {
      // Verificar que estamos en el cliente
      addToCart({
        id,
        name,
        year,
        km,
        price,
        image: image || "/car-placeholder.jpg", // Asegurar que siempre haya una imagen
      })

      // Show added confirmation
      setIsAdded(true)
      setTimeout(() => setIsAdded(false), 2000)
    }
  }

  return (
    <div className="relative group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {isBestSeller && (
        <div className="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 text-sm z-10 rounded">Más vendido</div>
      )}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={image || "/car-placeholder.jpg"}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 border border-t-0">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-600" suppressHydrationWarning>
          {year} • {km.toLocaleString("es-ES")} km
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold" suppressHydrationWarning>
            {formatCurrency(price)}
          </span>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddToCart}
              className={isAdded ? "bg-green-50 text-green-600 border-green-200" : ""}
            >
              {isAdded ? (
                <>
                  <Check size={16} className="mr-1" /> Añadido
                </>
              ) : (
                <>
                  <ShoppingCart size={16} className="mr-1" /> Añadir
                </>
              )}
            </Button>
            <Button variant="outline" size="sm">
              Ver detalles
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
