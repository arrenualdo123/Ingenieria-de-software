// Este script migra los datos de vehículos a Supabase
const { createClient } = require("@supabase/supabase-js")
require("dotenv").config({ path: ".env.local" })

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: Variables de entorno de Supabase no configuradas")
  process.exit(1)
}

// Cliente de Supabase con la clave de servicio para tener permisos completos
const supabase = createClient(supabaseUrl, supabaseKey)

// Datos de ejemplo para los autos
const autos = [
  {
    id: 1,
    nombre: "Lamborghini",
    marca: "Lamborghini",
    categoria: "Deportivo",
    anio: 2023,
    kilometraje: 0,
    precio: 9290000,
    color: "Amarillo y Negro",
    destacado: true,
    etiqueta: "Más vendido",
    imagen: "/productos/lamborghini/lamborghini-urus.jpg",
    descripcion:
      "El Lamborghini Urus es un SUV de lujo de alto rendimiento que combina la potencia de un superdeportivo con la versatilidad de un SUV. Con su motor V8 biturbo, ofrece una experiencia de conducción inigualable.",
    caracteristicas: [
      "Motor V8 biturbo de 4.0L con 650 CV",
      "Tracción integral",
      "Cambio automático de 8 velocidades",
      "Aceleración 0-100 km/h en 3.6 segundos",
      "Velocidad máxima de 305 km/h",
      "Sistema de suspensión adaptativa",
      "Frenos carbono-cerámicos",
    ],
    especificaciones: {
      motor: "V8 biturbo 4.0L",
      potencia: "650 CV",
      aceleracion: "3.6 segundos (0-100 km/h)",
      velocidadMaxima: "305 km/h",
      consumo: "12.7 L/100km",
      emisiones: "325 g/km CO2",
      dimensiones: "5.1m x 2.0m x 1.6m",
      peso: "2,200 kg",
    },
  },
  {
    id: 2,
    nombre: "Jeep Wrangler",
    marca: "Jeep",
    categoria: "SUV",
    anio: 2023,
    kilometraje: 5000,
    precio: 2000000,
    color: "Blanco",
    destacado: false,
    etiqueta: "",
    imagen: "/productos/jeep-wrangler/jeep-wrangler.jpg",
    descripcion:
      "El Jeep Wrangler es un vehículo todoterreno icónico, conocido por su capacidad para enfrentar los terrenos más difíciles. Con su diseño robusto y su sistema de tracción 4x4, es perfecto para aventuras off-road.",
    caracteristicas: [
      "Motor V6 de 3.6L con 285 CV",
      "Tracción 4x4",
      "Techo y puertas desmontables",
      "Capacidad de vadeo de 76 cm",
      "Sistema de infoentretenimiento Uconnect",
      "Ángulos de ataque y salida optimizados",
      "Ejes Dana reforzados",
    ],
    especificaciones: {
      motor: "V6 3.6L",
      potencia: "285 CV",
      aceleracion: "7.5 segundos (0-100 km/h)",
      consumo: "10.5 L/100km",
      emisiones: "252 g/km CO2",
      dimensiones: "4.8m x 1.9m x 1.8m",
      capacidadVadeo: "76 cm",
    },
  },
  {
    id: 3,
    nombre: "Lamborghini Aventador Matte",
    marca: "Lamborghini",
    categoria: "Deportivo",
    anio: 2021,
    kilometraje: 15000,
    precio: 900000,
    color: "Gris Matte",
    destacado: false,
    etiqueta: "",
    imagen: "/productos/lamborghini/Lamborghini-Aventador-Matte.jpg",
    descripcion:
      "El Lamborghini Aventador es un superdeportivo que representa la máxima expresión de la ingeniería italiana. Con su motor V12 y su diseño agresivo, ofrece emociones fuertes en cada aceleración.",
    caracteristicas: [
      "Motor V12 de 6.5L con 740 CV",
      "Tracción integral",
      "Cambio ISR de 7 velocidades",
      "Aceleración 0-100 km/h en 2.9 segundos",
      "Velocidad máxima de 350 km/h",
      "Carrocería de fibra de carbono",
      "Sistema de escape deportivo",
    ],
    especificaciones: {
      motor: "V12 6.5L",
      potencia: "740 CV",
      aceleracion: "2.9 segundos (0-100 km/h)",
      velocidadMaxima: "350 km/h",
      consumo: "16.9 L/100km",
      emisiones: "394 g/km CO2",
      dimensiones: "4.8m x 2.0m x 1.1m",
      peso: "1,575 kg",
    },
  },
  {
    id: 4,
    nombre: "Ford Mustang Shelby",
    marca: "Ford",
    categoria: "Deportivo",
    anio: 2023,
    kilometraje: 3000,
    precio: 2500000,
    color: "Rojo",
    destacado: false,
    etiqueta: "",
    imagen: "/productos/ford/Ford-Shelby-GT500.jpg",
    descripcion:
      "El Ford Mustang Shelby GT500 es la versión más potente del icónico muscle car americano. Con su motor V8 sobrealimentado, ofrece un rendimiento brutal y un sonido inconfundible.",
    caracteristicas: [
      "Motor V8 sobrealimentado de 5.2L con 760 CV",
      "Tracción trasera",
      "Cambio automático de doble embrague de 7 velocidades",
      "Aceleración 0-100 km/h en 3.5 segundos",
      "Sistema de escape activo",
      "Suspensión MagneRide",
      "Frenos Brembo de alto rendimiento",
    ],
    especificaciones: {
      motor: "V8 sobrealimentado 5.2L",
      potencia: "760 CV",
      aceleracion: "3.5 segundos (0-100 km/h)",
      velocidadMaxima: "290 km/h (limitada)",
      consumo: "14.7 L/100km",
      emisiones: "350 g/km CO2",
      dimensiones: "4.8m x 1.9m x 1.4m",
      peso: "1,850 kg",
    },
  },
  {
    id: 5,
    nombre: "Toyota Supra MK4",
    marca: "Toyota",
    categoria: "Deportivo",
    anio: 2023,
    kilometraje: 0,
    precio: 1800000,
    color: "Negro",
    destacado: false,
    etiqueta: "Nuevo",
    imagen: "/productos/toyota-supra-mk4/Supra-MK4-2.jpg",
    descripcion:
      "El Toyota Supra MK4 es un deportivo legendario, conocido por su fiabilidad y su potencial de modificación. Con su motor turboalimentado, ofrece un rendimiento excepcional y una experiencia de conducción única.",
    caracteristicas: [
      "Motor 6 cilindros en línea turboalimentado de 3.0L",
      "Tracción trasera",
      "Cambio manual de 6 velocidades",
      "Suspensión deportiva",
      "Sistema de escape deportivo",
      "Llantas de aleación forjada",
      "Interior deportivo con asientos tipo baquet",
    ],
    especificaciones: {
      motor: "6 cilindros en línea turbo 3.0L",
      potencia: "340 CV",
      aceleracion: "4.3 segundos (0-100 km/h)",
      velocidadMaxima: "285 km/h",
      consumo: "9.7 L/100km",
      dimensiones: "4.5m x 1.8m x 1.3m",
      peso: "1,570 kg",
    },
  },
  {
    id: 6,
    nombre: "Nissan GTR R35",
    marca: "Nissan",
    categoria: "Deportivo",
    anio: 2021,
    kilometraje: 8000,
    precio: 3500000,
    color: "Personalizado",
    destacado: false,
    etiqueta: "",
    imagen: "/productos/nissan/Nissan-GTR-R35.jpg",
    descripcion:
      "El Nissan GT-R R35 es un superdeportivo japonés conocido como 'Godzilla'. Con su avanzada tecnología y su potente motor V6 biturbo, ofrece un rendimiento excepcional en cualquier condición.",
    caracteristicas: [
      "Motor V6 biturbo de 3.8L con 570 CV",
      "Tracción integral ATTESA E-TS",
      "Cambio de doble embrague de 6 velocidades",
      "Aceleración 0-100 km/h en 2.7 segundos",
      "Sistema de suspensión Bilstein DampTronic",
      "Frenos Brembo de alto rendimiento",
      "Sistema de infoentretenimiento con telemetría",
    ],
    especificaciones: {
      motor: "V6 biturbo 3.8L",
      potencia: "570 CV",
      aceleracion: "2.7 segundos (0-100 km/h)",
      velocidadMaxima: "315 km/h",
      consumo: "12.0 L/100km",
      emisiones: "275 g/km CO2",
      dimensiones: "4.7m x 1.9m x 1.4m",
      peso: "1,740 kg",
    },
  },
  {
    id: 7,
    nombre: "Bugatti Veyron",
    marca: "Bugatti",
    categoria: "SuperDeportivo",
    anio: 2023,
    kilometraje: 0,
    precio: 1950000,
    color: "Beige",
    destacado: false,
    etiqueta: "",
    imagen: "/productos/bugatti/Bugatti-Veyron.jpg",
    descripcion:
      "El Bugatti Veyron es uno de los superdeportivos más exclusivos y rápidos del mundo. Con su motor W16 cuádruple turbo, ofrece un rendimiento sin igual y un lujo excepcional.",
    caracteristicas: [
      "Motor W16 cuádruple turbo de 8.0L con 1,001 CV",
      "Tracción integral",
      "Cambio automático de doble embrague de 7 velocidades",
      "Aceleración 0-100 km/h en 2.5 segundos",
      "Velocidad máxima de 407 km/h",
      "Sistema de frenado con discos carbono-cerámicos",
      "Aerodinámica activa",
    ],
    especificaciones: {
      motor: "W16 cuádruple turbo 8.0L",
      potencia: "1,001 CV",
      aceleracion: "2.5 segundos (0-100 km/h)",
      velocidadMaxima: "407 km/h",
      consumo: "24.1 L/100km",
      emisiones: "596 g/km CO2",
      dimensiones: "4.5m x 2.0m x 1.2m",
      peso: "1,990 kg",
    },
  },
  {
    id: 8,
    nombre: "Toyota Tacoma",
    marca: "Toyota",
    categoria: "Pickup",
    anio: 2024,
    kilometraje: 12000,
    precio: 1750000,
    color: "Blanco",
    destacado: false,
    etiqueta: "",
    imagen: "/productos/toyota/toyota-tacoma.jpg",
    descripcion:
      "La Toyota Tacoma es una pickup robusta y confiable, perfecta para aventuras off-road y trabajo pesado. Con su potente motor y tracción 4x4, puede enfrentar cualquier terreno.",
    caracteristicas: [
      "Motor V6 de 3.5L",
      "Tracción 4x4",
      "Capacidad de remolque de 2,900 kg",
      "Sistema de navegación",
      "Cámara de retroceso",
      "Control de crucero adaptativo",
      "Sistema de audio premium",
    ],
    especificaciones: {
      motor: "V6 3.5L",
      potencia: "278 CV",
      aceleracion: "7.7 segundos (0-100 km/h)",
      consumo: "12.4 L/100km",
      emisiones: "285 g/km CO2",
      dimensiones: "5.4m x 1.9m x 1.8m",
      capacidadCarga: "680 kg",
    },
  },
  {
    id: 9,
    nombre: "Ford GT 67",
    marca: "Ford",
    categoria: "Deportivo",
    anio: 2017,
    kilometraje: 1250,
    precio: 1750000,
    color: "Rojo",
    destacado: false,
    etiqueta: "",
    imagen: "/productos/ford/ford-gt-67-heritage.jpg",
    descripcion:
      "El Ford GT 67 Heritage Edition es un superdeportivo exclusivo que rinde homenaje al legendario GT40 que ganó Le Mans en 1967. Con su diseño aerodinámico y su potente motor V6 EcoBoost, ofrece un rendimiento excepcional en pista.",
    caracteristicas: [
      "Motor V6 EcoBoost de 3.5L con 647 CV",
      "Tracción trasera",
      "Cambio automático de doble embrague de 7 velocidades",
      "Carrocería de fibra de carbono",
      "Aerodinámica activa",
      "Sistema de suspensión adaptativa",
      "Frenos carbono-cerámicos",
    ],
    especificaciones: {
      motor: "V6 EcoBoost 3.5L",
      potencia: "647 CV",
      aceleracion: "3.0 segundos (0-100 km/h)",
      velocidadMaxima: "347 km/h",
      consumo: "14.7 L/100km",
      emisiones: "325 g/km CO2",
      dimensiones: "4.7m x 2.2m x 1.1m",
      peso: "1,385 kg",
    },
  },
  {
    id: 10,
    nombre: "Nissan Z GT4",
    marca: "Nissan",
    categoria: "Deportivo",
    anio: 2024,
    kilometraje: 12000,
    precio: 1750000,
    color: "Gris",
    destacado: false,
    etiqueta: "",
    imagen: "/productos/nissan/nissan-z-gt4.jpg",
    descripcion:
      "El Nissan Z GT4 es la versión de competición del nuevo Nissan Z, desarrollado específicamente para la categoría GT4. Combina la herencia deportiva de Nissan con la última tecnología de competición para ofrecer un rendimiento excepcional en circuito.",
    caracteristicas: [
      "Motor V6 biturbo de 3.0L optimizado para competición",
      "Tracción trasera",
      "Transmisión secuencial de competición",
      "Jaula de seguridad homologada FIA",
      "Aerodinámica específica GT4",
      "Sistema de adquisición de datos",
      "Control de tracción ajustable",
    ],
    especificaciones: {
      motor: "V6 biturbo 3.0L",
      potencia: "450 CV (limitado por reglamento GT4)",
      aceleracion: "3.5 segundos (0-100 km/h)",
      velocidadMaxima: "250 km/h (limitada)",
      peso: "1,410 kg",
      suspension: "Multibrazo ajustable",
      frenos: "Discos ventilados con pinzas de 6 pistones",
      neumaticos: "Slicks de competición",
    },
  },
  {
    id: 11,
    nombre: "Camaro Strode",
    marca: "Chevrolet",
    categoria: "Deportivo",
    anio: 2022,
    kilometraje: 12000,
    precio: 1750000,
    color: "Blanco",
    destacado: false,
    etiqueta: "",
    imagen: "/productos/camaro/camaro-strode.jpg",
    descripcion:
      "El Camaro Strode es una edición especial del icónico muscle car americano, con mejoras de rendimiento y estética exclusivas. Combina la potencia bruta del motor V8 con un manejo preciso y un diseño agresivo que no pasa desapercibido.",
    caracteristicas: [
      "Motor V8 de 6.2L con 455 CV",
      "Tracción trasera",
      "Cambio manual de 6 velocidades",
      "Suspensión deportiva Magnetic Ride Control",
      "Sistema de escape deportivo",
      "Llantas de aleación de 20 pulgadas",
      "Interior con detalles exclusivos Strode",
    ],
    especificaciones: {
      motor: "V8 6.2L",
      potencia: "455 CV",
      aceleracion: "4.0 segundos (0-100 km/h)",
      velocidadMaxima: "290 km/h",
      consumo: "13.5 L/100km",
      emisiones: "315 g/km CO2",
      dimensiones: "4.8m x 1.9m x 1.3m",
      peso: "1,670 kg",
    },
  },
]

// Función para migrar los datos a Supabase
async function migrateVehiclesToSupabase() {
  console.log("Iniciando migración de vehículos a Supabase...")

  try {
    // Primero, eliminamos todos los registros existentes para evitar duplicados
    const { error: deleteError } = await supabase.from("vehicles").delete().neq("id", 0) // Esto eliminará todos los registros

    if (deleteError) {
      console.error("Error al eliminar registros existentes:", deleteError)
      return
    }

    console.log("Registros existentes eliminados correctamente")

    // Luego, insertamos los nuevos registros
    for (const auto of autos) {
      // Convertimos los arrays y objetos a formato JSON para almacenarlos en la base de datos
      const vehicleData = {
        ...auto,
        caracteristicas: auto.caracteristicas ? JSON.stringify(auto.caracteristicas) : null,
        especificaciones: auto.especificaciones ? JSON.stringify(auto.especificaciones) : null,
        imagenes: auto.imagenes ? JSON.stringify(auto.imagenes) : JSON.stringify([auto.imagen]),
      }

      const { error } = await supabase.from("vehicles").insert([vehicleData])

      if (error) {
        console.error(`Error al insertar vehículo ${auto.nombre}:`, error)
      } else {
        console.log(`Vehículo ${auto.nombre} insertado correctamente`)
      }
    }

    console.log("Migración completada exitosamente")
  } catch (error) {
    console.error("Error durante la migración:", error)
  }
}

// Ejecutar la migración
migrateVehiclesToSupabase()
