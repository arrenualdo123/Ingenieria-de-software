"use client"

import { useState } from "react"
import Image from "next/image"

interface ProductImageProps {
  src: string
  alt: string
  category?: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
}

export default function ProductImage({
  src,
  alt,
  category = "car",
  width = 500,
  height = 300,
  priority = false,
  className = "",
}: ProductImageProps) {
  const [error, setError] = useState(false)

  // Usar la imagen proporcionada o un placeholder si hay error
  const imageSrc = error ? getPlaceholderImage(category) : getImagePath(src)

  return (
    <div className={`relative ${className}`}>
      <Image
        src={imageSrc || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className="object-cover w-full h-full"
        priority={priority}
        onError={() => setError(true)}
      />
    </div>
  )
}

/**
 * Utilidad para manejar rutas de imágenes
 */
function getImagePath(path: string): string {
  // Si la ruta comienza con http o https, es una URL externa
  if (path.startsWith("http")) {
    return path
  }

  // Asegurarse de que la ruta comience con /
  if (!path.startsWith("/")) {
    path = `/${path}`
  }

  return path
}

/**
 * Obtiene una imagen de placeholder si la imagen original no existe
 */
function getPlaceholderImage(category = "car"): string {
  const placeholders: Record<string, string> = {
    car: "/car-placeholder.png",
    sedan: "/sedan.png",
    suv: "/suv.png",
    deportivo: "/deportivo.png",
    pickup: "/nissan-frontier.png",
    electrico: "/electrico.png",
  }

  return placeholders[category.toLowerCase()] || placeholders.car
}
