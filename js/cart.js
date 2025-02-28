const contenedorTargetas = document.getElementById("productos-container");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const reiniciarElement = document.getElementById("reiniciar");

function crearTargetasProductosInicio(){
    contenedorTargetas.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem("productos"));
    console.log(productos)

    if(productos && productos.length > 0){ /*Verifica que sí hayan productos en el carrito para mostrarlos*/
        productos.forEach(producto => {
            const nuevoProducto = document.createElement("div");
            nuevoProducto.classList = "targeta-producto";
            nuevoProducto.innerHTML = `
                <img src="${producto.img}">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio}</p>
                <div class="quantity-controls">
                    <button class="menos">-</button>
                    <span class="cantidad">${producto.cantidad}</span>
                    <button class="mas">+</button>
                </div>
            `
            contenedorTargetas.appendChild(nuevoProducto);
            nuevoProducto.getElementsByTagName("button")[1].addEventListener("click", (e)=> {
                const cuentaElement = e.target.parentElement.getElementsByTagName("span")[0];
                cuentaElement.innerText = agregarAlCarrito(producto);
                actualizarTotales();
            });
            nuevoProducto.getElementsByTagName("button")[0].addEventListener("click", (e)=> {
                restarAlCarrito(producto);
                crearTargetasProductosInicio();
                actualizarTotales();
            });
        });
    }
    
}
crearTargetasProductosInicio();
actualizarTotales();

function actualizarTotales(){
    const productos = JSON.parse(localStorage.getItem("productos"));

    if (productos && productos.length > 0) {
        let unidades = 0;
        let precio = 0;
        
        productos.forEach(producto => {
            unidades += producto.cantidad;
            precio += producto.precio * producto.cantidad;
        });

        unidadesElement.innerText = unidades;
        precioElement.innerText = precio
    } else {
        // Si no hay productos en el carrito, establece los valores en 0
        unidadesElement.innerText = "0";
        precioElement.innerText = "0.00";
    }
    revisarMensajeVacio();
}

function revisarMensajeVacio(){
    const productos = JSON.parse(localStorage.getItem("productos"));
    const carritoVacioElement = document.getElementById("carrito-vacio");

    if (productos && productos.length > 0) {
        carritoVacioElement.classList.add("escondido"); // Oculta el mensaje; 
    } else {
        carritoVacioElement.classList.remove("escondido"); // Muestra el mensaje
    }
}
revisarMensajeVacio();

reiniciarElement.addEventListener("click", reiniciarCarrito);

function reiniciarCarrito() {
    localStorage.removeItem("productos"); // Elimina los productos del localStorage
    actualizarTotales(); // Actualiza los totales a 0
    revisarMensajeVacio(); // Muestra el mensaje de "Carrito vacío"
    crearTargetasProductosInicio(); // Refresca la lista de productos en el carrito
}


//Función para el botón de comprar
document.addEventListener("DOMContentLoaded", () => {
    const comprarBtn = document.getElementById("comprar");

    function actualizarEstadoBotonComprar() {
        const productosEnCarrito = JSON.parse(localStorage.getItem("productos")) || [];
        if (productosEnCarrito.length > 0) {
            comprarBtn.disabled = false;
        } else {
            comprarBtn.disabled = true;
        }
    }

    // Llamar a la función al cargar la página
    actualizarEstadoBotonComprar();

    comprarBtn.addEventListener("click", () => {
        const productosEnCarrito = JSON.parse(localStorage.getItem("productos")) || [];

        if (productosEnCarrito.length === 0) {
            alert("El carrito está vacío. Agrega productos antes de comprar.");
            return;
        }

        // Redirigir a la página de compra
        window.location.href = "../html/compra.html";
    });

    // Asegurar que el botón se actualice cuando cambien los productos
    reiniciarElement.addEventListener("click", () => {
        reiniciarCarrito();
        actualizarEstadoBotonComprar();
    });

    function actualizarTotales() {
        const productos = JSON.parse(localStorage.getItem("productos")) || [];

        if (productos.length > 0) {
            let unidades = 0;
            let precio = 0;

            productos.forEach(producto => {
                unidades += producto.cantidad;
                precio += producto.precio * producto.cantidad;
            });

            unidadesElement.innerText = unidades;
            precioElement.innerText = precio;
            comprarBtn.disabled = false; // Habilitar botón si hay productos
        } else {
            unidadesElement.innerText = "0";
            precioElement.innerText = "0.00";
            comprarBtn.disabled = true; // Deshabilitar botón si el carrito está vacío
        }
        revisarMensajeVacio();
    }

    // Asegurar que la función se llame cuando se actualizan los totales
    actualizarTotales();
});

