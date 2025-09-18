import CalculadoraTarifas from "./CalculadoraTarifas.js";

const calcularBtn = document.querySelector("#calcular");
const resultadoDiv = document.querySelector("#resultado-fecha-entrada");
const resultadoDivSalida = document.querySelector("#resultado-fecha-salida");
const resultadoCalculo = document.querySelector("#resultado-calculo");
const detallesCalculo = document.querySelector("#detalles-calculo");

const iconoResultado = document.getElementById("icono-resultado");
const calculadoraTarifas = new CalculadoraTarifas();
calcularBtn.addEventListener("click", () => {
  const fechaEntrada = document.querySelector("#fecha-entrada").value;
  const fechaSalida = document.querySelector("#fecha-salida").value;
  calculadoraTarifas.setFechaEntrada(fechaEntrada);
  calculadoraTarifas.setFechaSalida(fechaSalida);
  const fechaFormateadaEntrada = calculadoraTarifas.obtenerFechaEntradaFormateada();
  resultadoDiv.textContent = fechaFormateadaEntrada;
  const fechaFormateadaSalida = calculadoraTarifas.obtenerFechaSalidaFormateada();
  resultadoDivSalida.textContent = fechaFormateadaSalida;
  // Mostrar resultado del cálculo
  const resultado = calculadoraTarifas.calcularTarifa();
  // Icono de éxito o error
  if (resultado.error) {
    iconoResultado.textContent = "❌";
    iconoResultado.style.color = "red";
    resultadoCalculo.textContent = resultado.error;
    detallesCalculo.textContent = ""; // Limpiar detalles en caso de error
  } else {
    iconoResultado.textContent = "✔️";
    iconoResultado.style.color = "green";
    resultadoCalculo.textContent = resultado.totalFormateado;
    detallesCalculo.innerHTML = resultado.detalles.replace(/\. /g, ".<br>");
  }
});