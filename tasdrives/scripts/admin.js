// Este archivo contiene la lógica para el panel de administración
// Se cargará solo cuando se acceda al panel de administración

document.addEventListener("DOMContentLoaded", () => {
  // Verificar si el usuario está autenticado como administrador
  checkAdminAuth()

  // Inicializar componentes del panel de administración
  initAdminPanel()
})

// Verificar autenticación de administrador
function checkAdminAuth() {
  // En un entorno real, esto verificaría el token JWT y el rol del usuario
  const userToken = localStorage.getItem("userToken")
  const userRole = localStorage.getItem("userRole")

  if (!userToken || userRole !== "admin") {
    // Redirigir a la página de inicio de sesión si no es administrador
    window.location.href = "login.html"
  }
}

// Inicializar panel de administración
function initAdminPanel() {
  // Cargar datos iniciales
  loadDashboardData()

  // Inicializar gestión de inventario
  initInventoryManagement()

  // Inicializar gestión de usuarios
  initUserManagement()

  // Inicializar gestión de ventas
  initSalesManagement()

  // Inicializar eventos de navegación
  initNavigation()
}

// Cargar datos del dashboard
function loadDashboardData() {
  // Simulación de carga de datos para el dashboard
  const db = window.dbConnection.connect()

  // Obtener estadísticas de ventas
  db.query("SELECT COUNT(*) as total, SUM(total) as revenue FROM ventas").then((result) => {
    const salesCount = result.rows[0]?.total || 0
    const revenue = result.rows[0]?.revenue || 0

    // Actualizar elementos del DOM
    document.getElementById("total-sales").textContent = salesCount
    document.getElementById("total-revenue").textContent = `$${revenue.toFixed(2)}`
  })

  // Obtener estadísticas de inventario
  db.query("SELECT COUNT(*) as total FROM autos").then((result) => {
    const carsCount = result.rows[0]?.total || 0

    // Actualizar elementos del DOM
    document.getElementById("total-cars").textContent = carsCount
  })

  // Obtener estadísticas de clientes
  db.query("SELECT COUNT(*) as total FROM clientes").then((result) => {
    const clientsCount = result.rows[0]?.total || 0

    // Actualizar elementos del DOM
    document.getElementById("total-clients").textContent = clientsCount
  })

  // Cerrar conexión
  db.close()
}

// Inicializar gestión de inventario
function initInventoryManagement() {
  const inventoryForm = document.getElementById("inventory-form")
  if (!inventoryForm) return

  // Manejar envío del formulario de inventario
  inventoryForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const marca = document.getElementById("car-brand").value
    const modelo = document.getElementById("car-model").value
    const anio = document.getElementById("car-year").value
    const precio = document.getElementById("car-price").value
    const stock = document.getElementById("car-stock").value

    // Validar datos
    if (!marca || !modelo || !anio || !precio || !stock) {
      alert("Por favor complete todos los campos")
      return
    }

    // Conectar a la base de datos
    const db = window.dbConnection.connect()

    // Insertar nuevo auto
    db.query("INSERT INTO autos (marca, modelo, anio, precio, stock) VALUES ($1, $2, $3, $4, $5) RETURNING id", [
      marca,
      modelo,
      anio,
      precio,
      stock,
    ])
      .then((result) => {
        if (result.rowCount > 0) {
          alert("Auto agregado correctamente")
          inventoryForm.reset()

          // Recargar lista de autos
          loadCarsList()
        } else {
          alert("Error al agregar el auto")
        }
      })
      .catch((error) => {
        console.error("Error:", error)
        alert("Error al agregar el auto")
      })

    // Cerrar conexión
    db.close()
  })

  // Cargar lista de autos
  loadCarsList()
}

// Cargar lista de autos
function loadCarsList() {
  const carsList = document.getElementById("cars-list")
  if (!carsList) return

  // Conectar a la base de datos
  const db = window.dbConnection.connect()

  // Obtener lista de autos
  db.query("SELECT * FROM autos ORDER BY id DESC").then((result) => {
    // Limpiar lista actual
    carsList.innerHTML = ""

    // Agregar cada auto a la lista
    result.rows.forEach((car) => {
      const carItem = document.createElement("tr")
      carItem.innerHTML = `
                    <td>${car.id}</td>
                    <td>${car.marca}</td>
                    <td>${car.modelo}</td>
                    <td>${car.anio}</td>
                    <td>$${car.precio}</td>
                    <td>${car.stock}</td>
                    <td>
                        <button class="btn-edit" data-id="${car.id}">Editar</button>
                        <button class="btn-delete" data-id="${car.id}">Eliminar</button>
                    </td>
                `
      carsList.appendChild(carItem)
    })

    // Agregar eventos a los botones
    addCarButtonEvents()
  })

  // Cerrar conexión
  db.close()
}

// Agregar eventos a los botones de la lista de autos
function addCarButtonEvents() {
  // Botones de edición
  const editButtons = document.querySelectorAll(".btn-edit")
  editButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const carId = this.getAttribute("data-id")
      editCar(carId)
    })
  })

  // Botones de eliminación
  const deleteButtons = document.querySelectorAll(".btn-delete")
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const carId = this.getAttribute("data-id")
      deleteCar(carId)
    })
  })
}

// Editar auto
function editCar(carId) {
  // En un entorno real, esto abriría un modal con los datos del auto para editar
  alert(`Editar auto con ID: ${carId}`)
}

// Eliminar auto
function deleteCar(carId) {
  if (confirm("¿Está seguro de que desea eliminar este auto?")) {
    // Conectar a la base de datos
    const db = window.dbConnection.connect()

    // Eliminar auto
    db.query("DELETE FROM autos WHERE id = $1", [carId])
      .then((result) => {
        if (result.rowCount > 0) {
          alert("Auto eliminado correctamente")

          // Recargar lista de autos
          loadCarsList()
        } else {
          alert("Error al eliminar el auto")
        }
      })
      .catch((error) => {
        console.error("Error:", error)
        alert("Error al eliminar el auto")
      })

    // Cerrar conexión
    db.close()
  }
}

// Inicializar gestión de usuarios
function initUserManagement() {
  // Implementación similar a la gestión de inventario
  console.log("Inicializando gestión de usuarios")
}

// Inicializar gestión de ventas
function initSalesManagement() {
  // Implementación similar a la gestión de inventario
  console.log("Inicializando gestión de ventas")
}

// Inicializar navegación
function initNavigation() {
  const navLinks = document.querySelectorAll(".admin-nav a")
  const sections = document.querySelectorAll(".admin-section")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      // Obtener el ID de la sección a mostrar
      const targetId = this.getAttribute("href").substring(1)

      // Ocultar todas las secciones
      sections.forEach((section) => {
        section.classList.remove("active")
      })

      // Mostrar la sección seleccionada
      document.getElementById(targetId).classList.add("active")

      // Actualizar clase activa en la navegación
      navLinks.forEach((navLink) => {
        navLink.classList.remove("active")
      })
      this.classList.add("active")
    })
  })
}

