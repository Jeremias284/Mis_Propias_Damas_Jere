//creando el tablero
document.querySelector('.game').innerHTML = "<table></table>"
var cont_c =0
for (var i=0;i<8;i++) {
    var t = "<td></td>"
    var tw = "<td class='white'></td>"
    var tbody = document.querySelector("tbody")
    if(tbody == null) document.querySelector("table").innerHTML='<tr>'+tw+t+tw+t+tw+t+tw+t+'</tr>'
    else{
        if(Math.floor(i/8)%2 == i%2){
            tbody.innerHTML +='<tr>'+tw+t+tw+t+tw+t+tw+t+'</tr>'
        }else{
            tbody.innerHTML +='<tr>'+t+tw+t+tw+t+tw+t+tw+'</tr>'
        }        
    }
}

//creando fichas
var table = document.querySelector("table");
var c = 0;
for (var i = 0, row; row = table.rows[i]; i++) {
   if(i<3 || i>4){
    for (var j = 0, col; col = row.cells[j]; j++) {
        if(row.cells[j].classList[0]!='white'){
         if(i<3) row.cells[j].innerHTML = '<div class="ficha-naranja" id="'+c+'"></div>';
         else row.cells[j].innerHTML = '<div class="ficha-azul" id="'+c+'"></div>';
          c++
        }
    }  
   }
}

var tablero = [
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    12, null, 13, null, 14, null, 15, null,
    null, 16, null, 17, null, 18, null, 19,
    20, null, 21, null, 22, null, 23, null
]

var encontrarFicha = function(id){
    var n = parseInt(id)
    return tablero.indexOf(n)
}
const cells = document.querySelectorAll("td")
var fichasNaranjas = document.querySelectorAll(".ficha-naranja")
var fichasAzules = document.querySelectorAll(".ficha-azul")
var turnoText = document.querySelector(".turn")
var turno = true
var naranjasR = 12
var azulesR = 12
var fichas

var fichaSeleccionada = {
    id: -1,
    indice: -1,
    esRey: false,
    movSiete: false,
    movNueve: false,
    movCatorce: false,
    movDieciocho: false,
    movMenosSiete: false,
    movMenosNueve: false,
    movMenosCatorce: false,
    movMenosDieciocho: false
}

function añadirListener(){
    if(turno){
        for(var i=0;i<fichasNaranjas.length;i++){
            fichasNaranjas[i].addEventListener("click",obtenerFichas)
        }
    }else{
        for(var i=0;i<fichasAzules.length;i++){
            fichasAzules[i].addEventListener("click",obtenerFichas)
        }
    }
}

function obtenerFichas(){
    if(turno){
        fichas = fichasNaranjas
    }else{
        fichas = fichasAzules
    }
    eliminarOnclick()
    resetearBordes()
}

function eliminarOnclick(){
    for(var i=0;i<cells.length;i++){
        cells[i].removeAttribute("onclick");
    }
}

function resetearBordes(){
    for(var i=0;i<fichas.length;i++){
        fichas[i].style.border = "2px solid aquamarine"
    }
    resetearFichasSeleccionadas()
    obtenerFichasSeleccionadas()
}

function resetearFichasSeleccionadas(){
    fichaSeleccionada.id = -1
    fichaSeleccionada.indice = -1
    fichaSeleccionada.esRey = false
    fichaSeleccionada.movSiete = false
    fichaSeleccionada.movNueve = false
    fichaSeleccionada.movCatorce = false
    fichaSeleccionada.movDieciocho = false
    fichaSeleccionada.movMenosSiete = false
    fichaSeleccionada.movMenosNueve = false
    fichaSeleccionada.movMenosCatorce = false
    fichaSeleccionada.movMenosDieciocho = false
}

function obtenerFichasSeleccionadas(){
    fichaSeleccionada.id = parseInt(event.target.id)
    fichaSeleccionada.indice = encontrarFicha(fichaSeleccionada.id)
    esRey()
}

function esRey(){
    if(document.getElementById(fichaSeleccionada.id).classList.contains("rey")){
        fichaSeleccionada.esRey = true;
    }else{
        fichaSeleccionada.esRey = false;
    }
    obtenerEspaciosDisponibles()
}

function obtenerEspaciosDisponibles(){
    if(tablero[fichaSeleccionada.indice+7]===null &&
        cells[fichaSeleccionada.indice+7].classList.contains("white")!==true){
            fichaSeleccionada.movSiete = true
    }
    if(tablero[fichaSeleccionada.indice+9]===null &&
        cells[fichaSeleccionada.indice+9].classList.contains("white")!==true){
            fichaSeleccionada.movNueve = true
    }
    if(tablero[fichaSeleccionada.indice-7]===null &&
        cells[fichaSeleccionada.indice-7].classList.contains("white")!==true){
            fichaSeleccionada.movMenosSiete = true
    }
    if(tablero[fichaSeleccionada.indice-9]===null &&
        cells[fichaSeleccionada.indice-9].classList.contains("white")!==true){
            fichaSeleccionada.movMenosNueve = true
    }
    comprobarMatar()
}

function comprobarMatar(){
    if (turno) {
        if (tablero[fichaSeleccionada.indice + 14] === null 
        && cells[fichaSeleccionada.indice + 14].classList.contains("white") !== true
        && tablero[fichaSeleccionada.indice + 7] >= 12) {
            fichaSeleccionada.movCatorce = true;
        }
        if (tablero[fichaSeleccionada.indice + 18] === null 
        && cells[fichaSeleccionada.indice + 18].classList.contains("white") !== true
        && tablero[fichaSeleccionada.indice + 9] >= 12) {
            fichaSeleccionada.movDieciocho = true;
        }
        if (tablero[fichaSeleccionada.indice - 14] === null 
        && cells[fichaSeleccionada.indice - 14].classList.contains("white") !== true
        && tablero[fichaSeleccionada.indice - 7] >= 12) {
            fichaSeleccionada.movMenosCatorce = true;
        }
        if (tablero[fichaSeleccionada.indice - 18] === null 
        && cells[fichaSeleccionada.indice - 18].classList.contains("white") !== true
        && tablero[fichaSeleccionada.indice - 9] >= 12) {
            fichaSeleccionada.movMenosDieciocho = true;
        }
    } else {
        if (tablero[fichaSeleccionada.indice + 14] === null 
        && cells[fichaSeleccionada.indice + 14].classList.contains("white") !== true
        && tablero[fichaSeleccionada.indice + 7] < 12 && tablero[fichaSeleccionada.indice + 7] !== null) {
            fichaSeleccionada.movCatorce = true;
        }
        if (tablero[fichaSeleccionada.indice + 18] === null 
        && cells[fichaSeleccionada.indice + 18].classList.contains("white") !== true
        && tablero[fichaSeleccionada.indice + 9] < 12 && tablero[fichaSeleccionada.indice + 9] !== null) {
            fichaSeleccionada.movDieciocho = true;
        }
        if (tablero[fichaSeleccionada.indice - 14] === null && cells[fichaSeleccionada.indice - 14].classList.contains("white") !== true
        && tablero[fichaSeleccionada.indice - 7] < 12 && tablero[fichaSeleccionada.indice - 7] !== null) {
            fichaSeleccionada.movMenosCatorce = true;
        }
        if (tablero[fichaSeleccionada.indice - 18] === null && cells[fichaSeleccionada.indice - 18].classList.contains("white") !== true
        && tablero[fichaSeleccionada.indice - 9] < 12 && tablero[fichaSeleccionada.indice - 9] !== null) {
            fichaSeleccionada.movMenosDieciocho = true;
        }
    }
    chequearCondiciones();
}

function chequearCondiciones(){
    if(fichaSeleccionada.esRey){
        colocarBorde()
    }else{
        if(turno){
            fichaSeleccionada.movMenosSiete = false
            fichaSeleccionada.movMenosNueve = false
            fichaSeleccionada.movMenosCatorce = false
            fichaSeleccionada.movMenosDieciocho = false
        }else{
            fichaSeleccionada.movSiete = false
            fichaSeleccionada.movNueve = false
            fichaSeleccionada.movCatorce = false
            fichaSeleccionada.movDieciocho = false
        }
        colocarBorde()
    }
}

function colocarBorde(){
    if(fichaSeleccionada.movSiete || fichaSeleccionada.movNueve || fichaSeleccionada.movCatorce || fichaSeleccionada.movDieciocho
    || fichaSeleccionada.movMenosSiete || fichaSeleccionada.movMenosNueve || fichaSeleccionada.movMenosCatorce || fichaSeleccionada.movMenosDieciocho){
        document.getElementById(fichaSeleccionada.id).style.border = "4px solid red"
        colocarOnclik()
    }
    else return
}

function colocarOnclik(){
    if(fichaSeleccionada.movSiete){
        cells[fichaSeleccionada.indice+7].setAttribute("onclick","mover(7)")
    }
    if(fichaSeleccionada.movNueve){
        cells[fichaSeleccionada.indice+9].setAttribute("onclick","mover(9)")
    }
    if(fichaSeleccionada.movCatorce){
        cells[fichaSeleccionada.indice+14].setAttribute("onclick","mover(14)")
    }
    if(fichaSeleccionada.movDieciocho){
        cells[fichaSeleccionada.indice+18].setAttribute("onclick","mover(18)")
    }
    if(fichaSeleccionada.movMenosSiete){
        cells[fichaSeleccionada.indice-7].setAttribute("onclick","mover(-7)")
    }
    if(fichaSeleccionada.movMenosNueve){
        cells[fichaSeleccionada.indice-9].setAttribute("onclick","mover(-9)")
    }
    if(fichaSeleccionada.movMenosCatorce){
        cells[fichaSeleccionada.indice-14].setAttribute("onclick","mover(-14)")
    }
    if(fichaSeleccionada.movMenosDieciocho){
        cells[fichaSeleccionada.indice-18].setAttribute("onclick","mover(-18)")
    }
}

function mover(n){
    document.getElementById(fichaSeleccionada.id).remove()
    cells[fichaSeleccionada.indice].innerHTML = ""
    if(turno){
        if(fichaSeleccionada.esRey){
            cells[fichaSeleccionada.indice+n].innerHTML = `<div class="ficha-naranja rey" id="${fichaSeleccionada.id}"></div>`
            fichasNaranjas = document.querySelectorAll(".ficha-naranja")
        }else{
            cells[fichaSeleccionada.indice+n].innerHTML = `<div class="ficha-naranja" id="${fichaSeleccionada.id}"></div>`
            fichasNaranjas = document.querySelectorAll(".ficha-naranja")
        }
    }else{
        if(fichaSeleccionada.esRey){
            cells[fichaSeleccionada.indice+n].innerHTML = `<div class="ficha-azul rey" id="${fichaSeleccionada.id}"></div>`
            fichasAzules = document.querySelectorAll(".ficha-azul")
        }else{
            cells[fichaSeleccionada.indice+n].innerHTML = `<div class="ficha-azul" id="${fichaSeleccionada.id}"></div>`
            fichasAzules = document.querySelectorAll(".ficha-azul")
        }
    }
    var i = fichaSeleccionada.indice
    if(n===14||n===-14||n===18||n===-18){
        cambiarEstado(i,i+n,i+n/2)
    }else{
        cambiarEstado(i,i+n)
    }
}

function cambiarEstado(indice,mindice,elimficha){
    tablero[indice] = null;
    tablero[mindice] = parseInt(fichaSeleccionada.id);
    if (turno && fichaSeleccionada.id < 12 && mindice >= 56) {
        document.getElementById(fichaSeleccionada.id).classList.add("rey")
    }
    if (turno === false && fichaSeleccionada.id >= 12 && mindice <= 7) {
        document.getElementById(fichaSeleccionada.id).classList.add("rey")
    }
    if (elimficha) {
        tablero[elimficha] = null;
        if (turno && fichaSeleccionada.id < 12) {
            cells[elimficha].innerHTML = ""
            azulesR--
        }
        if (turno === false && fichaSeleccionada.id >= 12) {
            cells[elimficha].innerHTML = ""
            naranjasR--
        }
    }
    resetearFichasSeleccionadas()
    eliminarOnclick()
    eliminarListener()
}

function eliminarListener(){
    if(turno){
        for(var i=0;i<fichasNaranjas.length;i++){
            fichasNaranjas[i].removeEventListener("click", obtenerFichas)
        }
    }else{
        for(var i=0;i<fichasAzules.length;i++){
            fichasAzules[i].removeEventListener("click", obtenerFichas)
        }
    }
    verificarGanador()
}

var band = false
function verificarGanador(){
    if (azulesR === 0) {
        band = true
        turnoText.style.display = 'none'
        turnoText.innerHTML = '¡Naranja es el GANADOR!'
        setTimeout(esconderText,10)
    } else if (naranjasR === 0) {
        band = true
        turnoText.style.display = 'none'
        turnoText.innerHTML = '¡Azul es el GANADOR!'
        setTimeout(esconderText,10)
    }
    cambiarTextJugador();
}

function cambiarTextJugador() {
    if(band === false){
        if (turno) {
            turno = false;
            turnoText.style.display = 'none'
            turnoText.innerHTML = "Turno: Azul"
            setTimeout(esconderText,10)
        } else {
            turno = true;
            turnoText.style.display = 'none'
            turnoText.innerHTML = "Turno: Naranja"
            setTimeout(esconderText,10)
        }
    }
    añadirListener();
}

function esconderText(){
    turnoText.style.display = 'block'
}

añadirListener();