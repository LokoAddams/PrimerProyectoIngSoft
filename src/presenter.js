import CalculadoraTarifas from "./CalculadoraTarifas.js";

const calcularBtn = document.querySelector("#calcular");
const resultadoDiv = document.querySelector("#resultado-fecha-entrada");
const resultadoDivSalida = document.querySelector("#resultado-fecha-salida");
const resultadoCalculo = document.createElement("div");
resultadoCalculo.id = "resultado-calculo";
document.body.appendChild(resultadoCalculo);

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
  resultadoCalculo.textContent = resultado;
  // Icono de éxito o error
  if (resultado && resultado.startsWith("Total: Bs") && !resultado.includes("NaN")) {
    iconoResultado.textContent = "✔️";
    iconoResultado.style.color = "green";
  } else {
    iconoResultado.textContent = "❌";
    iconoResultado.style.color = "red";
  }
});