let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const eliminarProducto = (event) => {
  const btnEliminar = event.target;
  const id = btnEliminar.getAttribute("data-id");
  const articuloProducto = document.getElementById("producto-" + id);
  articuloProducto.remove();

  //borrar de la logica
  const indiceCarrito = carrito.findIndex((item) => item.id == id);
  carrito.splice(indiceCarrito, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));

  mostrarCarrito();
  mostrarTotalCompra();
};

const mostrarCarrito = () => {
  // seleccionamos del DOM el contenedor
  let contenedorCarrito = document.querySelector(".contenedor-carrito");

  // carrito vacio
  if (carrito.length === 0) {
    const pCarritoVacio = document.createElement("p");
    pCarritoVacio.innerHTML = "Tu carrito esta vacio";
    contenedorCarrito.appendChild(pCarritoVacio);
    return;
  }

  // limpio contenedor carrito
  contenedorCarrito.innerHTML = "";

  carrito.forEach((item) => {
    const producto = document.createElement("article");
    producto.classList.add("producto");
    producto.id = `producto-${item.id}`;
    producto.innerHTML = `
         <div class="tarjeta-producto">
          <img src="${item.imagen}" />
          <div>
            <h5 class="tarjeta-titulo">${item.nombre}</h5>
            <span>Precio unidad:</span>
            <span>$${item.precio} </span>
          </div>
            <div class="cantidad">
              <button class="btn-menos">&minus;</button>
              <input type="number" value="${item.cantidad}" min="1" max="99">
              <button class="btn-mas">&plus;</button>
            </div>           
          <div>
            <p>Precio</p>
            <p>$${(item.precio * item.cantidad).toFixed(2)}</p>
          </div>
          <button data-id=${item.id}
            type="button" class="btn btn-primary btn-pink boton-eliminar">&#10006;</button>
        </div>
        `;
    // agrego el article "producto" al contenedor
    contenedorCarrito.appendChild(producto);

    const botonEliminar = producto.querySelector(".boton-eliminar");
    botonEliminar.addEventListener("click", eliminarProducto);
  });
};

const calcularPrecioCompra = () => {
  return carrito
    .reduce(
      (acumulador, unProducto) =>
        acumulador +
        parseInt(unProducto.cantidad) * parseFloat(unProducto.precio),
      0
    )
    .toFixed(2);
};

const calcularCantidadCompra = () => {
  return carrito.reduce(
    (acumulador, unProducto) => acumulador + parseInt(unProducto.cantidad),
    0
  );
};

const mostrarTotalCompra = () => {
  let contenedorCarrito = document.querySelector(".resumen-carrito");

  if (carrito.length === 0) {
    contenedorCarrito.style.display = "none";
    return;
  }

  const precio = calcularPrecioCompra();
  const cantidad = calcularCantidadCompra();

  contenedorCarrito.innerHTML = `
      <h2>Resumen de compra</h2>
      <p>Cantidad de productos comprados:
      <span class="cantidad-total">${cantidad}</span></p>
      <p>Total compra: <span class="precio-total">$${precio}</span></p>
      
      <button type="submit" class="btn btn-primary btn-pink">
        Finalizar compra
      </button>
      <button type="button" class="btn btn-primary btn-pink">
        Vaciar carrito
      </button>

      `;

  // muestro elemento resumen carrito
  contenedorCarrito.style.display = "block";
};

mostrarCarrito();
mostrarTotalCompra();
