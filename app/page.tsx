"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import { ArrowRight, Star, PenTool, Car, Shield } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const featuredCars = [
    {
      id: 9,
      name: "Ford GT 67",
      year: 2017,
      km: 1250,
      price: 450000,
      isBestSeller: true,
      image: "/productos/ford/ford-gt-67-heritage.jpg",
    },
    {
      id: 10,
      name: "Nissan Z GT4",
      year: 2024,
      km: 20000,
      price: 520000,
      isBestSeller: false,
      image: "/productos/nissan/nissan-z-gt4.jpg",
    },
    {
      id: 11,
      name: "Camaro Strode",
      year: 2022,
      km: 10000,
      price: 48500,
      isBestSeller: false,
      image: "/productos/camaro/camaro-strode.jpg",
    },
  ]

  // Implementación de carrusel usando React state
  useEffect(() => {
    if (featuredCars.length <= 1) return

    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredCars.length)
    }, 5000)

    return () => clearTimeout(timer)
  }, [currentSlide, featuredCars.length])

  return (
    <>
      {/* Hero Section - Pantalla completa como en el mockup */}
      <div className="relative h-screen w-full overflow-hidden">
        <Image src="/hero-car.jpg" alt="BMW negro" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-white max-w-4xl mb-6"
          >
            Encuentra el auto de tus sueños. El camino comienza aquí.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link href="/tienda">
              <Button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-6 text-lg">Comenzar ahora</Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Más vendidos - Similar al mockup */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-left">Más vendidos</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard
                  id={car.id}
                  name={car.name}
                  year={car.year}
                  km={car.km}
                  price={car.price}
                  isBestSeller={car.isBestSeller}
                  image={car.image}
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/tienda">
              <Button size="lg">
                Ver todos los vehículos <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categorías destacadas */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-left">Categorías destacadas</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Categorías como en tu código original pero con animaciones */}
            {[
              { name: "Sedán", desc: "Elegancia y confort para tu día a día" },
              { name: "SUV", desc: "Versatilidad y espacio para toda la familia" },
              { name: "Deportivo", desc: "Potencia y adrenalina en estado puro" },
              { name: "Eléctrico", desc: "El futuro de la movilidad sostenible" },
            ].map((categoria, index) => (
              <motion.div
                key={categoria.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden group"
              >
                <div className="relative h-48">
                  <Image
                    src={`/${categoria.name.toLowerCase()}.jpg`}
                    alt={categoria.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold mb-2">{categoria.name}</h3>
                  <p className="text-gray-600 mb-4">{categoria.desc}</p>
                  <Link href={`/tienda?categoria=${categoria.name.toLowerCase()}`}>
                    <Button variant="outline" className="w-full">
                      Ver {categoria.name.toLowerCase()}s <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-left">¿Por qué elegirnos?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Razón 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-blue-600 h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Calidad garantizada</h3>
              <p className="text-gray-600">
                Todos nuestros vehículos pasan por exhaustivos controles de calidad antes de ser puestos a la venta.
              </p>
            </motion.div>

            {/* Razón 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PenTool className="text-blue-600 h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Servicio técnico</h3>
              <p className="text-gray-600">
                Contamos con un equipo de profesionales especializados en el mantenimiento y reparación de vehículos.
              </p>
            </motion.div>

            {/* Razón 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="text-blue-600 h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Amplio catálogo</h3>
              <p className="text-gray-600">
                Disponemos de una gran variedad de vehículos para que encuentres el que mejor se adapta a tus
                necesidades.
              </p>
            </motion.div>

            {/* Razón 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-blue-600 h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Garantía</h3>
              <p className="text-gray-600">
                Ofrecemos garantía en todos nuestros vehículos para que puedas comprar con total tranquilidad.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para encontrar tu próximo vehículo?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            En TasDrives te ayudamos a encontrar el vehículo perfecto para ti. Visita nuestra tienda o contacta con
            nosotros.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/tienda">
              <Button size="lg" variant="secondary">
                Ver catálogo
              </Button>
            </Link>
            <Link href="/contacto">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
              >
                Contactar
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
