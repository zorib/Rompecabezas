// Arreglo que contiene las intrucciones del juego
var instrucciones = ["Utilizar las flechas para mover las piezas", "Ordenar las piezas hasta alcanzar la imagen objetivo"];
// Arreglo para ir guardando los movimientos que se vayan realizando
var movimientos = [];
// Representación de la grilla. Cada número representa a una pieza.
var grilla = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

var filaVacia = 2;
var columnaVacia = 2;

function mostrarInstrucciones(instrucciones) {
    for (var i = 0; i < instrucciones.length; i++) {
        mostrarInstruccionEnLista(instrucciones[i], "lista-instrucciones");
    }
}

function actualizarUltimoMovimiento(direccion) {
    movimientos.push(direccion);
    actualizarUltimoMovimiento(direccion);
}


function chequearSiGano() {
    var grillaCorrecta = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];
    //verifico si tengo la misma cantidad de filas
    var filaGrilla = grilla.length;
    var filaCorrecta = grillaCorrecta.length;
    //verifico si tengo la misma cantidad de columnas
    var columnaGrilla = (filaGrilla > 0) ? grilla[0].length : 0;
    var columnaCorrecta = (filaCorrecta > 0) ? grillaCorrecta[0].length : 0;
    if (filaGrilla == filaCorrecta && columnaGrilla == columnaCorrecta) {
        for (var i = 0; i < filaGrilla; i++) {
            for (var j = 0; j < columnaGrilla; j++) {
                if (grilla[i][j] != grillaCorrecta[i][j]) {
                    return false;
                }
            }
        }
    } else {
        return false;
    }
    return true;
}

function mostrarCartelGanador() {
    var gano = chequearSiGano();
    if (gano === true) {
        alert("¡GANASTE!");
    }
}

function intercambiarPosicionesGrilla(filaPos1, columnaPos1, filaPos2, columnaPos2) {
    var temporal = grilla[filaPos1][columnaPos1];
    grilla[filaPos1][columnaPos1] = grilla[filaPos2][columnaPos2];
    grilla[filaPos2][columnaPos2] = temporal;
}
// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
    filaVacia = nuevaFila;
    columnaVacia = nuevaColumna;
}
// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna) {
    var filaValida = (fila >= 0) && (fila <= 2);
    var columnaValida = (columna >= 0) && (columna <= 2);
    return filaValida && columnaValida;
}

function moverEnDireccion(direccion) {
    var nuevaFilaPiezaVacia;
    var nuevaColumnaPiezaVacia;
    // Mueve pieza hacia la abajo, reemplazandola con la blanca
    if (direccion === codigosDireccion.ABAJO) {
        nuevaFilaPiezaVacia = filaVacia + 1;
        nuevaColumnaPiezaVacia = columnaVacia;
    }
    // Mueve pieza hacia arriba, reemplazandola con la blanca
    else if (direccion === codigosDireccion.ARRIBA) {
        nuevaFilaPiezaVacia = filaVacia - 1;
        nuevaColumnaPiezaVacia = columnaVacia;
    }
    // Mueve pieza hacia la derecha, reemplazandola con la blanca
    else if (direccion === codigosDireccion.DERECHA) {
        nuevaColumnaPiezaVacia = columnaVacia + 1;
        nuevaFilaPiezaVacia = filaVacia;
    }
    // Mueve pieza hacia la izquierda, reemplazandola con la blanca
    else if (direccion === codigosDireccion.IZQUIERDA) {
        nuevaColumnaPiezaVacia = columnaVacia - 1;
        nuevaFilaPiezaVacia = filaVacia;
    }

    if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
        intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        actualizarUltimoMovimiento(direccion);
    }
}

var codigosDireccion = {
    IZQUIERDA: 37,
    ARRIBA: 38,
    DERECHA: 39,
    ABAJO: 40
}

function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
    // Intercambio posiciones en la grilla
    var pieza1 = grilla[fila1][columna1];
    var pieza2 = grilla[fila2][columna2];
    intercambiarPosicionesGrilla(fila1, columna1, fila2, columna2);
    intercambiarPosicionesDOM('pieza' + pieza1, 'pieza' + pieza2);
}

function intercambiarPosicionesDOM(idPieza1, idPieza2) {
    // Intercambio posiciones en el DOM
    var elementoPieza1 = document.getElementById(idPieza1);
    var elementoPieza2 = document.getElementById(idPieza2);
    var padre = elementoPieza1.parentNode;
    var clonElemento1 = elementoPieza1.cloneNode(true);
    var clonElemento2 = elementoPieza2.cloneNode(true);
    padre.replaceChild(clonElemento1, elementoPieza2);
    padre.replaceChild(clonElemento2, elementoPieza1);
}

function actualizarUltimoMovimiento(direccion) {
    ultimoMov = document.getElementById('flecha');
    switch (direccion) {
        case codigosDireccion.ARRIBA:
            ultimoMov.textContent = '↑';
            break;
        case codigosDireccion.ABAJO:
            ultimoMov.textContent = '↓';
            break;
        case codigosDireccion.DERECHA:
            ultimoMov.textContent = '→';
            break;
        case codigosDireccion.IZQUIERDA:
            ultimoMov.textContent = '←';
            break;
    }
}

function mostrarInstruccionEnLista(instruccion, idLista) {
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}

function mezclarPiezas(veces) {
    if (veces <= 0) {
        return;
    }
    var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA,
        codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA
    ];
    var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
    moverEnDireccion(direccion);
    setTimeout(function() {
        mezclarPiezas(veces - 1);
    }, 100);
}

function capturarTeclas() {
    document.body.onkeydown = (function(evento) {
        if (evento.which === codigosDireccion.ABAJO || evento.which === codigosDireccion.ARRIBA || evento.which === codigosDireccion.DERECHA || evento.which === codigosDireccion.IZQUIERDA) {
            moverEnDireccion(evento.which);
            var gano = chequearSiGano();
            if (gano) {
                setTimeout(function() {
                    mostrarCartelGanador();
                }, 500);
            }
            evento.preventDefault();
        }
    })
}

function iniciar() {
    mostrarInstrucciones(instrucciones);
    mezclarPiezas(30);
    capturarTeclas();
}

iniciar();
