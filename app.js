// VARIABLES GLOBALES
var quitarEvento = false
var contadorClicks = 0
var turno = 1
var FichasArriba = document.getElementsByClassName('DamasArriba')
var FichasAbajo = document.getElementsByClassName('DamasAbajo')
var jugador1 = document.getElementById('jugador1');
var jugador2 = document.getElementById('jugador2');
var turnoText = document.querySelector(".nombreTurno");

var fichaSeleccionada = {
  idFila: null,
  idColumna: null,
  esRey: false,
  moverIzquierda: false,
  moverDerecha: false,
  moverComerIzquierda: false,
  moverComerDerecha: false,
  moverPintarIzquierda: null,
  moverPintarDerecha: null,
  moverComerDerechaPintado: null,
  moverComerIzquierdaPintado: null,
  moverFilaPintar: null,
  moverFilaComerPintado: null,
}

// Tablero
var ArregloDelTablero = [
  [null, 1, null, 1, null, 1, null, 1],
  [1, null, 1, null, 1, null, 1, null],
  [null, 1, null, 1, null, 1, null, 1],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [2, null, 2, null, 2, null, 2, null],
  [null, 2, null, 2, null, 2, null, 2],
  [2, null, 2, null, 2, null, 2, null],
]


function crearTablero() {
  var Tablero = document.getElementById('Tablero')

  var contador = 0

  for (let i = 0; i < ArregloDelTablero.length; i++) {
    var newDivFila = document.createElement('div')
    newDivFila.className = 'Fila Fila-' + i
    Tablero.appendChild(newDivFila)

    contador = i % 2

    for (let j = 0; j < ArregloDelTablero[i].length; j++) {
      var newDivCell = document.createElement('div')

      if (contador === 0) {
        newDivCell.className = 'casillasBlancas'
        contador++
      } else {
        newDivCell.className = 'casillasNegras'
        contador--
      }

      newDivCell.id = 'Fila-' + i + '-col-' + j
      newDivFila.appendChild(newDivCell)
    }
  }
}
crearTablero()

function crearDamas() {
  for (let i = 0; i < ArregloDelTablero.length; i++) {
    for (let k = 0; k < ArregloDelTablero[i].length; k++) {
      var DivCelda = document.getElementById('Fila-' + i + '-col-' + k)

      if (ArregloDelTablero[i][k] === 1) {
        var NewDama = document.createElement('div')
        NewDama.className = 'DamasArriba'
        DivCelda.appendChild(NewDama)
      } else {
        if (ArregloDelTablero[i][k] === 2) {
          var NewDama = document.createElement('div')
          NewDama.className = 'DamasAbajo'
          DivCelda.appendChild(NewDama)
        }
      }
    }
  }
}
crearDamas()

function agregarEvento() {
  if (turno === 1) {
    for (var i = 0; i < FichasArriba.length; i++) {
      FichasArriba[i].addEventListener('click', obtenerFichaSeleccionada)
    }
  } else {
    for (var i = 0; i < FichasAbajo.length; i++) {
      FichasAbajo[i].addEventListener('click', obtenerFichaSeleccionada)
    }
  }
}


function obtenerFichaSeleccionada(ev) {
  fichaSeleccionada.idFila = parseInt(ev.path[1].id.substring(5, 6))
  fichaSeleccionada.idColumna =  parseInt(ev.path[1].id.substring(11, 12))

 
  buscarEspaciosDisponibles(
    fichaSeleccionada.idFila,
    fichaSeleccionada.idColumna,
  )
}



function buscarEspaciosDisponibles(Fila, columna) {

  if (contadorClicks > 0) {
    EliminarEspaciosPosibles()
  }
  contadorClicks++

  fichaSeleccionada.moverPintarIzquierda = columna - 1
  fichaSeleccionada.moverPintarDerecha = columna + 1

  if (turno === 1) {
    fichaSeleccionada.moverFilaPintar = Fila + 1
  } else {
    fichaSeleccionada.moverFilaPintar = Fila - 1
  }

  // validar Filas 
  if (fichaSeleccionada.idColumna >= 0 && fichaSeleccionada.idColumna <= 7 && fichaSeleccionada.idFila >= 0 && fichaSeleccionada.idFila <= 7) {
    
    if (ArregloDelTablero[fichaSeleccionada.moverFilaPintar][fichaSeleccionada.moverPintarDerecha] === null) {
      fichaSeleccionada.moverDerecha = true
  
      var divPintar = document.getElementById('Fila-' +fichaSeleccionada.moverFilaPintar +'-col-' +fichaSeleccionada.moverPintarDerecha)
      divPintar.style.backgroundColor = 'gray'
    }
   
    if (ArregloDelTablero[fichaSeleccionada.moverFilaPintar][fichaSeleccionada.moverPintarIzquierda] === null) {
      fichaSeleccionada.moverIzquierda = true
      
      var divPintar = document.getElementById('Fila-' +fichaSeleccionada.moverFilaPintar +'-col-' +fichaSeleccionada.moverPintarIzquierda)
      divPintar.style.backgroundColor = 'gray'
  
    }
  }

  comprobarComer()
}

function comprobarComer() {
  fichaSeleccionada.moverComerDerechaPintado = fichaSeleccionada.moverPintarDerecha + 1
  fichaSeleccionada.moverComerIzquierdaPintado = fichaSeleccionada.moverPintarIzquierda - 1

  if (turno === 1) {
    if (fichaSeleccionada.idColumna >= 0 && fichaSeleccionada.idColumna <= 7 && fichaSeleccionada.idFila >= 0 && fichaSeleccionada.idFila <= 7) { 
      fichaSeleccionada.moverFilaComerPintado = fichaSeleccionada.moverFilaPintar + 1
      if (ArregloDelTablero[fichaSeleccionada.moverFilaPintar][fichaSeleccionada.moverPintarDerecha] === 2 && ArregloDelTablero[fichaSeleccionada.moverFilaComerPintado][fichaSeleccionada.moverComerDerechaPintado] === null) {

        fichaSeleccionada.moverComerDerecha = true
        
        var divPintar = document.getElementById('Fila-' + fichaSeleccionada.moverFilaComerPintado +'-col-' +fichaSeleccionada.moverComerDerechaPintado)
        divPintar.style.backgroundColor = 'gray'
      }
      if (ArregloDelTablero[fichaSeleccionada.moverFilaPintar][fichaSeleccionada.moverPintarIzquierda] === 2 && ArregloDelTablero[fichaSeleccionada.moverFilaComerPintado][fichaSeleccionada.moverComerIzquierdaPintado] === null) {

        fichaSeleccionada.moverComerIzquierda = true
        
        var divPintar = document.getElementById('Fila-' +  fichaSeleccionada.moverFilaComerPintado +'-col-' +fichaSeleccionada.moverComerIzquierdaPintado)
        divPintar.style.backgroundColor = 'gray'
      }
    }  
    
  } else {
    if (fichaSeleccionada.idColumna >= 0 && fichaSeleccionada.idColumna <= 7 && fichaSeleccionada.idFila >= 0 && fichaSeleccionada.idFila <= 7)  {
      fichaSeleccionada.moverFilaComerPintado = fichaSeleccionada.moverFilaPintar - 1

      if (ArregloDelTablero[fichaSeleccionada.moverFilaPintar][fichaSeleccionada.moverPintarDerecha] === 1 && ArregloDelTablero[fichaSeleccionada.moverFilaComerPintado][fichaSeleccionada.moverComerDerechaPintado] === null) {

        fichaSeleccionada.moverComerDerecha = true
        
        var divPintar = document.getElementById('Fila-' + fichaSeleccionada.moverFilaComerPintado +'-col-' +fichaSeleccionada.moverComerDerechaPintado)
        divPintar.style.backgroundColor = 'gray'
      }
      if (ArregloDelTablero[fichaSeleccionada.moverFilaPintar][fichaSeleccionada.moverPintarIzquierda] === 1 && ArregloDelTablero[fichaSeleccionada.moverFilaComerPintado][fichaSeleccionada.moverComerIzquierdaPintado] === null) {

        fichaSeleccionada.moverComerIzquierda = true
        
        var divPintar = document.getElementById('Fila-' + fichaSeleccionada.moverFilaComerPintado +'-col-' + fichaSeleccionada.moverComerIzquierdaPintado)
        divPintar.style.backgroundColor = 'gray'
      }
    } 
  }
  agregarClickPosiblesMov()
}


  function agregarClickPosiblesMov() {
    
    if (fichaSeleccionada.moverIzquierda) {
      var divMover = document.getElementById('Fila-' +fichaSeleccionada.moverFilaPintar +'-col-' + fichaSeleccionada.moverPintarIzquierda)
      divMover.setAttribute('onClick', 'moverFicha(fichaSeleccionada.moverFilaPintar, fichaSeleccionada.moverPintarIzquierda, "")')
    }
    if (fichaSeleccionada.moverDerecha) {
      var divMover = document.getElementById('Fila-' +fichaSeleccionada.moverFilaPintar +'-col-' + fichaSeleccionada.moverPintarDerecha)
      divMover.setAttribute('onClick', 'moverFicha(fichaSeleccionada.moverFilaPintar, fichaSeleccionada.moverPintarDerecha, "")')
    }
    if (fichaSeleccionada.moverComerDerecha) {
      var divMover = document.getElementById('Fila-' + fichaSeleccionada.moverFilaComerPintado +'-col-' + fichaSeleccionada.moverComerDerechaPintado)
      divMover.setAttribute('onClick', 'moverFicha(fichaSeleccionada.moverFilaComerPintado, fichaSeleccionada.moverComerDerechaPintado, "derecha")')
    }
    if (fichaSeleccionada.moverComerIzquierda) {
      var divMover = document.getElementById('Fila-' + fichaSeleccionada.moverFilaComerPintado +'-col-' + fichaSeleccionada.moverComerIzquierdaPintado)
      divMover.setAttribute('onClick', 'moverFicha(fichaSeleccionada.moverFilaComerPintado, fichaSeleccionada.moverComerIzquierdaPintado, "izquierda")')
    }
  } 
  
function EliminarEspaciosPosibles() {
  if (fichaSeleccionada.moverDerecha) {
    var divPintar = document.getElementById('Fila-' +fichaSeleccionada.moverFilaPintar +'-col-' +fichaSeleccionada.moverPintarDerecha)
    divPintar.style.backgroundColor = 'black'
  }
   
  if (fichaSeleccionada.moverIzquierda) {
    divPintar = document.getElementById('Fila-' +fichaSeleccionada.moverFilaPintar +'-col-' +fichaSeleccionada.moverPintarIzquierda)
    divPintar.style.backgroundColor = 'black' 
  }
  
  if (turno === 1) {
      fichaSeleccionada.moverFilaComerPintado = fichaSeleccionada.moverFilaPintar + 1

    if (fichaSeleccionada.moverComerDerecha) {
      divPintar = document.getElementById('Fila-' + fichaSeleccionada.moverFilaComerPintado +'-col-' +fichaSeleccionada.moverComerDerechaPintado)
      divPintar.style.backgroundColor = 'black'
    }
    if (fichaSeleccionada.moverComerIzquierda) {
          divPintar = document.getElementById('Fila-' +  fichaSeleccionada.moverFilaComerPintado +'-col-' +fichaSeleccionada.moverComerIzquierdaPintado)
          divPintar.style.backgroundColor = 'black'
    }

  } else {
      fichaSeleccionada.moverFilaComerPintado = fichaSeleccionada.moverFilaPintar - 1
    if (fichaSeleccionada.moverComerDerecha) {
      divPintar = document.getElementById('Fila-' + fichaSeleccionada.moverFilaComerPintado +'-col-' +fichaSeleccionada.moverComerDerechaPintado)
      divPintar.style.backgroundColor = 'black'
    }
    if (fichaSeleccionada.moverComerIzquierda) {
      divPintar = document.getElementById('Fila-' + fichaSeleccionada.moverFilaComerPintado +'-col-' + fichaSeleccionada.moverComerIzquierdaPintado)
      divPintar.style.backgroundColor = 'black'
    }
    
}
  quitarEvento = true
  quitarEventosClickPosibles()
  resetearObjeto()
}


function moverFicha(FilaMover, columnaMover, tipoComer) {

  //CREACION DE LA NUEVA FICHA
  var divPadre = document.getElementById('Fila-' + FilaMover +'-col-' + columnaMover)

  var newDama = document.createElement('div')

  if (turno === 1) {
    newDama.className = 'DamasArriba'
    ArregloDelTablero[FilaMover][columnaMover] = 1;
  } else {
    newDama.className = 'DamasAbajo'
    ArregloDelTablero[FilaMover][columnaMover] = 2;
  }
  // if (filaMover == 0 || filaMover == 7) {
  //   if (fichaSeleccionada.esRey === false) {
  //     newDama.classList.add('rey')
	//   fichaSeleccionada.esRey = true;
  //   }
  // }
  // if(fichaSeleccionada.esRey == true){
	//   newDama.innerHTML = '<img src="imagenes/corona.png">'
  // }
  divPadre.appendChild(newDama)
 
  //ELIMINACION DE LA FICHA ANTIGUA
  var divViejo = document.getElementById('Fila-' + fichaSeleccionada.idFila +'-col-' +  fichaSeleccionada.idColumna)
  divViejo.innerHTML = ''
  ArregloDelTablero[fichaSeleccionada.idFila][fichaSeleccionada.idColumna] = null;

  //ELIMINACION DE LA FICHA DEL USUARIO CONTRARIO SI LO COME
  if (tipoComer == 'izquierda') {
    if (turno === 1) {
      var divEnemigoElimanado = document.getElementById('Fila-' + (fichaSeleccionada.idFila + 1)  +'-col-' +  (fichaSeleccionada.idColumna -1))
      divEnemigoElimanado.innerHTML = ''
      ArregloDelTablero[fichaSeleccionada.idFila + 1][fichaSeleccionada.idColumna - 1] = null
    }else{
      var divEnemigoElimanado = document.getElementById('Fila-' + (fichaSeleccionada.idFila - 1)  +'-col-' +  (fichaSeleccionada.idColumna -1))
      divEnemigoElimanado.innerHTML = ''
      ArregloDelTablero[fichaSeleccionada.idFila - 1][fichaSeleccionada.idColumna - 1] = null
    }
  }
  if (tipoComer == 'derecha') {
    if (turno === 1) {
      var divEnemigoElimanado = document.getElementById('Fila-' + (fichaSeleccionada.idFila + 1)  +'-col-' +  (fichaSeleccionada.idColumna +1))
      divEnemigoElimanado.innerHTML = ''
      ArregloDelTablero[fichaSeleccionada.idFila + 1][fichaSeleccionada.idColumna + 1] = null
    }else{
      var divEnemigoElimanado = document.getElementById('Fila-' + (fichaSeleccionada.idFila - 1)  +'-col-' +  (fichaSeleccionada.idColumna +1))
      divEnemigoElimanado.innerHTML = ''
      ArregloDelTablero[fichaSeleccionada.idFila - 1][fichaSeleccionada.idColumna + 1] = null
    }
  }

  //VUELTA A SU COLOR ORIGINAL DE LAS CASILLAS
  var FilaTurno = 0
  if (turno == 1) {
    FilaTurno = 1
  } else{
    FilaTurno = -1
  }

  if (fichaSeleccionada.moverIzquierda) {
    var divPintar = document.getElementById('Fila-' +fichaSeleccionada.moverFilaPintar +'-col-' +fichaSeleccionada.moverPintarIzquierda)
    divPintar.style.backgroundColor = 'black'
  }
  if (fichaSeleccionada.moverDerecha) {
    var divPintar = document.getElementById('Fila-' +fichaSeleccionada.moverFilaPintar +'-col-' +fichaSeleccionada.moverPintarDerecha)
    divPintar.style.backgroundColor = 'black'
  }
  if (fichaSeleccionada.moverComerDerecha) {
    var divPintar = document.getElementById('Fila-' + (fichaSeleccionada.moverFilaPintar + FilaTurno ) + '-col-' +fichaSeleccionada.moverComerDerechaPintado)
    divPintar.style.backgroundColor = 'black'
  }
  if (fichaSeleccionada.moverComerIzquierda) {
    var divPintar = document.getElementById('Fila-' + (fichaSeleccionada.moverFilaPintar + FilaTurno) + '-col-' +fichaSeleccionada.moverComerIzquierdaPintado)
    divPintar.style.backgroundColor = 'black'
  }

  quitarEventosClickPosibles()


}

function quitarEventosClickPosibles(){
  if (fichaSeleccionada.moverIzquierda) {
     var divMover = document.getElementById('Fila-' +fichaSeleccionada.moverFilaPintar +'-col-' + fichaSeleccionada.moverPintarIzquierda)
     divMover.removeAttribute('onclick')
  }
  if (fichaSeleccionada.moverDerecha) {
    var divMover = document.getElementById('Fila-' +fichaSeleccionada.moverFilaPintar +'-col-' + fichaSeleccionada.moverPintarDerecha)
    divMover.removeAttribute('onclick')
  }
  if (fichaSeleccionada.moverComerDerecha) {
     var divMover = document.getElementById('Fila-' + fichaSeleccionada.moverFilaComerPintado  +'-col-' + fichaSeleccionada.moverComerDerechaPintado)
     divMover.removeAttribute('onclick')
  }
  if (fichaSeleccionada.moverComerIzquierda) {
    var divMover = document.getElementById('Fila-' +fichaSeleccionada.moverFilaComerPintado +'-col-' + fichaSeleccionada.moverComerIzquierdaPintado)
    divMover.removeAttribute('onclick')
  }

  if (quitarEvento == false) {
  quitarEventosClicks()
  }
}

function quitarEventosClicks() {
 if (turno === 1) {
    for (var i = 0; i < FichasArriba.length; i++) {
      FichasArriba[i].removeEventListener('click', obtenerFichaSeleccionada)
    }
  } else {
    for (var i = 0; i < FichasAbajo.length; i++) {
      FichasAbajo[i].removeEventListener('click', obtenerFichaSeleccionada)
    }
  }
  actualizarPuntos()
}

function actualizarPuntos() {
  var parrafoPuntosJugador = null

  if (turno === 1) {
    parrafoPuntosJugador = document.getElementById('puntos-jugador1')
    parrafoPuntosJugador.innerHTML = 13 - FichasAbajo.length
  } else{
    parrafoPuntosJugador = document.getElementById('puntos-jugador2')
    parrafoPuntosJugador.innerHTML = 13 - FichasArriba.length
  }
  
  if (FichasArriba.length == 1) {
    alert('¡¡Felicitaciones jugador rojo has ganado la partida!!')
  }
 if (FichasAbajo.length == 1) {
    alert('¡¡Felicitaciones jugador verde has ganado la partida!!')
  }

	cambiarTurno()
}

function cambiarTurno(){
  if (turno === 1) {
    turno++
    turnoText.innerHTML = 'Turno: Verde';
    resetearObjeto()
  } else{
    turno--
    turnoText.innerHTML = 'Turno: Rojo' ; 
    resetearObjeto()
  }
}

function resetearObjeto() {
    fichaSeleccionada.id = null,
    fichaSeleccionada.esRey = false,
    fichaSeleccionada.moverIzquierda = false,
    fichaSeleccionada.moverDerecha = false,
    fichaSeleccionada.moverComerIzquierda = false,
    fichaSeleccionada.moverComerDerecha = false,
    fichaSeleccionada.moverPintarIzquierda = null,
    fichaSeleccionada.moverPintarDerecha = null,
    fichaSeleccionada.moverComerDerechaPintado = null,
    fichaSeleccionada.moverComerIzquierdaPintado = null,
    agregarEvento()
    quitarEvento = false
    contadorClicks = 0
}

agregarEvento()


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