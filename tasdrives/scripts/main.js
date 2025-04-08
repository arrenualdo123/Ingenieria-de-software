document.addEventListener("DOMContentLoaded", () => {
  // Inicializar carrito de compras
  initCart()

  // Inicializar modales de detalles de autos
  initCarDetails()

  // Inicializar filtros de tienda
  initShopFilters()

  // Inicializar formulario de contacto
  initContactForm()

  // Inicializar mapa en la página de contacto
  if (document.querySelector(".map-placeholder")) {
    initMap()
  }
})

// Carrito de compras
function initCart() {
  const cartIcon = document.querySelector(".nav-icons a:last-child")
  if (!cartIcon) return

  // Crear el dropdown del carrito
  const cartDropdown = document.createElement("div")
  cartDropdown.className = "cart-dropdown"
  cartDropdown.innerHTML = `
        <div class="cart-items">
            <div class="empty-cart">Tu carrito está vacío</div>
        </div>
        <div class="cart-total">
            <span>Total:</span>
            <span>$0.00</span>
        </div>
        <button class="btn btn-primary btn-full">Proceder al pago</button>
    `

  // Añadir el dropdown al DOM
  const navIcons = document.querySelector(".nav-icons")
  navIcons.style.position = "relative"
  navIcons.appendChild(cartDropdown)

  // Toggle del carrito
  cartIcon.addEventListener("click", (e) => {
    e.preventDefault()
    cartDropdown.classList.toggle("active")
  })

  // Cerrar el carrito al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (!cartIcon.contains(e.target) && !cartDropdown.contains(e.target)) {
      cartDropdown.classList.remove("active")
    }
  })

  // Añadir funcionalidad a los botones "Ver detalles"
  const detailButtons = document.querySelectorAll(".car-price-action .btn")
  detailButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const card = this.closest(".car-card")
      const title = card.querySelector("h3").textContent
      const price = card.querySelector(".car-price").textContent
      const img = card.querySelector(".car-image").getAttribute("src")

      showCarDetails(title, price, img)
    })
  })
}

// Detalles de autos
function initCarDetails() {
  // Crear el modal de detalles
  const modal = document.createElement("div")
  modal.className = "car-details-modal"
  modal.innerHTML = `
        <div class="car-details-content">
            <button class="car-details-close">&times;</button>
            <div class="car-details-gallery">
                <div class="car-details-main-image">
                    <img src="/placeholder.svg" alt="Auto">
                </div>
                <div class="car-details-thumbnails">
                    <div class="car-details-thumbnail">
                        <img src="/placeholder.svg" alt="Thumbnail 1">
                    </div>
                    <div class="car-details-thumbnail">
                        <img src="/placeholder.svg" alt="Thumbnail 2">
                    </div>
                    <div class="car-details-thumbnail">
                        <img src="/placeholder.svg" alt="Thumbnail 3">
                    </div>
                </div>
            </div>
            <div class="car-details-info">
                <div class="car-details-description">
                    <h2></h2>
                    <p>Este vehículo de alta gama combina elegancia, rendimiento y tecnología de vanguardia. Con un diseño aerodinámico y acabados de primera calidad, este auto ofrece una experiencia de conducción excepcional.</p>
                    <div class="car-details-specs">
                        <div class="car-details-spec">
                            <span class="car-details-spec-label">Año</span>
                            <span class="car-details-spec-value">2023</span>
                        </div>
                        <div class="car-details-spec">
                            <span class="car-details-spec-label">Kilometraje</span>
                            <span class="car-details-spec-value">15,000 km</span>
                        </div>
                        <div class="car-details-spec">
                            <span class="car-details-spec-label">Motor</span>
                            <span class="car-details-spec-value">2.0L Turbo</span>
                        </div>
                        <div class="car-details-spec">
                            <span class="car-details-spec-label">Transmisión</span>
                            <span class="car-details-spec-value">Automática</span>
                        </div>
                        <div class="car-details-spec">
                            <span class="car-details-spec-label">Combustible</span>
                            <span class="car-details-spec-value">Gasolina</span>
                        </div>
                        <div class="car-details-spec">
                            <span class="car-details-spec-label">Color</span>
                            <span class="car-details-spec-value">Negro</span>
                        </div>
                    </div>
                </div>
                <div class="car-details-price-box">
                    <div class="car-details-price"></div>
                    <div class="car-details-actions">
                        <button class="btn btn-primary btn-full">Añadir al carrito</button>
                        <button class="btn btn-outline btn-full">Programar prueba de manejo</button>
                    </div>
                </div>
            </div>
        </div>
    `

  // Añadir el modal al DOM
  document.body.appendChild(modal)

  // Cerrar el modal
  const closeButton = modal.querySelector(".car-details-close")
  closeButton.addEventListener("click", () => {
    modal.classList.remove("active")
  })

  // Cerrar el modal al hacer clic fuera
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active")
    }
  })

  // Añadir funcionalidad a los botones "Ver detalles"
  const detailButtons = document.querySelectorAll(".car-price-action .btn")
  detailButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const card = this.closest(".car-card")
      const title = card.querySelector("h3").textContent
      const price = card.querySelector(".car-price").textContent
      const img = card.querySelector(".car-image").getAttribute("src")

      showCarDetails(title, price, img)
    })
  })
}

function showCarDetails(title, price, img) {
  const modal = document.querySelector(".car-details-modal")
  const modalTitle = modal.querySelector("h2")
  const modalPrice = modal.querySelector(".car-details-price")
  const modalImg = modal.querySelector(".car-details-main-image img")
  const thumbnails = modal.querySelectorAll(".car-details-thumbnail img")

  modalTitle.textContent = title
  modalPrice.textContent = price
  modalImg.setAttribute("src", img)

  // Establecer las miniaturas (en un caso real, serían diferentes imágenes)
  thumbnails.forEach((thumb) => {
    thumb.setAttribute("src", img)
  })

  modal.classList.add("active")
}

// Filtros de tienda
function initShopFilters() {
  const filterOptions = document.querySelectorAll(".filter-option input")
  if (!filterOptions.length) return

  filterOptions.forEach((option) => {
    option.addEventListener("change", function () {
      // Aquí iría la lógica de filtrado real
      console.log("Filtro cambiado:", this.id, "Estado:", this.checked)
    })
  })

  const priceButton = document.querySelector(".filter-group .btn")
  if (priceButton) {
    priceButton.addEventListener("click", () => {
      const minPrice = document.querySelector(".price-range input:first-child").value
      const maxPrice = document.querySelector(".price-range input:last-child").value

      // Aquí iría la lógica de filtrado por precio
      console.log("Filtro de precio:", minPrice, "-", maxPrice)
    })
  }

  const sortSelect = document.querySelector(".sort-select")
  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      // Aquí iría la lógica de ordenamiento
      console.log("Ordenar por:", this.value)
    })
  }
}

// Formulario de contacto
function initContactForm() {
  const contactForm = document.querySelector(".contact-form")
  if (!contactForm) return

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const name = this.querySelector("#name").value
    const email = this.querySelector("#email").value
    const subject = this.querySelector("#subject").value
    const message = this.querySelector("#message").value

    // Aquí iría la lógica de envío del formulario
    console.log("Formulario enviado:", { name, email, subject, message })

    // Mostrar mensaje de éxito
    alert("¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.")
    this.reset()
  })
}

// Inicializar mapa
function initMap() {
  const mapPlaceholder = document.querySelector(".map-placeholder")
  if (!mapPlaceholder) return

  // En un caso real, aquí se inicializaría un mapa como Google Maps o Leaflet
  mapPlaceholder.innerHTML =
    '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#f0f0f0;"><p>Mapa interactivo cargado</p></div>'
}

// Función para añadir al carrito
function addToCart(title, price, img) {
  const cartItems = document.querySelector(".cart-items")
  const emptyCart = cartItems.querySelector(".empty-cart")

  if (emptyCart) {
    cartItems.innerHTML = ""
  }

  const cartItem = document.createElement("div")
  cartItem.className = "cart-item"
  cartItem.innerHTML = `
        <div class="cart-item-image">
            <img src="${img}" alt="${title}">
        </div>
        <div class="cart-item-details">
            <div class="cart-item-title">${title}</div>
            <div class="cart-item-price">${price}</div>
        </div>
        <div class="cart-item-remove">&times;</div>
    `

  cartItems.appendChild(cartItem)

  // Actualizar el total
  updateCartTotal()

  // Añadir funcionalidad para eliminar
  const removeButton = cartItem.querySelector(".cart-item-remove")
  removeButton.addEventListener("click", () => {
    cartItem.remove()

    // Si no hay items, mostrar mensaje de carrito vacío
    if (cartItems.children.length === 0) {
      cartItems.innerHTML = '<div class="empty-cart">Tu carrito está vacío</div>'
    }

    // Actualizar el total
    updateCartTotal()
  })
}

// Actualizar el total del carrito
function updateCartTotal() {
  const cartItems = document.querySelectorAll(".cart-item")
  let total = 0

  cartItems.forEach((item) => {
    const priceText = item.querySelector(".cart-item-price").textContent
    const price = Number.parseFloat(priceText.replace("$", "").replace(",", ""))
    total += price
  })

  const cartTotal = document.querySelector(".cart-total span:last-child")
  cartTotal.textContent = `$${total.toFixed(2)}`
}

