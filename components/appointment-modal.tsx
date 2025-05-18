"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const appointmentFormSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingresa un correo electrónico válido.",
  }),
  phone: z.string().min(10, {
    message: "Por favor ingresa un número de teléfono válido.",
  }),
  service: z.string({
    required_error: "Por favor selecciona un servicio.",
  }),
  date: z.date({
    required_error: "Por favor selecciona una fecha para tu cita.",
  }),
  time: z.string({
    required_error: "Por favor selecciona una hora para tu cita.",
  }),
  message: z.string().optional(),
})

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>

// Horarios disponibles para citas
const availableTimes = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
]

// Servicios disponibles
const services = [
  { id: "mantenimiento-premium", name: "Mantenimiento Premium" },
  { id: "servicio-express", name: "Servicio Express" },
  { id: "diagnostico-avanzado", name: "Diagnóstico Avanzado" },
  { id: "financiamiento", name: "Financiamiento Flexible" },
  { id: "personalizacion", name: "Personalización Exclusiva" },
  { id: "garantia-extendida", name: "Garantía Extendida" },
  { id: "club-tasdrives", name: "Club TAS Drives" },
]

interface AppointmentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultService?: string
}

export function AppointmentModal({ open, onOpenChange, defaultService }: AppointmentModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = createClientComponentClient()

  // Valores por defecto del formulario
  const defaultValues: Partial<AppointmentFormValues> = {
    service: defaultService || "",
    date: undefined,
    time: "",
    message: "",
  }

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues,
  })

  async function onSubmit(data: AppointmentFormValues) {
    setIsSubmitting(true)

    try {
      // Formatear la fecha y hora para guardar en la base de datos
      const appointmentDateTime = new Date(data.date)
      const [hours, minutes] = data.time.split(":")
      appointmentDateTime.setHours(Number.parseInt(hours), Number.parseInt(minutes))

      // Guardar la cita en Supabase
      const { error } = await supabase.from("appointments").insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        appointment_date: appointmentDateTime.toISOString(),
        message: data.message || "",
        status: "pending",
      })

      if (error) throw error

      toast({
        title: "¡Cita agendada con éxito!",
        description: `Tu cita ha sido programada para el ${format(data.date, "PPP", { locale: es })} a las ${data.time}. Te enviaremos un correo de confirmación.`,
      })

      // Cerrar el modal y resetear el formulario
      onOpenChange(false)
      form.reset(defaultValues)
    } catch (error) {
      console.error("Error al agendar cita:", error)
      toast({
        title: "Error al agendar la cita",
        description: "Hubo un problema al procesar tu solicitud. Por favor intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Agendar una cita</DialogTitle>
          <DialogDescription>
            Completa el formulario para agendar una cita con nuestros especialistas.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu nombre completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input placeholder="tu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu número de teléfono" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Servicio</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un servicio" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Selecciona una fecha"
                        minDate={new Date()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una hora" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableTimes.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensaje (opcional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Detalles adicionales sobre tu cita" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  "Agendar cita"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
