"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AppointmentModal } from "@/components/appointment-modal"
import { AdvisorContactModal } from "@/components/advisor-contact-modal"

export function ServiciosPageClient() {
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false)
  const [advisorModalOpen, setAdvisorModalOpen] = useState(false)

  return (
    <>
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
      <AppointmentModal open={appointmentModalOpen} onOpenChange={setAppointmentModalOpen} />

      <AdvisorContactModal open={advisorModalOpen} onOpenChange={setAdvisorModalOpen} />
    </>
  )
}
