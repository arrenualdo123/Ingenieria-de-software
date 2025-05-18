"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  isAfter,
  isBefore,
} from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerProps {
  value?: Date
  onChange: (date: Date) => void
  placeholder?: string
  minDate?: Date
  maxDate?: Date
  disabled?: boolean
  className?: string
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Seleccionar fecha",
  minDate,
  maxDate,
  disabled,
  className,
}: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(value)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [month, setMonth] = useState(date || new Date())
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Actualizar el estado local cuando cambia el valor externo
  useEffect(() => {
    setDate(value)
    setInputValue(value ? format(value, "dd/MM/yyyy") : "")
  }, [value])

  // Manejar cambio de fecha
  const handleSelect = (day: Date) => {
    setDate(day)
    onChange(day)
    setCalendarOpen(false)
  }

  // Manejar cambio en el input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    // Intentar parsear la fecha (formato dd/MM/yyyy)
    const parts = value.split("/")
    if (parts.length === 3) {
      const day = Number.parseInt(parts[0], 10)
      const month = Number.parseInt(parts[1], 10) - 1 // Los meses en JS son 0-indexed
      const year = Number.parseInt(parts[2], 10)

      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        const newDate = new Date(year, month, day)
        if (newDate.getDate() === day && newDate.getMonth() === month && newDate.getFullYear() === year) {
          // Validar rango de fechas
          if (
            (!minDate || isAfter(newDate, minDate) || isSameDay(newDate, minDate)) &&
            (!maxDate || isBefore(newDate, maxDate) || isSameDay(newDate, maxDate))
          ) {
            setDate(newDate)
            onChange(newDate)
            setMonth(newDate)
          }
        }
      }
    }
  }

  // Generar días del mes actual
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(month),
    end: endOfMonth(month),
  })

  // Nombres de los días de la semana
  const weekDays = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"]

  // Calcular el día de la semana del primer día del mes (0 = domingo, 1 = lunes, ..., 6 = sábado)
  const firstDayOfMonth = startOfMonth(month).getDay()
  // Ajustar para que la semana comience en lunes (0 = lunes, ..., 6 = domingo)
  const firstDayAdjusted = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

  // Crear array para los días vacíos al inicio
  const emptyDaysAtStart = Array(firstDayAdjusted).fill(null)

  return (
    <div className={cn("relative", className)}>
      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              placeholder={placeholder}
              disabled={disabled}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-gray-600"
              onClick={() => setCalendarOpen(true)}
              disabled={disabled}
            >
              <CalendarIcon className="h-4 w-4" />
              <span className="sr-only">Abrir calendario</span>
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setMonth(subMonths(month, 1))}
                disabled={minDate && isBefore(startOfMonth(month), addMonths(startOfMonth(minDate), 1))}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Mes anterior</span>
              </Button>
              <div className="font-medium">{format(month, "MMMM yyyy", { locale: es })}</div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setMonth(addMonths(month, 1))}
                disabled={maxDate && isAfter(endOfMonth(month), subMonths(endOfMonth(maxDate), 1))}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Mes siguiente</span>
              </Button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500 dark:text-gray-400">
              {weekDays.map((day) => (
                <div key={day} className="py-1">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 mt-1">
              {emptyDaysAtStart.map((_, index) => (
                <div key={`empty-start-${index}`} className="h-8 w-8" />
              ))}
              {daysInMonth.map((day) => {
                const isSelected = date ? isSameDay(day, date) : false
                const isDisabled = (minDate && isBefore(day, minDate)) || (maxDate && isAfter(day, maxDate)) || disabled

                return (
                  <Button
                    key={day.toString()}
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8 p-0 font-normal",
                      isToday(day) && "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100",
                      isSelected && "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-300",
                      isDisabled && "opacity-50 cursor-not-allowed",
                      !isDisabled && !isSelected && !isToday(day) && "hover:bg-gray-100 dark:hover:bg-gray-800",
                    )}
                    disabled={isDisabled}
                    onClick={() => handleSelect(day)}
                  >
                    {format(day, "d")}
                  </Button>
                )
              })}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
