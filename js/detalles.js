document.addEventListener("DOMContentLoaded", () => {
    const productosContainer = document.getElementById("productos-container");

    // Delegación de eventos para capturar clics en imágenes dentro de productos
    productosContainer.addEventListener("click", (event) => {
        if (event.target.tagName === "IMG") {
            const productoElemento = event.target.closest(".targeta-producto");

            if (productoElemento) {
                const nombre = productoElemento.querySelector("h3").textContent;
                const precio = productoElemento.querySelector("p").textContent;
                const imgSrc = event.target.src;

                // Obtener la descripción desde el atributo data-descripcion
                const descripcion = productoElemento.getAttribute("data-descripcion");

                mostrarDetalles({ nombre, precio, img: imgSrc, descripcion });
            }
        }
    });

    function mostrarDetalles(producto) {
        // Si ya existe un modal abierto, lo eliminamos
        const modalExistente = document.querySelector(".targeta-detalles");
        if (modalExistente) {
            modalExistente.remove();
        }

        // Agregar la clase para activar el blur en el fondo
        document.body.classList.add("modal-open");

        // Crear la tarjeta emergente
        const detalles = document.createElement("div");
        detalles.classList.add("targeta-detalles");
        detalles.innerHTML = `
            <div class="detalles-contenido">
                <img src="${producto.img}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p> <!-- Mostrar la descripción -->
                <p>${producto.precio}</p>
                <button id="cerrarDetalles">Cerrar</button>
            </div>
        `;

        document.body.appendChild(detalles);

        // Cerrar detalles cuando se presione el botón
        document.getElementById("cerrarDetalles").addEventListener("click", () => {
            detalles.remove();
            // Quitar la clase para desactivar el blur
            document.body.classList.remove("modal-open");
        });
    }
});
