// El código va aquí -> 
let txtName = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let btnAdd = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

let tabla = document.getElementById("tablaListaCompras");
let cuerpoTabla = tabla.getElementsByTagName("tbody");

let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");

let isValid = true;
let idTimeout;
let precio = 0;
let contador = 0;
let totalEnProductos = 0;
let costoTotal = 0;

btnClear.addEventListener("click", function (event) {
  event.preventDefault();
  txtName.value = " "; /* Para borrar lo de dentro del campo*/
  txtNumber.value = " ";
  cuerpoTabla[0].innerHTML = "";

  contador = 0;
  totalEnProductos = 0;
  costoTotal = 0;
  contadorProductos.innerText = "0";
  productosTotal.innerText = "0";
  precioTotal.innerText = "$ 0";

  localStorage.setItem("contadorProductos", contador);
  localStorage.setItem("totalEnProductos", totalEnProductos);
  localStorage.setItem("costoTotal", costoTotal.toFixed(2));
}); //Botón borrar

function validarCantidad() {
  if (txtNumber.value.length == 0) {
    return false;
  }
  if (isNaN(txtNumber.value)) {
    return false;
  }
  if (parseFloat(txtNumber.value) <= 0) {
    return false;
  }
  return true;
} /*Validar Cantidad*/

function getPrecio() {
  return Math.floor(Math.random() * 50 * 100) / 100;
}

btnAdd.addEventListener("click", function (event) {
  event.preventDefault();
  isValid = true;
  clearTimeout(idTimeout);
  alertValidacionesTexto.innerHTML = "";
  alertValidaciones.style.display = "none";
  let lista = "Los siguientes campos deben ser llenados correctamente: <ul>";
  //   txtName.value = txtName.value.trim(); nos permite borrar los espacios pero dentro de la función
  if (txtName.value.length < 2) {
    txtName.style.border = "solid thin red";
    lista += "<li>Se debe escribir un nombre válido </i>";
    // alertValidacionesTexto.innerHTML =
    //   "Se debe escribir un nombre válido. ";
    alertValidaciones.style.display = "block";
    isValid = false;
  } else {
    txtName.style.border = "";
  }
  if (!validarCantidad()) {
    txtNumber.style.border = "solid thin red";
    lista += "<li>Se debe escribir una cantidad válida </i>";
    // alertValidacionesTexto.innerHTML = "Se debe escribir un número válido.";
    alertValidaciones.style.display = "block";
    isValid = false;
  } else {
    txtNumber.style.border = "";
  }
  lista += "</ul>";
  alertValidacionesTexto.insertAdjacentHTML("beforeend", lista);
  idTimeout = setTimeout(function () {
    //Función que a cierto tiempo desaparece em este caso el recuadro AlertValidaciones
    alertValidaciones.style.display = "none";
  }, 5000);
  if (isValid) {
    precio = getPrecio(); //Obtener precio
    contador++;
    let row = `<tr>
                <th>${contador}</td>
                <td>${txtName.value}</td>
                <td>${txtNumber.value}</td>
                <td>${precio}</td>
            </tr>`;
    cuerpoTabla[0].insertAdjacentHTML("beforeend", row);
    contadorProductos.innerText = contador;
    totalEnProductos += parseFloat(txtNumber.value);
    productosTotal.innerText = totalEnProductos;
    costoTotal += precio * parseFloat(txtNumber.value);
    precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
    localStorage.setItem("contadorProductos", contador);
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem("costoTotal", costoTotal.toFixed(2));
    txtName.value = "";
    txtNumber.value = "";
    txtName.focus();
  }
}); // Botón agregar click

txtNumber.addEventListener("blur", function (event) {
  event.preventDefault();
  txtNumber.value = txtNumber.value.trim();
}); //txtnumber. blur
txtName.addEventListener("blur", function (event) {
  event.preventDefault();
  txtName.value = txtName.value.trim();
});

window.addEventListener("load", function (event) {
  if (localStorage.getItem("contadorProductos") == null) {
    localStorage.setItem("contadorProductos", "0");
  }
  if (localStorage.getItem("totalEnProductos") == null) {
    localStorage.setItem("totalEnProductos", "0");
  }
  if (localStorage.getItem("costoTotal") == null) {
    localStorage.setItem("costoTotal", "0.0");
  }
  contador = parseInt(localStorage.getItem("contadorProductos"));
  totalEnProductos = parseInt(localStorage.getItem("totalEnProductos"));
  costoTotal = parseFloat(localStorage.getItem("costoTotal"));

  contadorProductos.innerText = contador;
  productosTotal.innerText = totalEnProductos;
  precioTotal.innerText = `$ ${costoTotal}`;
});