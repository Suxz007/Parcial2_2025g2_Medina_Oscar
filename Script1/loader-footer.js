// Script para cargar el footer unificado en todas las páginas
document.addEventListener("DOMContentLoaded", () => {
    // Función para cargar el footer
    function loadFooter() {
        fetch("footer.html")
            .then((response) => response.text())
            .then((data) => {
                // Buscar el elemento donde insertar el footer
                const footerContainer = document.getElementById("container")
                if (footerContainer) {
                    footerContainer.innerHTML = data
                } else {
                    // Si no existe el contenedor, insertar antes del cierre del body
                    document.body.insertAdjacentHTML("beforeend", data)
                }
            })
            .catch((error) => {
                console.error("Error cargando el footer:", error)
            })
    }

    // Cargar el footer
    loadFooter()
})
