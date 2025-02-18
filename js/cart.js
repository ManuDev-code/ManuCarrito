const contenedorTargetas = document.getElementById("productos-container");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");

function crearTargetasProductosInicio(){
    contenedorTargetas.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem("productos"));
    console.log(productos)

    if(productos && productos.length > 0){ /*Verifica que sí hayan prodcutos en el carrito para mostrarlos*/
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
