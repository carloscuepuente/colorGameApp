"use strict";

// bajarse la extension en VsCode Better Comments para que les aparezcan los comentarios de colores

// todo Generar código RGB aleatorio
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

// funciones con la lógica de la dificultad del juego
const juegoNuevoFacil = () => {
  gameReset();
  // creamos el color objetivo que queremos adivinar
  let colorObjetivo = makeRandomColor();

  const [rgb, r, g, b] = colorObjetivo.match(/^rgb\((\d+),(\d+),(\d+)\)$/);
  if (parseInt(r) + parseInt(g) + parseInt(b) > 100) {
    console.log(rgbElement.textContent);
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
    if (cuadrado.dataset.color) {
      cuadrado.style.backgroundColor = colorObjetivo;
    } else {
      // console.log("corrí");
      cuadrado.style.backgroundColor = makeAPalleteOfRandomColor(colorObjetivo);
      // cuadrado.style.backgroundColor = makeRandomColor();
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
  gameReset();
  // creamos el color objetivo que queremos adivinar
  const colorObjetivo = makeRandomColor();
  // lo ponemos en el texto del html
  rgbElement.textContent = `${colorObjetivo.toUpperCase()}`;

  // le cambiamos el color de fondo al elemento html del elemento
  // rgbElement.style.backgroundColor = colorObjetivo;

  // a los cuadrados le vamos a asignar a uno el color correcto y al resto colores generados por la función de crear una paleta de colores parecida
  let cuadradoCorrecto =
    cuadrados[Math.floor(Math.random() * cuadrados.length)];

  cuadradoCorrecto.dataset.color = colorObjetivo;

  for (const cuadrado of cuadrados) {
    cuadrado.addEventListener("click", handleClickJuegoNuevo);

    if (cuadrado.dataset.color) {
      cuadrado.style.backgroundColor = colorObjetivo;
    } else {
      // cuadrado.style.backgroundColor = makeAPalleteOfRandomColor(colorObjetivo);
      cuadrado.style.backgroundColor = makeRandomColor();
    }
  }
};

const juegoNuevoDificil = () => {
  gameReset();
  // creamos el color objetivo que queremos adivinar
  const colorObjetivo = makeRandomColor();
  console.log("soy el color objetivo", colorObjetivo);

  // lo ponemos en el texto del html
  rgbElement.textContent = `${colorObjetivo.toUpperCase()}`;

  // a los cuadrados le vamos a asignar a uno el color correcto y al resto colores generados por la función de crear una paleta de colores parecida
  let cuadradoCorrecto =
    cuadrados[Math.floor(Math.random() * cuadrados.length)];

  cuadradoCorrecto.dataset.color = colorObjetivo;

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
  aciertosElement.textContent = `Aciertos: `;
  fallosElement.textContent = `Fallos: `;
  for (const cuadrado of cuadrados) {
    cuadrado.removeAttribute("data-color");
    cuadrado.style.backgroundColor = makeRandomColor();
    cuadrado.style.visibility = "visible";
    cuadrado.removeEventListener("click", handleClickJuegoNuevo);
  }

  // todo reset los contadores también
};

//Función para verificar si el color del cuadrado coincide con el objetivo cuando el usuario hace click y actualizar el contador
function actualizarContador(cuadrado) {
  const colorCuadrado = cuadrado.dataset.color; //color cuadrado correcto
  if (colorCuadrado) {
    aciertos += 1;
    aciertosElement.textContent = `Aciertos: ${aciertos}`;
    // correr la función de generar nuevos cuadros de colores

    if (aciertos === 3) {
      // disparar la condición de que se gano
      console.log("ganaste");
      gameReset();
    }
  } else {
    fallos += 1;
    fallosElement.textContent = `Fallos: ${fallos}`;
    if (fallos === 3) {
      // disparar la condición de perder
      console.log("perdiste");
      gameReset();
    }
  }
}

// Asignar evento de clic a cada cuadrado
for (const cuadrado of cuadrados) {
  cuadrado.addEventListener("click", () => {
    actualizarContador(cuadrado);
  });
}

// todo implementar el modal
