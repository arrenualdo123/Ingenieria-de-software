"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const advisorContactSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingresa un correo electrónico válido.",
  }),
  phone: z.string().min(10, {
    message: "Por favor ingresa un número de teléfono válido.",
  }),
  interest: z.string({
    required_error: "Por favor selecciona tu área de interés.",
  }),
  budget: z.string().optional(),
  message: z.string().min(10, {
    message: "Por favor proporciona más detalles sobre tu consulta.",
  }),
  preferredContact: z.enum(["email", "phone", "whatsapp"], {
    required_error: "Por favor selecciona tu método de contacto preferido.",
  }),
})

type AdvisorContactValues = z.infer<typeof advisorContactSchema>

// Áreas de interés
const interestAreas = [
  { id: "compra-vehiculo", name: "Compra de vehículo" },
  { id: "financiamiento", name: "Opciones de financiamiento" },
  { id: "mantenimiento", name: "Servicios de mantenimiento" },
  { id: "personalizacion", name: "Personalización de vehículos" },
  { id: "club-vip", name: "Membresía Club TAS Drives" },
  { id: "otro", name: "Otro" },
]

// Rangos de presupuesto
const budgetRanges = [
  { id: "menos-500k", name: "Menos de $500,000" },
  { id: "500k-1m", name: "$500,000 - $1,000,000" },
  { id: "1m-2m", name: "$1,000,000 - $2,000,000" },
  { id: "2m-3m", name: "$2,000,000 - $3,000,000" },
  { id: "mas-3m", name: "Más de $3,000,000" },
  { id: "no-definido", name: "Aún no definido" },
]

interface AdvisorContactModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultInterest?: string
}

export function AdvisorContactModal({ open, onOpenChange, defaultInterest }: AdvisorContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = createClientComponentClient()

  // Valores por defecto del formulario
  const defaultValues: Partial<AdvisorContactValues> = {
    interest: defaultInterest || "",
    budget: "",
    preferredContact: "email",
  }

  const form = useForm<AdvisorContactValues>({
    resolver: zodResolver(advisorContactSchema),
    defaultValues,
  })

  async function onSubmit(data: AdvisorContactValues) {
    setIsSubmitting(true)

    try {
      // Guardar la solicitud en Supabase
      const { error } = await supabase.from("advisor_requests").insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        interest: data.interest,
        budget: data.budget || "no-definido",
        message: data.message,
        preferred_contact: data.preferredContact,
        status: "pending",
      })

      if (error) throw error

      toast({
        title: "¡Solicitud enviada con éxito!",
        description: "Un asesor se pondrá en contacto contigo en las próximas 24 horas.",
      })

      // Cerrar el modal y resetear el formulario
      onOpenChange(false)
      form.reset(defaultValues)
    } catch (error) {
      console.error("Error al enviar solicitud:", error)
      toast({
        title: "Error al enviar la solicitud",
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
          <DialogTitle className="text-2xl">Contactar a un asesor</DialogTitle>
          <DialogDescription>
            Completa el formulario y un asesor especializado se pondrá en contacto contigo.
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
              name="interest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Área de interés</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tu área de interés" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {interestAreas.map((area) => (
                        <SelectItem key={area.id} value={area.id}>
                          {area.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Presupuesto aproximado (opcional)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tu presupuesto aproximado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {budgetRanges.map((range) => (
                        <SelectItem key={range.id} value={range.id}>
                          {range.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensaje</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe tu consulta o requerimiento" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferredContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de contacto preferido</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona cómo prefieres ser contactado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="email">Correo electrónico</SelectItem>
                      <SelectItem value="phone">Llamada telefónica</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
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
                    Enviando...
                  </>
                ) : (
                  "Enviar solicitud"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
