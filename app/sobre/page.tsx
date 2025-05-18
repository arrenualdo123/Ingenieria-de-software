import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SobreNosotrosPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center dark:text-white">Sobre Nosotros</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Nuestra Historia</h2>
          <p className="text-gray-600 mb-4 dark:text-gray-300">
            TasDrives nació en 2025 con una visión clara: revolucionar la forma en que las personas compran y venden
            automóviles. Fundada por un grupo de entusiastas del motor, nuestra empresa ha crecido hasta convertirse en
            un referente en el sector.
          </p>
          <p className="text-gray-600 mb-4 dark:text-gray-300">
            Con más de una década de experiencia, hemos ayudado a miles de clientes a encontrar el vehículo perfecto
            para sus necesidades, ofreciendo siempre un servicio personalizado y de calidad.
          </p>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image src="/logo1.jpg" alt="Nuestro equipo trabajando" fill className="object-cover" />
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center dark:text-white">Nuestros Valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 dark:text-white">Transparencia</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Creemos en la honestidad y la claridad en cada transacción. Sin sorpresas, sin letra pequeña.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 dark:text-white">Calidad</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Todos nuestros vehículos pasan por rigurosos controles de calidad antes de llegar a nuestros clientes.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 dark:text-white">Servicio</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Nuestro compromiso con el cliente va más allá de la venta. Estamos aquí para ayudarte en todo el proceso.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mb-16">
        <h2 className="text-2xl font-semibold mb-6 dark:text-white">Nuestro Equipo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-64 mb-4 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700">
              <Image src="/tony.jpg" alt="Miembro del equipo" fill className="object-cover object-center" />
            </div>
            <h3 className="text-xl font-semibold dark:text-white">Antonio Gonzalez</h3>
            <p className="text-gray-600 dark:text-gray-300">Director General</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-64 mb-4 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700">
              <Image src="/angel.jpg" alt="Miembro del equipo" fill className="object-cover object-center" />
            </div>
            <h3 className="text-xl font-semibold dark:text-white">Angel Mayo</h3>
            <p className="text-gray-600 dark:text-gray-300">Directora de Ventas</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-64 mb-4 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700">
              <Image src="/jese.jpg" alt="Miembro del equipo" fill className="object-cover object-center" />
            </div>
            <h3 className="text-xl font-semibold dark:text-white">Jese Arreola</h3>
            <p className="text-gray-600 dark:text-gray-300">Jefe de Taller</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-6 dark:text-white">¿Quieres formar parte de nuestra historia?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto dark:text-gray-300">
          Si estás buscando tu próximo vehículo o quieres vender el tuyo, no dudes en contactar con nosotros. Estaremos
          encantados de ayudarte a encontrar la mejor solución para ti.
        </p>
        <Button asChild size="lg">
          <Link href="/contacto">Contacta con nosotros</Link>
        </Button>
      </div>
    </div>
  )
}
