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
  // usamos metodos de sting con regex para encontrar los valores del
  // r, g y b
  const match = color.match(/^rgb\((\d+),(\d+),(\d+)\)$/);
  // el metodo match retorna todos los elementos del array que cumplan la condicon del regex

  // todo esto aun no verifica si el color se pasa de 255 o es menor a 0
  // bueno de hecho solo se lo suma no hago resta
  const r = parseInt(match[1]) + Math.floor(Math.random() * 75);
  const g = parseInt(match[2]) + Math.floor(Math.random() * 75);
  const b = parseInt(match[3]) + Math.floor(Math.random() * 75);

  return `rgb(${r},${g},${b})`;
};

//
const rgbElement = document.getElementById("rgb");
const aciertosElement = document.getElementById("aciertos");
const fallosElement = document.getElementById("fallos");
const cuadrados = document.querySelectorAll(".cuadrado");

const juegoNuevoFacil = () => {
  // creamos el color objetivo que queremos adivinar
  let colorObjetivo = makeRandomColor();

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
      // console.log("corri");
      cuadrado.style.backgroundColor = makeAPalleteOfRandomColor(colorObjetivo);
      // cuadrado.style.backgroundColor = makeRandomColor();
    }
  }
};

const juegoNuevoMedio = () => {
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
    cuadrado.addEventListener("click", function () {
      if (cuadrado.dataset.color !== colorObjetivo) {
        // Si no es el color objetivo, desaparece el cuadrado
        cuadrado.style.visibility = "hidden";
      }
    });

    if (cuadrado.dataset.color) {
      cuadrado.style.backgroundColor = colorObjetivo;
    } else {
      // cuadrado.style.backgroundColor = makeAPalleteOfRandomColor(colorObjetivo);
      cuadrado.style.backgroundColor = makeRandomColor();
    }
  }

  // console.log(Math.floor(Math.random() * cuadrados.length));
};

const juegoNuevoDificil = () => {
  // creamos el color objetivo que queremos adivinar
  const colorObjetivo = makeRandomColor();
  console.log("soy el color objetivo", colorObjetivo);

  // lo ponemos en el texto del html
  console.log(rgbElement);
  rgbElement.textContent = `${colorObjetivo}`;
  console.log(colorObjetivo.toUpperCase());

  // le cambiamos el color de fondo al elemento html del elemento
  // rgbElement.style.backgroundColor = colorObjetivo;

  // a los cuadrados le vamos a asignar a uno el color correcto y al resto colores generados por la función de crear una paleta de colores parecida
  let cuadradoCorrecto =
    cuadrados[Math.floor(Math.random() * cuadrados.length)];

  cuadradoCorrecto.dataset.color = colorObjetivo;

  for (const cuadrado of cuadrados) {
    if (cuadrado.dataset.color) {
      cuadrado.style.backgroundColor = colorObjetivo;
    } else {
      // cuadrado.style.backgroundColor = makeAPalleteOfRandomColor(colorObjetivo);
      cuadrado.style.backgroundColor = makeRandomColor();
    }
  }

  // console.log(Math.floor(Math.random() * cuadrados.length));
};

// todo Implementar la variante del dificultad media que consiste en la misma implementación del difícil
// todo pero agregando la funcionalidad de ir eliminando cuadrados de la "grilla" de opciones si fallamos vamos de los div class cuadrado eliminarlos
// posible implementación aplicando una clase de css

//Función para verificar si el color del cuadrado coincide con el objetivo cuando el usuario hace click
function verificarColor(cuadrado) {
  const colorCuadrado = cuadrado.style.backgroundColor; //si el color es correcto se contabiliza en el contador de aciertos
  if (colorCuadrado === colorObjetivo) {
    // Acierto
    aciertosElement.textContent = parseInt(aciertosElement.textContent) + 1;
  } else {
    // Fallo
    fallosElement.textContent = parseInt(fallosElement.textContent) + 1;
  }
  // Mostrar nuevo color después de verificar
  // actualizarColorRGB();
}

// Asignar evento de clic a cada cuadrado

cuadrados.forEach(function (cuadrado) {
  cuadrado.addEventListener("click", function () {
    verificarColor(cuadrado);
  });
});

// Mostrar el primer color RGB al cargar la página

// juegoNuevoFacil();
juegoNuevoMedio();
// juegoNuevoDificil();

// todo Generar cajas de color
//*  Crear una función para generar varias cajas de color, una de ellas con el color correcto y las otras con colores aleatorios

// todo Asignar colores a las cajas
// * asignar los colores generados a las cajas en la sección correspondiente

// todo detectar clicks en las cajas
// * Crear un evento de clic para cada caja para detectar si el usuario ha seleccionado el color correcto o incorrecto

// todo Implementar el contador de aciertos y fallos
// * crear las variables correspondientes y actualizar los contadores en la interfaz de usuario
// * incrementar el contador si el usuario selecciona el color correcto y decrementar si es incorrecto

// todo Implementar la lógica para el reset del juego luego de cada click
// *

// todo Implementar las condiciones de victoria o derrota

/* DUDAS TUTORIA:
- Funcionalidades extra, como lo de desaparecer cuadrado
- dificultad
- Si el proyecto nos dice que cada vez que clickemos un cuadrado , si hay acierto o fallo los cuadrados deben generarse nuevos */
