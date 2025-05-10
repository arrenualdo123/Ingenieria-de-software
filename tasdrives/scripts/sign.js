document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container")
  const registerBtn = document.getElementById("register")
  const loginBtn = document.getElementById("login")

  if (registerBtn) {
    registerBtn.addEventListener("click", () => {
      container.classList.add("active")
    })
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      container.classList.remove("active")
    })
  }

  // Formulario de registro
  const signUpForm = document.getElementById("sign-up-form")
  if (signUpForm) {
    signUpForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const name = document.getElementById("signup-name").value
      const email = document.getElementById("signup-email").value
      const password = document.getElementById("signup-password").value

      // Aquí iría la lógica de registro
      console.log("Registro:", { name, email, password })

      // Simulación de registro exitoso
      alert("¡Registro exitoso! Ahora puedes iniciar sesión.")
      container.classList.remove("active")
    })
  }

  // Formulario de inicio de sesión
  const signInForm = document.getElementById("sign-in-form")
  if (signInForm) {
    signInForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("signin-email").value
      const password = document.getElementById("signin-password").value

      // Aquí iría la lógica de inicio de sesión
      console.log("Inicio de sesión:", { email, password })

      // Simulación de inicio de sesión exitoso
      alert("¡Inicio de sesión exitoso!")
      window.location.href = "index.html"
    })
  }
})

