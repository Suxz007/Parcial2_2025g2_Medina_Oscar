// Inicialización cuando el DOM está listo
document.addEventListener("DOMContentLoaded", () => {
    // Inicializar todas las funcionalidades
    initNavbar()
    initAnimations()
    initContactForm()
    initCounters()
    initSmoothScroll()
    createScrollToTopButton() // Inicializar botón scroll to top
})
// Funcionalidad del Navbar
function initNavbar() {
    const navbar = document.querySelector(".navbar")
    const bootstrap = window.bootstrap // Declare the bootstrap variable

    // Cambiar estilo del navbar al hacer scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled")
        } else {
            navbar.classList.remove("scrolled")
        }
    })

    // Cerrar navbar móvil al hacer click en un enlace
    const navLinks = document.querySelectorAll(".nav-link")
    const navbarCollapse = document.querySelector(".navbar-collapse")

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (navbarCollapse.classList.contains("show")) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse)
                bsCollapse.hide()
            }
        })
    })
}

// Animaciones al hacer scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate__animated")

                // Agregar clases de animación específicas
                if (entry.target.classList.contains("fade-in-up")) {
                    entry.target.classList.add("animate__fadeInUp")
                }
                if (entry.target.classList.contains("fade-in-left")) {
                    entry.target.classList.add("animate__fadeInLeft")
                }
                if (entry.target.classList.contains("fade-in-right")) {
                    entry.target.classList.add("animate__fadeInRight")
                }

                observer.unobserve(entry.target)
            }
        })
    }, observerOptions)

    // Observar elementos con clases de animación
    const animatedElements = document.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right")
    animatedElements.forEach((el) => observer.observe(el))
}


// Agrega la clase de Bootstrap para mostrar los estilos de validación

function initContactForm() {
    const contactForm = document.getElementById("contactForm")

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault()

            // Validar formulario
            if (validateContactForm()) {
                // Simular envío del formulario
                showSuccessMessage()
                contactForm.reset()
                contactForm.classList.remove("was-validated")
            } else {
                contactForm.classList.add("was-validated")
            }
        })
    }
}

// Validación del formulario de contacto
function validateContactForm() {
    const form = document.getElementById("contactForm")
    const nombre = document.getElementById("nombre")
    const correo = document.getElementById("correo")
    const asunto = document.getElementById("asunto")
    const mensaje = document.getElementById("mensaje")

    let isValid = true

    // Validar nombre
    if (!nombre.value.trim()) {
        isValid = false
        showFieldError(nombre, "Por favor ingresa tu nombre.")
    } else {
        showFieldSuccess(nombre)
    }

    // Validar correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!correo.value.trim() || !emailRegex.test(correo.value)) {
        isValid = false
        showFieldError(correo, "Por favor ingresa un correo válido.")
    } else {
        showFieldSuccess(correo)
    }

    // Validar asunto
    if (!asunto.value.trim()) {
        isValid = false
        showFieldError(asunto, "Por favor ingresa el asunto.")
    } else {
        showFieldSuccess(asunto)
    }

    // Validar mensaje
    if (!mensaje.value.trim() || mensaje.value.trim().length < 10) {
        isValid = false
        showFieldError(mensaje, "Por favor ingresa un mensaje de al menos 10 caracteres.")
    } else {
        showFieldSuccess(mensaje)
    }

    return isValid
}

// Mostrar error en campo
function showFieldError(field, message) {
    field.classList.add("is-invalid")
    field.classList.remove("is-valid")

    const feedback = field.nextElementSibling
    if (feedback && feedback.classList.contains("invalid-feedback")) {
        feedback.textContent = message
    }
}

// Mostrar éxito en campo
function showFieldSuccess(field) {
    field.classList.add("is-valid")
    field.classList.remove("is-invalid")
}

// Mostrar mensaje de éxito
function showSuccessMessage() {
    // Crear modal de éxito
    const successModal = document.createElement("div")
    successModal.className = "modal fade"
    successModal.innerHTML =
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-success text-white">
                    <h5 class="modal-title">
                        <i class="fas fa-check-circle me-2"></i>
                        ¡Mensaje Enviado!
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center">
                    <p class="mb-0">Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>

    document.body.appendChild(successModal)
    const modal = new window.bootstrap.Modal(successModal) // Use window.bootstrap
    modal.show()

    // Eliminar modal después de cerrarlo
    successModal.addEventListener("hidden.bs.modal", () => {
        document.body.removeChild(successModal)
    })
}

// Contador animado
function initCounters() {
    const counters = document.querySelectorAll(".counter")

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target)
                    counterObserver.unobserve(entry.target)
                }
            })
        },
        { threshold: 0.5 },
    )

    counters.forEach((counter) => counterObserver.observe(counter))
}

// Animar contador
function animateCounter(counter) {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const duration = 2000 // 2 segundos
    const increment = target / (duration / 16) // 60 FPS
    let current = 0

    const timer = setInterval(() => {
        current += increment
        if (current >= target) {
            current = target
            clearInterval(timer)
        }
        counter.textContent = Math.floor(current)
    }, 16)
}

// Scroll suave
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]')

    links.forEach((link) => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href")

            if (href === "#") return

            const target = document.querySelector(href)
            if (target) {
                e.preventDefault()

                const offsetTop = target.offsetTop - 80 // Compensar navbar fijo

                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth",
                })
            }
        })
    })
}

// Utilidades adicionales
const Utils = {
    // Debounce function
    debounce: (func, wait) => {
        let timeout
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout)
                func(...args)
            }
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
        }
    },

    // Throttle function
    throttle: (func, limit) => {
        let inThrottle
        return function () {
            const args = arguments

            if (!inThrottle) {
                func.apply(this, args)
                inThrottle = true
                setTimeout(() => (inThrottle = false), limit)
            }
        }
    },

    // Detectar dispositivo móvil
    isMobile: () => window.innerWidth <= 768,

    // Scroll to top
    scrollToTop: () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    },
}

// Botón scroll to top (opcional)
function createScrollToTopButton() {
    const button = document.createElement("button")
    button.innerHTML = '<i class="fas fa-arrow-up"></i>'
    button.className = "btn btn-primary position-fixed"
    button.style.cssText = `
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: none;
    `

    button.addEventListener("click", Utils.scrollToTop)

    // Mostrar/ocultar botón según scroll
    window.addEventListener(
        "scroll",
        Utils.throttle(() => {
            if (window.scrollY > 300) {
                button.style.display = "block"
            } else {
                button.style.display = "none"
            }
        }, 100),
    )

    document.body.appendChild(button)
}

// Manejo de errores global
window.addEventListener("error", (e) => {
    console.error("Error en la aplicación:", e.error)
})

// Performance monitoring
window.addEventListener("load", () => {
    const loadTime = performance.now()
    console.log(`Página cargada en ${Math.round(loadTime)}ms`)
})