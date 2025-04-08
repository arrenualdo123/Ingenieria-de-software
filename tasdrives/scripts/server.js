// Este archivo simula la interacción con un servidor backend
// En una implementación real, estas funciones se conectarían a un backend real

// Configuración de la base de datos (simulada)
const DB_CONFIG = {
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "toor",
  database: "autos",
}

// Función para simular una solicitud al servidor
async function fetchFromServer(endpoint, method = "GET", data = null) {
  // Simulamos un retraso de red
  await new Promise((resolve) => setTimeout(resolve, 300))

  console.log(`${method} request to ${endpoint}`, data)

  // Simulamos diferentes endpoints
  switch (endpoint) {
    case "/api/auth/login":
      return simulateLogin(data)
    case "/api/auth/register":
      return simulateRegister(data)
    case "/api/cars":
      return simulateGetCars()
    case "/api/cars/filter":
      return simulateFilterCars(data)
    case "/api/cart/add":
      return simulateAddToCart(data)
    case "/api/contact":
      return simulateContactForm(data)
    default:
      throw new Error("Endpoint not found")
  }
}

// Simular inicio de sesión
function simulateLogin(data) {
  const { email, password } = data

  // Verificación simple (en un caso real, esto se haría en el servidor)
  if (email === "admin@tasdrives.com" && password === "admin123") {
    return {
      success: true,
      user: {
        id: 1,
        name: "Administrador",
        email: "admin@tasdrives.com",
        role: "admin",
      },
      token: "simulated_jwt_token",
    }
  }

  throw new Error("Credenciales incorrectas")
}

// Simular registro
function simulateRegister(data) {
  const { name, email, password } = data

  // Verificación simple (en un caso real, se verificaría que el email no exista)
  if (email && password && name) {
    return {
      success: true,
      message: "Usuario registrado correctamente",
    }
  }

  throw new Error("Datos de registro incompletos")
}

// Simular obtención de autos
function simulateGetCars() {
  return {
    success: true,
    cars: [
      {
        id: 1,
        brand: "BMW",
        model: "Serie 3",
        year: 2023,
        price: 45000,
        image: "https://via.placeholder.com/400x300",
        mileage: "15,000 km",
      },
      {
        id: 2,
        brand: "Mercedes-Benz",
        model: "Clase C",
        year: 2022,
        price: 52000,
        image: "https://via.placeholder.com/400x300",
        mileage: "20,000 km",
      },
      {
        id: 3,
        brand: "Audi",
        model: "A4",
        year: 2023,
        price: 48500,
        image: "https://via.placeholder.com/400x300",
        mileage: "10,000 km",
      },
    ],
  }
}

// Simular filtrado de autos
function simulateFilterCars(filters) {
  const { brand, year, minPrice, maxPrice } = filters

  // En un caso real, estos filtros se aplicarían en la base de datos
  console.log("Aplicando filtros:", filters)

  return {
    success: true,
    message: "Filtros aplicados correctamente",
    // Aquí se devolverían los autos filtrados
    cars: [],
  }
}

// Simular añadir al carrito
function simulateAddToCart(data) {
  const { carId, quantity } = data

  return {
    success: true,
    message: "Producto añadido al carrito",
    cartCount: 1,
  }
}

// Simular envío de formulario de contacto
function simulateContactForm(data) {
  const { name, email, subject, message } = data

  if (name && email && message) {
    return {
      success: true,
      message: "Mensaje enviado correctamente",
    }
  }

  throw new Error("Por favor complete todos los campos requeridos")
}

// Exportar funciones para uso en otros scripts
window.serverAPI = {
  login: (email, password) => fetchFromServer("/api/auth/login", "POST", { email, password }),
  register: (name, email, password) => fetchFromServer("/api/auth/register", "POST", { name, email, password }),
  getCars: () => fetchFromServer("/api/cars"),
  filterCars: (filters) => fetchFromServer("/api/cars/filter", "POST", filters),
  addToCart: (carId, quantity = 1) => fetchFromServer("/api/cart/add", "POST", { carId, quantity }),
  sendContactForm: (formData) => fetchFromServer("/api/contact", "POST", formData),
}

