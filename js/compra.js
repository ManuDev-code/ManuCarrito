document.addEventListener("DOMContentLoaded", () => {
    const checkoutForm = document.getElementById("checkout-form");

    checkoutForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const direccion = document.getElementById("direccion").value;
        const metodoPago = document.getElementById("metodo-pago").value;

        if (!nombre || !email || !direccion || !metodoPago) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        alert("¡Compra realizada con éxito! Recibirás un correo con los detalles.");
        checkoutForm.reset();
    });
});
