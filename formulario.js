var servidorURL = 'https://jsonplaceholder.typicode.com/users';

var formulario = document.getElementById('Formulario_Registro');
formulario.addEventListener('submit', enviarDatos);

function enviarDatos(i) {
i.preventDefault();
var nombre = document.getElementById('nombre').value;
var correo = document.getElementById('correo').value;
var mensaje = document.getElementById('mensaje').value;

var datos = {
  nombre: nombre,
  correo: correo,
  mensaje: mensaje,
};
console.log(datos);
enviarServidor(servidorURL, datos);
}

function enviarServidor(url, datos) {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonResponse) {
        console.log(jsonResponse);
      })
      .catch(function (error) {
        console.log(error);
      });
}