"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { formatCurrency } from "@/utils/format"

// Definición de tipos para evitar errores de TypeScript
interface Auto {
  id: number
  nombre: string
  modelo: string
  marca: string
  categoria: string
  anio: number
  kilometraje: number
  precio: number
  color: string
  destacado: boolean
  etiqueta: string
  imagen: string
  imagenes: string[]
  sku: string
  descripcion: string
}

interface ProductImageProps {
  src: string
  alt: string
  className?: string
}

// Componente para la imagen principal con manejo de errores
function ProductImage({ src, alt, className }: ProductImageProps) {
  const [error, setError] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)

  useEffect(() => {
    setImageSrc(src)
    setError(false)
  }, [src])

  const handleError = () => {
    console.error(`Error al cargar la imagen: ${src}`)
    setError(true)
    setImageSrc("/car-placeholder.jpg")
  }

  return <img src={error ? "/car-placeholder.jpg" : imageSrc} alt={alt} className={className} onError={handleError} />
}

// Datos de ejemplo para los autos
const autos: Auto[] = [
  {
    id: 1,
    nombre: "Lamborghini",
    modelo: "Urus",
    marca: "Lamborghini",
    categoria: "Deportivo",
    anio: 2023,
    kilometraje: 0,
    precio: 9290000,
    color: "Amarillo y Negro",
    destacado: true,
    etiqueta: "Más vendido",
    imagen: "/productos/lamborghini/lamborghini-urus.jpg",
    imagenes: [
      "/productos/lamborghini/lamborghini-urus.jpg",
      "/productos/lamborghini/lamborghini-urus1.jpg",
      "/productos/lamborghini/lamborghini-urus2.jpg",
      "/productos/lamborghini/lamborghini-urus3.jpg",
    ],
    sku: "001",
    descripcion:
      "Presentamos este Lamborghini Urus con un impactante diseño en amarillo y negro, una combinación que refleja su carácter agresivo y sofisticado. Este no solo es un vehículo, es una experiencia. Perfecto para quienes buscan la máxima adrenalina con el lujo que solo Lamborghini puede ofrecer.",
  },
  {
    id: 2,
    nombre: "Jeep Wrangler",
    modelo: "Rubicon",
    marca: "Jeep",
    categoria: "SUV",
    anio: 2023,
    kilometraje: 5000,
    precio: 2000000,
    color: "Blanco",
    destacado: false,
    etiqueta: "",
    imagen: "/productos/jeep-wrangler/jeep-wrangler.jpg",
    imagenes: [
      "/productos/jeep-wrangler/jeep-wrangler.jpg",
      "/productos/jeep-wrangler/jeep-wrangler1.jpg",
    ],
    sku: "002",
    descripcion:
      "Este Jeep Wrangler Rubicon personalizado combina la robustez característica de Jeep con detalles de lujo. Equipado con neumáticos todoterreno de alto rendimiento y rines dorados que le dan un aspecto único. Perfecto para aventuras extremas sin renunciar al estilo.",
  },
  {
    id: 3,
    nombre: "Lamborghini Aventador Matte",
    modelo: "Aventador S",
    marca: "Lamborghini",
    categoria: "Deportivo",
    anio: 2021,
    kilometraje: 15000,
    precio: 900000,
    color: "Gris Matte",
    destacado: false,
    etiqueta: "",
    imagen: "/productos/lamborghini/Lamborghini-Aventador-Matte.jpg",
    imagenes: [
      "/productos/lamborghini/Lamborghini-Aventador-Matte.jpg",
      "/productos/lamborghini/Lamborghini-Aventador-Matte1.jpg",
      "/productos/lamborghini/Lamborghini-Aventador-Matte2.jpg",
      "/productos/lamborghini/Lamborghini-Aventador-Matte3.jpg",
    ],
    sku: "003",
    descripcion:
      "Permítanos presentarle el superdeportivo producido por el mundialmente conocido fabricante de automóviles Lamborghini. La serie Aventador se considera icónica y se destaca entre las demás.",
  },
  {
    id: 4,
    nombre: "Ford Mustang Shelby",
    modelo: "GT500",
    marca: "Ford",
    categoria: "Deportivo",
    anio: 2023,
    kilometraje: 3000,
    precio: 2500000,
    color: "Rojo",
    destacado: false,
    etiqueta: "",
    imagen: "/productos/ford/Ford-Shelby-GT500.jpg",
    imagenes: [
      "/productos/ford/Ford-Shelby-GT500.jpg",
      "/productos/ford/Ford-Shelby-GT5001.jpg",
      "/productos/ford/Ford-Shelby-GT5002.jpg",
    ],
    sku: "004",
    descripcion:
      "Ford F-150 Raptor en acabado negro mate con detalles personalizados. Esta bestia combina la potencia característica de la línea Raptor con un aspecto intimidante y exclusivo. Perfecta para quienes buscan una pickup de alto rendimiento con presencia imponente.",
  },
  {
    id: 5,
    nombre: "Toyota Supra MK4",
    modelo: "A80",
    marca: "Toyota",
    categoria: "Supra",
    anio: 2023,
    kilometraje: 0,
    precio: 1800000,
    color: "Negro",
    destacado: false,
    etiqueta: "Nuevo",
    imagen: "/productos/toyota-supra-mk4/Supra-MK4-2.jpg",
    imagenes: [
      "/productos/toyota-supra-mk4/Supra-MK4-2.jpg",
      "/productos/toyota-supra-mk4/Supra-MK4-2-1.jpg",
      "/productos/toyota-supra-mk4/Supra-MK4-2-2.jpg",
    ],
    sku: "005",
    descripcion:
      "Experimenta la máxima potencia y estilo con este impresionante Toyota Supra MK4, transformado con un diseño Hycade Widebody. Su agresiva estética en negro brillante, aerodinámica mejorada y detalles personalizados.",
  },
  {
    id: 6,
    nombre: "Nissan GTR R35",
    modelo: "R35",
    marca: "Nissan",
    categoria: "Deportivo",
    anio: 2021,
    kilometraje: 8000,
    precio: 3500000,
    color: "Perzonalizado",
    destacado: false,
    etiqueta: "",
    imagen: "/productos/nissan/Nissan-GTR-R35.jpg",
    imagenes: [
      "/productos/nissan/Nissan-GTR-R35.jpg", 
      "/productos/nissan/Nissan-GTR-R351.jpg", 
      "/productos/nissan/Nissan-GTR-R352.jpg", 
    ],
    sku: "006",
    descripcion:
      "Si buscas un auto que combine potencia extrema y tecnología de precisión, el Nissan GT-R R35 es para ti. Conocido como “Godzilla”, este deportivo japonés está diseñado para brindar emociones al límite.",
  },
  {
    id: 7,
    nombre: "Bugatti Veyron",
    modelo: "Veyron",
    marca: "Bugatti",
    categoria: "SuperDeportivo",
    anio: 2010,
    kilometraje: 0,
    precio: 1950000,
    color: "Negro con Naranja",
    destacado: false,
    etiqueta: "",
    imagen: "/productos/bugatti/Bugatti-Veyron.jpg",
    imagenes: [
      "/productos/bugatti/Bugatti-Veyron.jpg",
      "/productos/bugatti/Bugatti-Veyron1.jpg",
      "/productos/bugatti/Bugatti-Veyron2.jpg",
    ],
    sku: "007",
    descripcion:
      "Su debut se dio en el año de 2010, ostentando mejoras en temas de aerodinámica y aumentando su potencia hasta los 1,183 caballos de fuerza. Esto lo hacía capaz de alcanzar el 0 a 100 km/h en los mismos 2.5 segundos, pero con una nueva velocidad máxima que rondaba los 415 km/h. ",
  },
  {
    id: 8,
    nombre: "Jeep Gladiator",
    modelo: "Rubicon",
    marca: "Jeep",
    categoria: "Pickup",
    anio: 2022,
    kilometraje: 12000,
    precio: 1750000,
    color: "Azul",
    destacado: false,
    etiqueta: "",
    imagen: "/jeep-gladiator.jpg",
    imagenes: [
      "/jeep-gladiator.jpg",
      "/productos/jeep-gladiator/1.jpg",
      "/productos/jeep-gladiator/2.jpg",
      "/productos/jeep-gladiator/3.jpg",
    ],
    sku: "008",
    descripcion:
      "Jeep Gladiator Rubicon en un llamativo azul eléctrico. Esta pickup combina la versatilidad de una caja de carga con la capacidad todoterreno de un Wrangler. Modificada con accesorios premium para maximizar su rendimiento en cualquier terreno.",
  },
]

export default function ProductoDetalle() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const [cantidad, setCantidad] = useState(1)
  const [imagenSeleccionada, setImagenSeleccionada] = useState(0)
  const [auto, setAuto] = useState<Auto | null>(null) // Especificar el tipo correctamente

  // Obtener el ID del producto de los parámetros de la URL
  const id = Number(params.id)

  useEffect(() => {
    // Encontrar el auto correspondiente
    const foundAuto = autos.find((a) => a.id === id)
    setAuto(foundAuto || null) // Asegurarse de que sea Auto | null

    // Si no se encuentra el auto, redirigir a la tienda
    if (!foundAuto) {
      router.push("/tienda")
    }
  }, [id, router])

  const handleDecreaseCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1)
    }
  }

  const handleIncreaseCantidad = () => {
    setCantidad(cantidad + 1)
  }

  const handleAddToCart = () => {
    if (auto) {
      addToCart(
        {
          id: auto.id,
          name: auto.nombre,
          year: auto.anio,
          km: auto.kilometraje,
          price: auto.precio,
          image: auto.imagen,
        },
        cantidad,
      )
    }
  }

  // Cambiar la imagen seleccionada
  const cambiarImagen = (index: number) => {
    setImagenSeleccionada(index)
  }

  // Si no hay auto, no renderizar nada o mostrar un loader
  if (!auto) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
      </div>
    )
  }

  // Encontrar el índice del auto actual
  const currentIndex = autos.findIndex((a) => a.id === id)
  const prevAuto = currentIndex > 0 ? autos[currentIndex - 1] : null
  const nextAuto = currentIndex < autos.length - 1 ? autos[currentIndex + 1] : null

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumb */}
      <div className="mb-6 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          <Link href="/" className="hover:underline">
            Inicio
          </Link>
          {" > "}
          <Link href="/tienda" className="hover:underline">
            Todos los productos
          </Link>
          {" > "}
          <span>{auto.nombre}</span>
        </div>
        <div className="flex space-x-4">
          {prevAuto && (
            <Link href={`/tienda/${prevAuto.id}`} className="text-gray-600 hover:text-gray-900 flex items-center">
              <ChevronLeft size={16} className="mr-1" /> Anterior
            </Link>
          )}
          {nextAuto && (
            <Link href={`/tienda/${nextAuto.id}`} className="text-gray-600 hover:text-gray-900 flex items-center">
              Siguiente <ChevronRight size={16} className="ml-1" />
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imágenes del producto */}
        <div>
          {/* Imagen principal */}
          <div className="relative h-[500px] w-full mb-4 border bg-gray-100 flex items-center justify-center">
            <ProductImage
              src={auto.imagenes[imagenSeleccionada] || "/car-placeholder.jpg"}
              alt={auto.nombre}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* Miniaturas */}
          <div className="grid grid-cols-4 gap-2">
            {auto.imagenes.map((imagen, index) => (
              <div
                key={index}
                className={`relative h-20 w-full cursor-pointer border ${
                  imagenSeleccionada === index ? "border-2 border-gray-800" : "border-gray-200"
                } bg-gray-50 flex items-center justify-center`}
                onClick={() => cambiarImagen(index)}
              >
                <ProductImage
                  src={imagen || "/car-placeholder.jpg"}
                  alt={`${auto.nombre} vista ${index + 1}`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Información del producto */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{auto.nombre}</h1>
          <p className="text-gray-600 mb-4">SKU: {auto.sku}</p>
          <p className="text-3xl font-bold mb-6">{formatCurrency(auto.precio)}</p>

          <div className="mb-6">
            <p className="text-gray-800">{auto.descripcion}</p>
          </div>

          {/* Selector de cantidad */}
          <div className="mb-6">
            <p className="mb-2 font-medium">Cantidad</p>
            <div className="flex items-center border rounded-md w-32">
              <button onClick={handleDecreaseCantidad} className="px-3 py-2 border-r" disabled={cantidad <= 1}>
                <Minus size={16} />
              </button>
              <input type="text" value={cantidad} readOnly className="w-full text-center py-2" />
              <button onClick={handleIncreaseCantidad} className="px-3 py-2 border-l">
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="space-y-3">
            <Button onClick={handleAddToCart} className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3">
              Agregar al carrito
            </Button>
            <Button variant="outline" className="w-full py-3">
              Realizar compra
            </Button>
          </div>

          {/* Detalles del producto */}
          <div className="mt-10">
            <div className="border-t border-b py-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">DATOS DEL PRODUCTO</h3>
                <button className="text-gray-500">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            <div className="py-4 text-gray-600">
              <p>
                <strong>Marca:</strong> {auto.marca}
              </p>
              <p>
                <strong>Modelo:</strong> {auto.modelo}
              </p>
              <p>
                <strong>Año:</strong> {auto.anio}
              </p>
              <p>
                <strong>Kilometraje:</strong> {auto.kilometraje.toLocaleString()} km
              </p>
              <p>
                <strong>Color:</strong> {auto.color}
              </p>
              <p>
                <strong>Categoría:</strong> {auto.categoria}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
