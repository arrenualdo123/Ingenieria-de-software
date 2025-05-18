 import { createClient } from "@supabase/supabase-js"

// Estas variables de entorno ya están configuradas en tu proyecto
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Cliente para el lado del cliente (navegador)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Cliente para el lado del servidor con la clave de servicio
// Solo usar en operaciones del servidor que requieran privilegios elevados
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
export const supabaseAdmin = serviceRoleKey ? createClient(supabaseUrl, serviceRoleKey) : null // Devuelve null si no hay clave de servicio

// Función para verificar si el cliente admin está disponible
export function getSupabaseAdmin() {
  if (!supabaseAdmin) {
    console.error("Error: SUPABASE_SERVICE_ROLE_KEY no está configurada en las variables de entorno")
    // En desarrollo, podemos devolver el cliente normal para evitar errores
    return process.env.NODE_ENV === "development" ? supabase : null
  }
  return supabaseAdmin
}

// Tipos para las tablas de Supabase
export type Vehicle = {
  id: number
  nombre: string
  marca: string
  categoria: string
  anio: number
  kilometraje: number
  precio: number
  color: string
  destacado: boolean
  etiqueta: string | null
  imagen: string
  imagenes?: string[] | null
  video_url?: string | null
  descripcion?: string | null
  caracteristicas?: string[] | null
  especificaciones?: Record<string, string> | null
  stock?: number
  created_at?: string
  updated_at?: string
}

// Funciones para interactuar con la tabla de vehículos

// Obtener todos los vehículos
export async function getAllVehicles(): Promise<Vehicle[]> {
  const { data, error } = await supabase.from("vehicles").select("*").order("id")

  if (error) {
    console.error("Error fetching vehicles:", error)
    return []
  }

  // Convertir los campos JSON almacenados como strings
  return (data || []).map(processVehicleData)
}

// Obtener un vehículo por ID
export async function getVehicleById(id: number): Promise<Vehicle | null> {
  const { data, error } = await supabase.from("vehicles").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching vehicle with id ${id}:`, error)
    return null
  }

  return data ? processVehicleData(data) : null
}

// Obtener vehículos destacados
export async function getFeaturedVehicles(): Promise<Vehicle[]> {
  const { data, error } = await supabase.from("vehicles").select("*").eq("destacado", true).order("id")

  if (error) {
    console.error("Error fetching featured vehicles:", error)
    return []
  }

  return (data || []).map(processVehicleData)
}

// Filtrar vehículos
export async function filterVehicles(filters: {
  marca?: string[]
  categoria?: string[]
  anio?: number[]
  precioMin?: number
  precioMax?: number
}): Promise<Vehicle[]> {
  let query = supabase.from("vehicles").select("*")

  if (filters.marca && filters.marca.length > 0) {
    query = query.in("marca", filters.marca)
  }

  if (filters.categoria && filters.categoria.length > 0) {
    query = query.in("categoria", filters.categoria)
  }

  if (filters.anio && filters.anio.length > 0) {
    query = query.in("anio", filters.anio)
  }

  if (filters.precioMin !== undefined) {
    query = query.gte("precio", filters.precioMin)
  }

  if (filters.precioMax !== undefined) {
    query = query.lte("precio", filters.precioMax)
  }

  const { data, error } = await query.order("id")

  if (error) {
    console.error("Error filtering vehicles:", error)
    return []
  }

  return (data || []).map(processVehicleData)
}

// Función auxiliar para procesar los datos de vehículos
function processVehicleData(vehicle: any): Vehicle {
  try {
    // Convertir campos JSON almacenados como strings
    if (vehicle.caracteristicas && typeof vehicle.caracteristicas === "string") {
      vehicle.caracteristicas = JSON.parse(vehicle.caracteristicas)
    }

    if (vehicle.especificaciones && typeof vehicle.especificaciones === "string") {
      vehicle.especificaciones = JSON.parse(vehicle.especificaciones)
    }

    if (vehicle.imagenes && typeof vehicle.imagenes === "string") {
      vehicle.imagenes = JSON.parse(vehicle.imagenes)
    } else if (!vehicle.imagenes && vehicle.imagen) {
      // Si no hay imágenes pero hay una imagen principal, crear un array con esa imagen
      vehicle.imagenes = [vehicle.imagen]
    }
  } catch (error) {
    console.error("Error parsing JSON fields for vehicle:", vehicle.id, error)
  }

  return vehicle
}
