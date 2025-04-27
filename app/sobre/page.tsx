import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SobreNosotrosPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Sobre Nosotros</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Nuestra Historia</h2>
          <p className="text-gray-600 mb-4">
            TasDrives nació en 2010 con una visión clara: revolucionar la forma en que las personas compran y venden automóviles. 
            Fundada por un grupo de entusiastas del motor, nuestra empresa ha crecido hasta convertirse en un referente en el sector.
          </p>
          <p className="text-gray-600 mb-4">
            Con más de una década de experiencia, hemos ayudado a miles de clientes a encontrar el vehículo perfecto para sus necesidades, 
            ofreciendo siempre un servicio personalizado y de calidad.
          </p>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image 
            src="/about-image.jpg" 
            alt="Equipo de TasDrives" 
            fill 
            className="object-cover"
            priority
          />
        </div>
      </div>
      
      <div className="bg-gray-50 p-8 rounded-lg mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Nuestros Valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3">Calidad</h3>
            <p className="text-gray-600">
              Todos nuestros vehículos pasan por exhaustivos controles de calidad antes de ser puestos a la venta, 
              garantizando así su perfecto estado y funcionamiento.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3">Transparencia</h3>
            <p className="text-gray-600">
              Creemos en la honestidad y la transparencia en todas nuestras operaciones. 
              Proporcionamos información detallada sobre cada vehículo y su historial.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3">Servicio al Cliente</h3>
            <p className="text-gray-600">
              Nuestro equipo está comprometido a ofrecer un servicio excepcional, 
              asesorando a nuestros clientes durante todo el proceso de compra.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Nuestro Equipo</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((member) => (
            <div key={member} className="text-center">
              <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-4">
                <Image 
                  src={`/team-member-${member}.jpg`} 
                  alt={`Miembro del equipo ${member}`} 
                  fill 
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-medium">Nombre Apellido</h3>
              <p className="text-gray-600">Cargo en la empresa</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-blue-600 text-white p-12 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">¿Quieres formar parte de nuestro equipo?</h2>
        <p className="mb-8 max-w-2xl mx-auto">
          Estamos siempre en búsqueda de talento para unirse a nuestra familia. Si te apasionan los automóviles y quieres 
          desarrollar tu carrera profesional en un entorno dinámico, ¡queremos conocerte!
        </p>
        <Link href="/contacto">
          <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
            Contáctanos
          </Button>
        </Link>
      </div>
    </div>
  )
}