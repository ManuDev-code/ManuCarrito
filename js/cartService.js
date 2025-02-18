function agregarAlCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("productos")) || [];
    console.log(memoria);

    let cuenta = 0;

    if (memoria.length === 0) { /* Si no hay productos en memoria */
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        localStorage.setItem("productos", JSON.stringify([nuevoProducto]));
        cuenta = 1;
    } else {
        const indiceProducto = memoria.findIndex(item => item.id === producto.id);
        console.log(indiceProducto);

        if (indiceProducto === -1) { /* Si el producto no existe en el carrito */
            memoria.push(getNuevoProductoParaMemoria(producto));
            cuenta = 1;
        } else { /* Si ya existe, suma 1 a la cantidad */
            memoria[indiceProducto].cantidad++;
            cuenta = memoria[indiceProducto].cantidad;
        }

        localStorage.setItem("productos", JSON.stringify(memoria));
    }
    actualizarNumeroCarrito(); //Asegurar que siempre actualizamos el número del carrito
    return cuenta; // Retornamos la cuenta correcta
}


/*Función para restarle al carrito*/
function restarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem("productos"));
    const indiceProducto = memoria.findIndex(item => item.id === producto.id);
    if(memoria[indiceProducto].cantidad == 1){
        memoria.splice(indiceProducto,1) /*saca un elemento del array*/
    }else {
        memoria[indiceProducto].cantidad--;
    }
    localStorage.setItem("productos", JSON.stringify(memoria))
    actualizarNumeroCarrito();
}

/*Toma un producto, le pone cantidad 1 y lo devuelve */
function getNuevoProductoParaMemoria(producto){
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;

}

/*Actualizar número del carrito*/
const cuentaCarritoElement = document.getElementById("cuenta-carrito");
function actualizarNumeroCarrito(){
    /*Contamos cuántos productos hay en la memoria*/
    const memoria = JSON.parse(localStorage.getItem("productos"));
    const cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0) /*Toma un array y lo reduce a un solo valor, arranca el 0*/
    cuentaCarritoElement.innerText = cuenta;
}
actualizarNumeroCarrito();