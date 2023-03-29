// El código va aquí -> 
let txtName = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let btnAdd = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

btnClear.addEventListener("click", function (event) {
  event.preventDefault();
  txtName.value = " "; /* Para borrar lo de dentro del campo*/
  txtNumber.value = " ";
}); //Botón borrar

btnAdd.addEventListener("click", function (event) {
  event.preventDefault();
  alertValidacionesTexto.innerHTML = "";
  alertValidaciones.style.display = "none";
  let lista = "Los siguientes campos deben ser llenados correctamente: <ul>";
  //   txtName.value = txtName.value.trim(); nos permite borrar los espacios pero dentro de la función
  if (txtName.value.length == 0) {
    txtName.style.border = "solid thin red";
    lista += "<li>Se debe escribir un nombre válido </i>";
    // alertValidacionesTexto.innerHTML =
    //   "Se debe escribir un nombre válido. ";
    alertValidaciones.style.display = "block";
  } else {
    txtName.style.border = "";
  }
  if (txtNumber.value.length == 0) {
    txtNumber.style.border = "solid thin red";
    lista += "<li>Se debe escribir una cantidad válida </i>";
    // alertValidacionesTexto.innerHTML = "Se debe escribir un número válido.";
    alertValidaciones.style.display = "block";
  } else {
    txtNumber.style.border = "";
  }
  lista += "</ul>";
  alertValidacionesTexto.insertAdjacentHTML("beforeend", lista);
}); // Botón agregar click

txtNumber.addEventListener("blur", function (event) {
  event.preventDefault();
  txtNumber.value = txtNumber.value.trim();
}); //txtnumber. blur
txtName.addEventListener("blur", function (event) {
  event.preventDefault();
  txtName.value = txtName.value.trim();
});