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
// Añade un escuchador de eventos a los campos de entrada para comprobar los campos cada vez que el usuario escribe algo
jugador1.addEventListener("input", comprobarCampos);
jugador2.addEventListener("input", comprobarCampos);
jugador3.addEventListener("input", comprobarCampos);
jugador4.addEventListener("input", comprobarCampos);

// Función para convertir un cartón de bingo en una tabla HTML
function cartonATabla(carton) {
    let tabla = document.createElement("table");
    tabla.className = "carton-bingo"; // Asigna la clase "carton-bingo" a la tabla
    for (let i = 0; i < carton.length; i++) {
        let fila = document.createElement("tr");
        for (let j = 0; j < carton[i].length; j++) {
            let celda = document.createElement("td");
            celda.className = "numero-bingo"; // Asigna la clase "numero-bingo" a la celda
            celda.textContent = carton[i][j];
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    return tabla;
}

let indiceJugador = 0; // Índice del jugador que está mostrando su cartón
let cartonesJugadores; // Array para guardar los cartones de todos los jugadores
let nombresJugadores = [jugador1, jugador2, jugador3, jugador4]; 


BotonInicio.addEventListener("click", function() {
    
    function crearCartonBingo(tamaño) {
        let carton = [];
        let numeros = Array.from({length: 50}, (_, i) => i + 1); // Genera un array de números del 1 al 50
        for (let i = 0; i < tamaño; i++) {
            let fila = [];
            for (let j = 0; j < tamaño; j++) {
                // Selecciona un número aleatorio del array de números y lo elimina del array
                let indice = Math.floor(Math.random() * numeros.length);
                let numero = numeros.splice(indice, 1)[0];
                fila.push(numero);
            }
            // Añade la fila al cartón
            carton.push(fila);
        }
        return carton;
    }
    
    // Obtiene el valor seleccionado en el select
    let seleccion = dimCarton.value;

    // Determina el tamaño del cartón de bingo en función del valor seleccionado
    let tamaño;
    if (seleccion === "3x3") {
        tamaño = 3;
    } else if (seleccion === "4x4") {
        tamaño = 4;
    } else if (seleccion === "5x5") {
        tamaño = 5;
    }

    // Crea 4 cartones de bingo del tamaño seleccionado
    cartonesJugadores = [];
    for (let i = 0; i < 4; i++) {
        let carton = crearCartonBingo(tamaño);
        cartonesJugadores.push(carton);
    }

    // Muestra el cartón del primer jugador
    mostrarCartonJugador(0);
});

    // Función para mostrar el cartón de un jugador
    function mostrarCartonJugador(indice) {
    // Borra el contenido anterior de la página
    document.body.innerHTML = "";

    // Agrega una etiqueta con el nombre del jugador
    let etiqueta = document.createElement("h2");
    etiqueta.textContent = nombresJugadores[indice].value;
    document.body.appendChild(etiqueta);

    // Muestra el cartón del jugador en la página
    let carton = cartonesJugadores[indice];
    let tabla = cartonATabla(carton);
    document.body.appendChild(tabla);
}

    // Crea un botón para cambiar de cartón
    let botonCambiar = document.createElement("button");
    botonCambiar.textContent = "Cambiar de cartón";
    document.body.appendChild(botonCambiar);
    botonCambiar.addEventListener("click", function() {
    // Incrementa el índice del jugador
    indiceJugador = (indiceJugador + 1) % 4;

    // Muestra el cartón del siguiente jugador
    mostrarCartonJugador(indiceJugador);
});
