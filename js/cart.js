const contenedorTargetas = document.getElementById("productos-container");

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
            });
            nuevoProducto.getElementsByTagName("button")[0].addEventListener("click", (e)=> {
                restarAlCarrito(producto);
                crearTargetasProductosInicio();
            });
        });
    }
    
}
crearTargetasProductosInicio();