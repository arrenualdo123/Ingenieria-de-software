"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CalendarClock, Car, Cog, CreditCard, Headphones, Shield, PenToolIcon as Tool, Wrench, Zap } from "lucide-react"
import { CircularImage } from "@/components/circular-image"
import { AppointmentModal } from "@/components/appointment-modal"
import { AdvisorContactModal } from "@/components/advisor-contact-modal"

export default function ServiciosPage() {
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false)
  const [advisorModalOpen, setAdvisorModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState("")

  const handleServiceButtonClick = (serviceId: string) => {
    setSelectedService(serviceId)
    setAppointmentModalOpen(true)
  }

  const handleAdvisorButtonClick = (serviceId: string) => {
    setSelectedService(serviceId)
    setAdvisorModalOpen(true)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Servicios Premium TAS Drives</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Más allá de vender vehículos, ofrecemos una experiencia completa para que disfrutes al máximo tu automóvil.
        </p>
      </div>

      <Tabs defaultValue="todos" className="w-full mb-16">
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="mantenimiento">Mantenimiento</TabsTrigger>
            <TabsTrigger value="financiamiento">Financiamiento</TabsTrigger>
            <TabsTrigger value="personalizacion">Personalización</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="todos" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mantenimiento Premium */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                    <Wrench className="h-6 w-6 text-red-500" />
                  </div>
                  <Badge variant="outline" className="bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-300">
                    Popular
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold mt-4 text-gray-900 dark:text-white">
                  Mantenimiento Premium
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Servicio completo para tu vehículo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Revisión de 50 puntos críticos
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Cambio de aceite y filtros premium
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Diagnóstico computarizado
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Lavado y detallado completo
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleServiceButtonClick("mantenimiento-premium")}>
                  Agendar servicio
                </Button>
              </CardFooter>
            </Card>

            {/* Financiamiento Flexible */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle className="text-xl font-bold mt-4 text-gray-900 dark:text-white">
                  Financiamiento Flexible
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Opciones adaptadas a tu presupuesto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Tasas preferenciales desde 7.9%
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Plazos de hasta 72 meses
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Sin penalización por pago anticipado
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Aprobación en 24 horas
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleAdvisorButtonClick("financiamiento")}>
                  Solicitar financiamiento
                </Button>
              </CardFooter>
            </Card>

            {/* Personalización Exclusiva */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                  <Cog className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle className="text-xl font-bold mt-4 text-gray-900 dark:text-white">
                  Personalización Exclusiva
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">Haz único tu vehículo</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Wrapping de alta calidad
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Sistemas de audio premium
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Rines y neumáticos especiales
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Iluminación LED personalizada
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleAdvisorButtonClick("personalizacion")}>
                  Personalizar mi auto
                </Button>
              </CardFooter>
            </Card>

            {/* Garantía Extendida */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle className="text-xl font-bold mt-4 text-gray-900 dark:text-white">
                  Garantía Extendida
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Protección total para tu inversión
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Cobertura hasta por 5 años adicionales
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Asistencia en carretera 24/7
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Auto sustituto en caso de reparación
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Transferible a nuevo propietario
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleAdvisorButtonClick("garantia-extendida")}>
                  Conocer planes
                </Button>
              </CardFooter>
            </Card>

            {/* Asesoría Técnica */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
                  <Headphones className="h-6 w-6 text-amber-500" />
                </div>
                <CardTitle className="text-xl font-bold mt-4 text-gray-900 dark:text-white">Asesoría Técnica</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Expertos a tu disposición
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Consultas ilimitadas con especialistas
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Videollamadas para diagnóstico remoto
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Guías de mantenimiento personalizadas
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Acceso a biblioteca técnica exclusiva
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleAdvisorButtonClick("asesoria-tecnica")}>
                  Consultar ahora
                </Button>
              </CardFooter>
            </Card>

            {/* Club TAS Drives */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">
                    <Car className="h-6 w-6 text-indigo-500" />
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-indigo-50 text-indigo-500 dark:bg-indigo-900/20 dark:text-indigo-300"
                  >
                    Exclusivo
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold mt-4 text-gray-900 dark:text-white">Club TAS Drives</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Beneficios exclusivos para miembros
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Eventos exclusivos con nuevos modelos
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Descuentos especiales en servicios
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Acceso a pista de pruebas mensual
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Programa de referidos con bonificaciones
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleAdvisorButtonClick("club-tasdrives")}>
                  Unirme al club
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mantenimiento" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mantenimiento Premium */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                    <Wrench className="h-6 w-6 text-red-500" />
                  </div>
                  <Badge variant="outline" className="bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-300">
                    Popular
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold mt-4 text-gray-900 dark:text-white">
                  Mantenimiento Premium
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Servicio completo para tu vehículo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Revisión de 50 puntos críticos
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Cambio de aceite y filtros premium
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Diagnóstico computarizado
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Lavado y detallado completo
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleServiceButtonClick("mantenimiento-premium")}>
                  Agendar servicio
                </Button>
              </CardFooter>
            </Card>

            {/* Servicio Express */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-yellow-500" />
                </div>
                <CardTitle className="text-xl font-bold mt-4 text-gray-900 dark:text-white">Servicio Express</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Mantenimiento rápido en 1 hora
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Cambio de aceite y filtro
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Revisión de niveles
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Inspección de frenos
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Lavado básico
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleServiceButtonClick("servicio-express")}>
                  Reservar ahora
                </Button>
              </CardFooter>
            </Card>

            {/* Diagnóstico Avanzado */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-full bg-cyan-100 dark:bg-cyan-900/20 flex items-center justify-center">
                  <Tool className="h-6 w-6 text-cyan-500" />
                </div>
                <CardTitle className="text-xl font-bold mt-4 text-gray-900 dark:text-white">
                  Diagnóstico Avanzado
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Análisis completo del vehículo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Escaneo computarizado de sistemas
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Análisis de emisiones
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Prueba de rendimiento
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Reporte detallado con recomendaciones
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleServiceButtonClick("diagnostico-avanzado")}>
                  Solicitar diagnóstico
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financiamiento" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Financiamiento Flexible */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle className="text-xl font-bold mt-4 text-gray-900 dark:text-white">
                  Financiamiento Flexible
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Opciones adaptadas a tu presupuesto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Tasas preferenciales desde 7.9%
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Plazos de hasta 72 meses
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Sin penalización por pago anticipado
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Aprobación en 24 horas
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleAdvisorButtonClick("financiamiento")}>
                  Solicitar financiamiento
                </Button>
              </CardFooter>
            </Card>

            {/* Leasing Empresarial */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-emerald-500" />
                </div>
                <CardTitle className="text-xl font-bold mt-4 text-gray-900 dark:text-white">
                  Leasing Empresarial
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Soluciones para tu negocio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Beneficios fiscales para empresas
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Flotas personalizadas
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Mantenimiento incluido
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Opción de compra al finalizar
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleAdvisorButtonClick("leasing-empresarial")}>
                  Contactar asesor
                </Button>
              </CardFooter>
            </Card>

            {/* Refinanciamiento */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-orange-500" />
                </div>
                <CardTitle className="text-xl font-bold mt-4 text-gray-900 dark:text-white">Refinanciamiento</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Mejora las condiciones de tu crédito actual
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Reducción de tasa de interés
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Disminución de pago mensual
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Extensión de plazo si lo necesitas
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Análisis gratuito de tu caso
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleAdvisorButtonClick("refinanciamiento")}>
                  Evaluar mi caso
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="personalizacion" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Personalización Exclusiva */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                  <Cog className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle className="text-xl font-bold mt-4 text-gray-900 dark:text-white">
                  Personalización Exclusiva
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">Haz único tu vehículo</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Wrapping de alta calidad
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Sistemas de audio premium
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Rines y neumáticos especiales
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Iluminación LED personalizada
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleAdvisorButtonClick("personalizacion")}>
                  Personalizar mi auto
                </Button>
              </CardFooter>
            </Card>

            {/* Mejoras de Rendimiento */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-red-500" />
                </div>
                <CardTitle className="text-xl font-bold mt-4 text-gray-900 dark:text-white">
                  Mejoras de Rendimiento
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Potencia tu vehículo al máximo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Reprogramación de ECU
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Sistemas de admisión y escape
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Suspensión deportiva
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Frenos de alto rendimiento
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleAdvisorButtonClick("mejoras-rendimiento")}>
                  Mejorar rendimiento
                </Button>
              </CardFooter>
            </Card>

            {/* Interiores de Lujo */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
                  <Car className="h-6 w-6 text-amber-500" />
                </div>
                <CardTitle className="text-xl font-bold mt-4 text-gray-900 dark:text-white">
                  Interiores de Lujo
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Transforma el interior de tu vehículo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Tapicería en cuero premium
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Sistemas de entretenimiento
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Iluminación ambiental personalizada
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Acabados en fibra de carbono o madera
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleAdvisorButtonClick("interiores-lujo")}>
                  Renovar interior
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="premium" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Club TAS Drives */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">
                    <Car className="h-6 w-6 text-indigo-500" />
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-indigo-50 text-indigo-500 dark:bg-indigo-900/20 dark:text-indigo-300"
                  >
                    Exclusivo
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold mt-4 text-gray-900 dark:text-white">Club TAS Drives</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Beneficios exclusivos para miembros
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Eventos exclusivos con nuevos modelos
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Descuentos especiales en servicios
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Acceso a pista de pruebas mensual
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Programa de referidos con bonificaciones
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleAdvisorButtonClick("club-tasdrives")}>
                  Unirme al club
                </Button>
              </CardFooter>
            </Card>

            {/* Concierge Automotriz */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="h-12 w-12 rounded-full bg-rose-100 dark:bg-rose-900/20 flex items-center justify-center">
                    <Headphones className="h-6 w-6 text-rose-500" />
                  </div>
                  <Badge variant="outline" className="bg-rose-50 text-rose-500 dark:bg-rose-900/20 dark:text-rose-300">
                    VIP
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold mt-4 text-gray-900 dark:text-white">
                  Concierge Automotriz
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Servicio personalizado a otro nivel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Asesor personal disponible 24/7
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Recogida y entrega a domicilio
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Vehículo de sustitución de gama alta
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Acceso prioritario a nuevos modelos
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleAdvisorButtonClick("concierge-automotriz")}>
                  Solicitar información
                </Button>
              </CardFooter>
            </Card>

            {/* Experiencias de Conducción */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <CalendarClock className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle className="text-xl font-bold mt-4 text-gray-900 dark:text-white">
                  Experiencias de Conducción
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Vive momentos inolvidables
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Track days en circuitos profesionales
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Rutas escénicas guiadas
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Cursos de conducción avanzada
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Eventos con pilotos profesionales
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleServiceButtonClick("experiencias-conduccion")}>
                  Reservar experiencia
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Sección de Testimonios */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Lo que dicen nuestros clientes</h2>
          <p className="text-gray-600 dark:text-gray-300">Miles de clientes satisfechos con nuestros servicios</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <CircularImage src="/professional-man-portrait.png" alt="Cliente" size="md" className="mr-4" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Carlos Mendoza</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Cliente desde 2022</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 italic">
              "El servicio de mantenimiento premium es excepcional. Mi BMW siempre queda como nuevo y el personal es muy
              profesional. Totalmente recomendado."
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <CircularImage src="/professional-woman-portrait.png" alt="Cliente" size="md" className="mr-4" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Laura Sánchez</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Cliente desde 2023</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 italic">
              "La personalización que hicieron en mi auto superó todas mis expectativas. El equipo de audio y el
              wrapping quedaron espectaculares. Ahora tengo un auto único."
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <CircularImage src="/professional-man-portrait.png" alt="Cliente" size="md" className="mr-4" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Miguel Ángel Rodríguez</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Cliente desde 2021</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 italic">
              "Ser miembro del Club TAS Drives ha sido una experiencia increíble. Los eventos exclusivos y el acceso a
              la pista de pruebas mensual valen cada centavo."
            </p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-r from-red-500 to-red-700 rounded-xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">¿Listo para elevar tu experiencia automotriz?</h2>
        <p className="text-xl mb-6 max-w-2xl mx-auto">
          Nuestros asesores están disponibles para ayudarte a elegir el servicio perfecto para ti y tu vehículo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-red-600 hover:bg-gray-100"
            onClick={() => setAppointmentModalOpen(true)}
          >
            Agendar una cita
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-red-600"
            onClick={() => setAdvisorModalOpen(true)}
          >
            Contactar un asesor
          </Button>
        </div>
      </section>

      {/* Modales */}
      <AppointmentModal
        open={appointmentModalOpen}
        onOpenChange={setAppointmentModalOpen}
        defaultService={selectedService}
      />

      <AdvisorContactModal
        open={advisorModalOpen}
        onOpenChange={setAdvisorModalOpen}
        defaultInterest={selectedService}
      />
    </div>
  )
}
