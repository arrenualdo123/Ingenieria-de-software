"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { formatCurrency } from "@/utils/format"
import { useState } from "react"
import { ShoppingCart, Check } from "lucide-react"
import ProductImage from "@/components/product-image"

interface ProductCardProps {
  id?: number
  name: string
  year: number
  km: number
  price: number
  isBestSeller?: boolean
  image?: string
  category?: string
}

export default function ProductCard({
  id = Math.floor(Math.random() * 1000), // Generate random ID if not provided
  name,
  year,
  km,
  price,
  isBestSeller = false,
  image = "/car-placeholder.png",
  category,
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
        image: image || "/car-placeholder.png", // Asegurar que siempre haya una imagen
      })

      // Show added confirmation
      setIsAdded(true)
      setTimeout(() => setIsAdded(false), 2000)
    }
  }

  return (
    <div className="relative group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 product-container">
      {isBestSeller && (
        <div className="absolute top-2 left-2 bg-gray-800 dark:bg-gray-700 text-white px-2 py-1 text-sm z-10 rounded">
          Más vendido
        </div>
      )}
      <div className="relative h-64 w-full overflow-hidden">
        <ProductImage
          src={image || "/car-placeholder.png"}
          alt={name}
          category={category}
          className="group-hover:scale-105 transition-transform duration-300 h-full w-full"
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-details" suppressHydrationWarning>
          {year} • {km.toLocaleString("es-ES")} km
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="product-price" suppressHydrationWarning>
            {formatCurrency(price)}
          </span>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddToCart}
              className={
                isAdded
                  ? "bg-green-50 text-green-600 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800"
                  : "dark:border-gray-600 dark:text-white"
              }
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
            <Link href={`/tienda/${id}`}>
              <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-white">
                Ver detalles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
