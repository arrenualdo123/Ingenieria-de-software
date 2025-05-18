import { NextResponse } from "next/server"
import { getAllVehicles, getVehicleById, filterVehicles } from "@/lib/supabase"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  // Si se proporciona un ID, devolver un vehículo específico
  if (id) {
    const vehicle = await getVehicleById(Number(id))

    if (!vehicle) {
      return NextResponse.json({ error: "Vehículo no encontrado" }, { status: 404 })
    }

    return NextResponse.json(vehicle)
  }

  // Procesar filtros si se proporcionan
  const marca = searchParams.get("marca")?.split(",") || []
  const categoria = searchParams.get("categoria")?.split(",") || []
  const anio = searchParams.get("anio")?.split(",").map(Number) || []
  const precioMin = searchParams.get("precioMin") ? Number(searchParams.get("precioMin")) : undefined
  const precioMax = searchParams.get("precioMax") ? Number(searchParams.get("precioMax")) : undefined

  // Si hay filtros, aplicarlos
  if (
    marca.length > 0 ||
    categoria.length > 0 ||
    anio.length > 0 ||
    precioMin !== undefined ||
    precioMax !== undefined
  ) {
    const filteredVehicles = await filterVehicles({
      marca: marca.length > 0 ? marca : undefined,
      categoria: categoria.length > 0 ? categoria : undefined,
      anio: anio.length > 0 ? anio : undefined,
      precioMin,
      precioMax,
    })

    return NextResponse.json(filteredVehicles)
  }

  // Si no hay filtros ni ID, devolver todos los vehículos
  const vehicles = await getAllVehicles()
  return NextResponse.json(vehicles)
}
