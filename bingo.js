let jugador1 = document.getElementById("jugador1");
let jugador2 = document.getElementById("jugador2");
let jugador3 = document.getElementById("jugador3");
let jugador4 = document.getElementById("jugador4");
let botInicio = document.getElementById("BotonInicio");
let dimCarton = document.getElementById("dimCarton");

// Deshabilita el botón de inicio al cargar la página
BotonInicio.disabled = true;

//función que comprueba si todos los campos de entrada están llenos
function comprobarCampos() {
    if (jugador1.value && jugador2.value && jugador3.value && jugador4.value) {
        // Si todos los campos de entrada están llenos, habilita el botón de inicio
        BotonInicio.disabled = false;
        BotonInicio.style.backgroundColor = "hsl(21, 73%, 69%)";
        BotonInicio.style.cursor = "pointer";
    } else {
        // Si alguno de los campos de entrada está vacío, deshabilita el botón de inicio
        BotonInicio.disabled = true;
    }
}
 
jugador1.addEventListener("input", comprobarCampos);
jugador2.addEventListener("input", comprobarCampos);
jugador3.addEventListener("input", comprobarCampos);
jugador4.addEventListener("input", comprobarCampos);

// Función para convertir un cartón de bingo en una tabla HTML
function cartonATabla(carton) {
    let tabla = document.createElement("table");
    tabla.className = "carton-bingo"; 
    for (let i = 0; i < carton.length; i++) {
        let fila = document.createElement("tr");
        for (let j = 0; j < carton[i].length; j++) {
            let celda = document.createElement("td");
            celda.className = "numero-bingo"; 
            celda.textContent = carton[i][j];
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    return tabla;
}

// Variables globales
let indiceJugador = 0;
let cartonesJugadores;
let nombresJugadores = [jugador1, jugador2, jugador3, jugador4];
let contadorRondas = 0;
let puntajesJugadores = [0, 0, 0, 0];
let lineaEncontrada = false;

// Función para verificar el estado del cartón y actualizar el puntaje
function verificarCarton(carton, puntaje) {
    let tamaño = carton.length;
    let puntos = 0;

    // Verificar líneas horizontales
    for (let i = 0; i < tamaño; i++) {
        if (carton[i].every(num => num === "X")) {
            puntos += 1;
            lineaEncontrada = true;
            break;
        }
    }

    // Verificar líneas verticales
    if (!lineaEncontrada) {
        for (let i = 0; i < tamaño; i++) {
            if (carton.every(fila => fila[i] === "X")) {
                puntos += 1;
                lineaEncontrada = true;
                break;
            }
        }
    }

     // Verificar líneas diagonales
     if (!lineaEncontrada && carton.every((fila, i) => fila[i] === "X")) {
        puntos += 3; 
        lineaEncontrada = true;
    }
    if (!lineaEncontrada && carton.every((fila, i) => fila[tamaño - i - 1] === "X")) {
        puntos += 3; 
        lineaEncontrada = true;
    }

    // Verificar cartón lleno
    if (carton.every(fila => fila.every(num => num === "X"))) {
        puntos += 5; 
        lineaEncontrada = true;
    }

    return puntaje + puntos;
}



// Función para crear un cartón de bingo
function crearCartonBingo(tamaño) {
    let carton = [];
    let numeros = Array.from({length: 50}, (_, i) => i + 1);
    for (let i = 0; i < tamaño; i++) {
        let fila = [];
        for (let j = 0; j < tamaño; j++) {
            let indice = Math.floor(Math.random() * numeros.length);
            let numero = numeros.splice(indice, 1)[0];
            fila.push(numero);
        }
        carton.push(fila);
    }
    return carton;
}

// Función para convertir un cartón de bingo en una tabla HTML
function cartonATabla(carton) {
    let tabla = document.createElement("table");
    tabla.className = "carton-bingo";
    for (let i = 0; i < carton.length; i++) {
        let fila = document.createElement("tr");
        for (let j = 0; j < carton[i].length; j++) {
            let celda = document.createElement("td");
            celda.className = "numero-bingo";
            celda.textContent = carton[i][j];
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    return tabla;
}

// Función para mostrar el cartón de un jugador
function mostrarCartonJugador(indice) {
    document.body.innerHTML = "";
    let etiqueta = document.createElement("h2");
    etiqueta.className = "nombre-jugador";
    etiqueta.textContent = nombresJugadores[indice].value + "'s POV";
    document.body.appendChild(etiqueta);
    let carton = cartonesJugadores[indice];
    let tabla = cartonATabla(carton);
    document.body.appendChild(tabla);

    // Botón para volver al menú inicial
    let botonMenu = document.createElement("button");
    botonMenu.textContent = "Volver al menú";
    botonMenu.style.backgroundColor = "hsl(21, 73%, 69%)";
    botonMenu.style.cursor = "pointer";
    botonMenu.addEventListener("click", function() {
        location.reload();
    });

    document.body.appendChild(botonMenu);
    // Botón para generar un número aleatorio
    let botonGenerar = document.createElement("button");
    botonGenerar.textContent = "Generar número";
    botonGenerar.style.backgroundColor = "hsl(21, 73%, 69%)";
    botonGenerar.style.cursor = "pointer";
    document.body.appendChild(botonGenerar);

    // Crear elementos para mostrar información de la ronda
    let infoRonda = document.createElement("p");
    infoRonda.className = "info-ronda";
    let puntajes = document.createElement("p");
    puntajes.className = "puntajes";
    puntajes.innerHTML = "Puntajes: " + nombresJugadores.map((nombre, i) => `${nombre.value}: ${puntajesJugadores[i]}`).join(", ");
    document.body.appendChild(infoRonda);
    document.body.appendChild(puntajes);

    botonGenerar.addEventListener("click", function() {
        if (contadorRondas < 25) {
            let numeroAleatorio = Math.floor(Math.random() * 50) + 1;
            let numeroEncontrado = false;
            for (let i = 0; i < cartonesJugadores.length; i++) {
                for (let j = 0; j < cartonesJugadores[i].length; j++) {
                    if (cartonesJugadores[i][j].includes(numeroAleatorio)) {
                        numeroEncontrado = true;
                        break;
                    }
                }
            }
            if (numeroEncontrado) {
                contadorRondas++;
                infoRonda.textContent = "Ronda " + contadorRondas + ": " + numeroAleatorio;
                for (let i = 0; i < cartonesJugadores.length; i++) {
                    for (let j = 0; j < cartonesJugadores[i].length; j++) {
                        for (let k = 0; k < cartonesJugadores[i][j].length; k++) {
                            if (cartonesJugadores[i][j][k] === numeroAleatorio) {
                                cartonesJugadores[i][j][k] = "X";
                            }
                        }
                    }

                    // Verificar el cartón y actualizar el puntaje
                    puntajesJugadores[i] = verificarCarton(cartonesJugadores[i], puntajesJugadores[i]);
                }
                mostrarCartonJugador(indiceJugador);
                document.body.appendChild(infoRonda);
            }
        } else {
            let maxPuntaje = Math.max(...puntajesJugadores);
            let ganadores = nombresJugadores.filter((_, i) => puntajesJugadores[i] === maxPuntaje).map(nombre => nombre.value);
            let mensajeFinal = document.createElement("p");
            mensajeFinal.className = "mensaje-final";
            mensajeFinal.textContent = "Juego finalizado! Ganador: " + ganadores.join(", ");
            document.body.appendChild(mensajeFinal);
            botonGenerar.disabled = true; 
        }
    });

    let selectJugador = document.createElement("select");
    
    for (let i = 0; i < nombresJugadores.length; i++) {
        let opcion = document.createElement("option");
        opcion.value = i; // El valor de la opción es el índice del jugador
        opcion.textContent = nombresJugadores[i].value; 
        selectJugador.appendChild(opcion);

    }
    document.body.appendChild(selectJugador);

    selectJugador.addEventListener("change", function() {
        
        indiceJugador = selectJugador.value;


        mostrarCartonJugador(indiceJugador);
    });
}


// Evento de inicio del juego
BotonInicio.addEventListener("click", function() {
    let seleccion = dimCarton.value;
    let tamaño;
    if (seleccion === "3x3") {
        tamaño = 3;
    } else if (seleccion === "4x4") {
        tamaño = 4;
    } else if (seleccion === "5x5") {
        tamaño = 5;
    }
    cartonesJugadores = [];
    for (let i = 0; i < 4; i++) {
        let carton = crearCartonBingo(tamaño);
        cartonesJugadores.push(carton);
    }
    mostrarCartonJugador(0);
});
