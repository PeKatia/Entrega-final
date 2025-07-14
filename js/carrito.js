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
              <button data-id=${item.id} data-value="-1" class="btn-menos">&minus;</button>
              <input id="cantidad-${item.id}"  type="number" disabled
              value="${item.cantidad}" min="1" max="99">
              <button data-id=${item.id} data-value="1" class="btn-mas">&plus;</button>
            </div>           
          <div>
            <p>Precio</p>
            <p>$${(item.precio * item.cantidad).toFixed(2)}</p>
          </div>
          <button data-id=${item.id} type="button" 
          class="btn btn-primary btn-pink boton-eliminar">&#10006;</button>
        </div>
        `;
    // agrego el article "producto" al contenedor
    contenedorCarrito.appendChild(producto);

    const botonEliminar = producto.querySelector(".boton-eliminar");
    botonEliminar.addEventListener("click", eliminarProducto);

    const botonMenos = producto.querySelector(".btn-menos");
    botonMenos.addEventListener("click", modificarCantidad);

    const botonMas = producto.querySelector(".btn-mas");
    botonMas.addEventListener("click", modificarCantidad);
  });
};
  const modificarCantidad = (event) => {
   let btn = event.target;
   let id = btn.getAttribute("data-id");
   let valor = btn.getAttribute("data-value");
   const cantidad = document.getElementById("cantidad-" + id);
   cantidad.value = parseInt(cantidad.value) + parseInt(valor);
   const validarId = (item) => item.id == id;
   const indiceCarrito = carrito.findIndex(validarId);
   carrito[indiceCarrito].cantidad = cantidad.value;
   localStorage.setItem("carrito", JSON.stringify(carrito));

   mostrarTotalCompra();


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
const vaciarProductos = () => {
  const listaArticulos = document.querySelector(".contenedor-carrito");
  listaArticulos.innerHTML = `Tu carrito esta vacio`;
  let contenedorCarrito = document.querySelector(".resumen-carrito");
  contenedorCarrito.style.display = "none";
  localStorage.removeItem("carrito");
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
      <button   type="button" class="btn btn-primary btn-pink btn-vaciarCarrito" >
        Vaciar carrito
      </button>
  
      `;

  // muestro elemento resumen carrito
  contenedorCarrito.style.display = "block";

  const botonVaciarCarrito =
    contenedorCarrito.querySelector(".btn-vaciarCarrito");
  botonVaciarCarrito.addEventListener("click", vaciarProductos);
};

mostrarCarrito();
mostrarTotalCompra();
