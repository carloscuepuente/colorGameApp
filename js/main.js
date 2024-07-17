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
