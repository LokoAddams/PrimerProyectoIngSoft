import CalculadoraTarifas from "./CalculadoraTarifas.js";

const calcularBtn = document.querySelector("#calcular");
const resultadoDiv = document.querySelector("#resultado-fecha-entrada");
const resultadoDivSalida = document.querySelector("#resultado-fecha-salida");

calculadoraTarifas = new CalculadoraTarifas();
calcularBtn.addEventListener("click", () => {
  const fechaEntrada = document.querySelector("#fecha-entrada").value;
  const fechaSalida = document.querySelector("#fecha-salida").value;
  calculadoraTarifas.setFechaSalida(fechaSalida);
  const fechaFormateadaSalida = calculadoraTarifas.obtenerFechaSalidaFormateada();
  resultadoDivSalida.textContent = fechaFormateadaSalida;
  calculadoraTarifas.setFechaEntrada(fechaEntrada);
  const fechaFormateadaEntrada = calculadoraTarifas.obtenerFechaEntradaFormateada();
  resultadoDiv.textContent = fechaFormateadaEntrada;
});