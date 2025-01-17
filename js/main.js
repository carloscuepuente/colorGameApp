"use strict";

//* Crear una función para generar un código de color RGB aleatorio
const makeRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
};

const makeAPalleteOfRandomColor = (color) => {
  // color es un string tal que `rgb(r,g,b)`
  // usamos métodos de sting con regex para encontrar los valores del
  // r, g y b
  const match = color.match(/^rgb\((\d+),(\d+),(\d+)\)$/);
  // el método match retorna todos los elementos del array que cumplan la condición del regex

  // todo esto aun no verifica si el color se pasa de 255 o es menor a 0
  // bueno de hecho solo se lo suma no hago resta
  const r = parseInt(match[1]) + Math.floor(Math.random() * 75);
  const g = parseInt(match[2]) + Math.floor(Math.random() * 75);
  const b = parseInt(match[3]) + Math.floor(Math.random() * 75);

  return `rgb(${r},${g},${b})`;
};

// * selectores de elementos del HTML
const rgbElement = document.getElementById("rgb");
const aciertosElement = document.getElementById("aciertos");
const fallosElement = document.getElementById("fallos");
const cuadrados = document.querySelectorAll(".cuadrado");
let aciertos = 0;
let fallos = 0;
const levelSelector = document.getElementById("nivel"); //selecciona le select del html

// * funciones con la lógica de la dificultad del juego
const juegoNuevoFacil = () => {
  removeDataCuadrados();
  // creamos el color objetivo que queremos adivinar
  let colorObjetivo = makeRandomColor();
  const [rgb, r, g, b] = colorObjetivo.match(/^rgb\((\d+),(\d+),(\d+)\)$/);
  if (parseInt(r) + parseInt(g) + parseInt(b) > 380) {
    rgbElement.style.color = "black";
  } else {
    rgbElement.style.color = "rgb(240, 241, 245)";
  }
  // lo ponemos en el texto del html
  rgbElement.textContent = `${colorObjetivo.toUpperCase()}`;
  // le cambiamos el color de fondo al elemento html del elemento
  rgbElement.style.backgroundColor = colorObjetivo;
  // a los cuadrados le vamos a asignar a uno el color correcto y al resto colores generados por la función de crear una paleta de colores parecida
  let cuadradoCorrecto =
    cuadrados[Math.floor(Math.random() * cuadrados.length)];
  cuadradoCorrecto.dataset.color = colorObjetivo;
  for (const cuadrado of cuadrados) {
    cuadrado.addEventListener("click", handleClickJuegoNuevo);
    if (cuadrado.dataset.color) {
      cuadrado.style.backgroundColor = colorObjetivo;
    } else {
      cuadrado.style.backgroundColor = makeAPalleteOfRandomColor(colorObjetivo);
    }
  }
};

const handleClickJuegoNuevo = (event) => {
  // console.log(event.target);
  if (!event.target.dataset.color) {
    event.target.style.visibility = "hidden";
  }
};

const juegoNuevoMedio = () => {
  removeDataCuadrados();
  const colorObjetivo = makeRandomColor();
  rgbElement.textContent = `${colorObjetivo.toUpperCase()}`;
  let cuadradoCorrecto =
    cuadrados[Math.floor(Math.random() * cuadrados.length)];
  cuadradoCorrecto.dataset.color = colorObjetivo;
  rgbElement.style.backgroundColor = "#f0f0f0";
  rgbElement.style.color = "#5f9ea0";
  for (const cuadrado of cuadrados) {
    cuadrado.addEventListener("click", handleClickJuegoNuevo);
    if (cuadrado.dataset.color) {
      cuadrado.style.backgroundColor = colorObjetivo;
    } else {
      cuadrado.style.backgroundColor = makeRandomColor();
    }
  }
};

const juegoNuevoDificil = () => {
  removeDataCuadrados();
  // creamos el color objetivo que queremos adivinar
  const colorObjetivo = makeRandomColor();
  // lo ponemos en el texto del html
  rgbElement.textContent = `${colorObjetivo.toUpperCase()}`;
  // a los cuadrados le vamos a asignar a uno el color correcto y al resto colores generados por la función de crear una paleta de colores parecida
  let cuadradoCorrecto =
    cuadrados[Math.floor(Math.random() * cuadrados.length)];
  cuadradoCorrecto.dataset.color = colorObjetivo;
  rgbElement.style.backgroundColor = "#f0f0f0";
  rgbElement.style.color = "#5f9ea0";
  for (const cuadrado of cuadrados) {
    if (cuadrado.dataset.color) {
      cuadrado.style.backgroundColor = colorObjetivo;
    } else {
      cuadrado.style.backgroundColor = makeRandomColor();
    }
  }
};

// correr el juego según la dificultad seleccionada
const levelSelect = () => {
  if (levelSelector.value === "facil") {
    juegoNuevoFacil();
  } else if (levelSelector.value === "medio") {
    juegoNuevoMedio();
  } else if (levelSelector.value === "dificil") {
    juegoNuevoDificil();
  } else {
    gameReset();
  }
};

const gameReset = () => {
  // hay que reset todos los valores del dataset.color y los valores del index del array de cuadrados
  rgbElement.textContent = `Selecciona un nivel y adivina el color`;
  rgbElement.style.backgroundColor = "rgb(173, 216, 230)";
  rgbElement.style.color = "black";
  aciertosElement.textContent = `Aciertos: `;
  fallosElement.textContent = `Fallos: `;
  levelSelector.value = "";
  aciertos = 0;
  fallos = 0;
  for (const cuadrado of cuadrados) {
    removeDataCuadrados();
    cuadrado.style.backgroundColor = makeRandomColor();
  }
};

const removeDataCuadrados = () => {
  for (const cuadrado of cuadrados) {
    cuadrado.removeAttribute("data-color");
    cuadrado.style.visibility = "visible";
    cuadrado.removeEventListener("click", handleClickJuegoNuevo);
  }
};

//Función para verificar si el color del cuadrado coincide con el objetivo cuando el usuario hace click y actualizar el contador
function actualizarContador(cuadrado) {
  if (levelSelector.value !== "") {
    const colorCuadrado = cuadrado.dataset.color; //color cuadrado correcto
    if (colorCuadrado) {
      aciertos += 1;
      aciertosElement.textContent = `Aciertos: ${aciertos}`;
      levelSelect();
      // función para generar nuevos cuadros
      // generarNuevosCuadros();
      if (aciertos === 3) {
        // !! ojo aqui
        // disparar la condición de que se gano
        abrirModal("ganaste");
        console.log("ganaste");
      }
    } else {
      fallos += 1;
      fallosElement.textContent = `Fallos: ${fallos}`;
      if (fallos === 3) {
        // !! ojo aqui
        // disparar la condición de perder
        abrirModal();
        console.log("perdiste");
      }
    }
  }
}

function generarNuevosCuadros(cuadrado) {
  // al cargar la pagina le da colorines a los cuadrados
  let colorIni = makeRandomColor();
  cuadrado.style.backgroundColor = colorIni;
}

// Asignar evento de clic a cada cuadrado
for (const cuadrado of cuadrados) {
  cuadrado.addEventListener("click", () => {
    actualizarContador(cuadrado);
  });
  generarNuevosCuadros(cuadrado);
}

// todo implementar el modal
const modal = document.getElementById("aparecerModal");
const boton = document.getElementById("botonJugarDeNuevo");
function abrirModal(resultado) {
  modal.style.display = "block";
  if (resultado === "ganaste") {
    document.getElementById("ganaste").style.visibility = "visible";
  } else {
    document.getElementById("perdiste").style.visibility = "visible";
  }
}

function cerrarModal() {
  document.getElementById("ganaste").style.visibility = "hidden";
  document.getElementById("perdiste").style.visibility = "hidden";
  modal.style.display = "none";
  gameReset();
}
