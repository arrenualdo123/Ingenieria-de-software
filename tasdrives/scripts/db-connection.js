// Archivo para la conexión a la base de datos
// Este archivo simula la conexión a PostgreSQL usando los datos del archivo .env

// Importar las variables de entorno (en un entorno real se usaría dotenv)
const DB_CONFIG = {
  user: "postgres",
  password: "toor",
  host: "localhost",
  port: 5432,
  database: "autos",
}

// Simulación de conexión a la base de datos
function connectToDatabase() {
  console.log("Conectando a la base de datos PostgreSQL...")
  console.log(`Host: ${DB_CONFIG.host}`)
  console.log(`Puerto: ${DB_CONFIG.port}`)
  console.log(`Base de datos: ${DB_CONFIG.database}`)
  console.log(`Usuario: ${DB_CONFIG.user}`)

  // En un entorno real, aquí se establecería la conexión real a PostgreSQL
  // Por ejemplo, usando el paquete 'pg' de Node.js

  return {
    query: async (sql, params = []) => {
      console.log("Ejecutando consulta SQL:", sql)
      console.log("Parámetros:", params)

      // Simulación de respuesta de la base de datos
      return simulateQueryResponse(sql)
    },
    close: () => {
      console.log("Cerrando conexión a la base de datos")
    },
  }
}

// Función para simular respuestas de la base de datos
function simulateQueryResponse(sql) {
  // Convertir a minúsculas para facilitar la comparación
  const sqlLower = sql.toLowerCase()

  // Simular diferentes tipos de consultas
  if (sqlLower.includes("select * from usuarios")) {
    return {
      rows: [
        { id: 1, nombre: "Admin", correo: "admin@tasdrives.com", rol: "admin" },
        { id: 2, nombre: "Vendedor", correo: "vendedor@tasdrives.com", rol: "vendedor" },
      ],
      rowCount: 2,
    }
  }

  if (sqlLower.includes("select * from autos")) {
    return {
      rows: [
        { id: 1, marca: "BMW", modelo: "Serie 3", anio: 2023, precio: 45000 },
        { id: 2, marca: "Mercedes-Benz", modelo: "Clase C", anio: 2022, precio: 52000 },
        { id: 3, marca: "Audi", modelo: "A4", anio: 2023, precio: 48500 },
        { id: 4, marca: "Toyota", modelo: "Camry", anio: 2022, precio: 42500 },
        { id: 5, marca: "Honda", modelo: "Accord", anio: 2021, precio: 40000 },
        { id: 6, marca: "BMW", modelo: "Serie 5", anio: 2022, precio: 58000 },
      ],
      rowCount: 6,
    }
  }

  if (sqlLower.includes("select * from clientes")) {
    return {
      rows: [
        { id: 1, nombre: "Juan Pérez", telefono: "123456789", correo: "juan@example.com" },
        { id: 2, nombre: "María López", telefono: "987654321", correo: "maria@example.com" },
      ],
      rowCount: 2,
    }
  }

  if (sqlLower.includes("insert into")) {
    return {
      rowCount: 1,
      rows: [{ id: Math.floor(Math.random() * 1000) }],
    }
  }

  if (sqlLower.includes("update")) {
    return {
      rowCount: 1,
    }
  }

  if (sqlLower.includes("delete")) {
    return {
      rowCount: 1,
    }
  }

  // Respuesta por defecto
  return {
    rows: [],
    rowCount: 0,
  }
}

// Exportar la función de conexión
window.dbConnection = {
  connect: connectToDatabase,
}

