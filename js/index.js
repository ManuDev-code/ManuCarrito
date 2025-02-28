const contenedorTargetas = document.getElementById("productos-container")
function crearTargetasProductosInicio(productos){
    productos.forEach(producto => {
        const nuevoProducto = document.createElement("div");
        nuevoProducto.classList = "targeta-producto";

        // Guardar la descripción en un atributo personalizado
        nuevoProducto.setAttribute("data-descripcion", producto.descripcion || "Sin descripción disponible");
        
        nuevoProducto.innerHTML = `
            <img src="${producto.img}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button>Agregar al carrito</button>
        `
        contenedorTargetas.appendChild(nuevoProducto);
        nuevoProducto.getElementsByTagName("button")[0].addEventListener("click", ()=> agregarAlCarrito(producto));
        
    
    });
}
crearTargetasProductosInicio(Productos);