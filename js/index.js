// productos de la API
let productos = [];
fetch("https://dummyjson.com/products")
  .then((response) => response.json())
  .then((data) => {
    productos = data.products;
    mostrarProductos(productos);
  });

// carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const buscarEnCarrito = (id) => 
  carrito.find((unProducto) => parseInt(unProducto.id ) == id);
 

const mostrarProductos = (productos) => {
  const listaProductos = document.querySelector(".productos-container");
  listaProductos.innerHTML
  productos.forEach((item) => {
    let itemCarrito= buscarEnCarrito(item.id);
    // cantidad del item en el carrito si esta. Sino 1
    const cantidadCarrito = itemCarrito ? itemCarrito.cantidad : 1
    const producto = document.createElement("article");
    producto.classList.add("card");
    producto.classList.add("producto");
    producto.innerHTML = `
          <img class="card-img-top imagen-tarjeta" src="${item.thumbnail}"
            alt="Producto ${item.title}" />
          <div class="card-body">
            <h5 class="titulo-tarjeta">${item.title}</h5>
            <div class="precio">${item.price}</div>
            <div id="cantidad-${item.id}" class="cantidad">
              <button class="btn-menos">&minus;</button>
              <input class="btn-cantidad" data-id=${item.id} type="number" min="1" max="${item.stock}" value="${cantidadCarrito}">
              <button class="btn-mas">&plus;</button>
            </div>
            <a data-id=${item.id} data-nombre="${item.title}" data-precio=${item.price} data-imagen="${item.thumbnail}"
            class="btn btn-primary btn-pink btn-agregar">Agregar</a>
          </div>
        `;
    listaProductos.appendChild(producto);
    
    const botonAgregar = producto.querySelector(".btn-agregar");
    botonAgregar.addEventListener("click", agregarProducto);

    if (itemCarrito) {
      const divCantidad = producto.querySelector(".cantidad");
      divCantidad.style.display = "block";      
      botonAgregar.style.display = "none";
    } 
  });
};

const agregarProducto = (event) => {
  const btnAgregar = event.target;
  
  let producto = {
    id: btnAgregar.getAttribute("data-id"),
    nombre: btnAgregar.getAttribute("data-nombre"),
    precio: btnAgregar.getAttribute("data-precio"),
    imagen: btnAgregar.getAttribute("data-imagen"),
    cantidad: 1
  };
  
  // guardar en carrito
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  
  // alterno visibilidad de elementos
  const divCantidad = document.querySelector(`#cantidad-${producto.id}`);
  divCantidad.style.display = "block";
  btnAgregar.style.display = "none";
};
