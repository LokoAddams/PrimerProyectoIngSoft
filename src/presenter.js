import CalculadoraTarifas from "./CalculadoraTarifas.js";

const calcularBtn = document.querySelector("#calcular");
const resultadoDiv = document.querySelector("#resultado");
calculadoraTarifas = new CalculadoraTarifas();
calcularBtn.addEventListener("click", () => {
  const fechaEntrada = document.querySelector("#fecha-entrada").value;
    calculadoraTarifas.setFecha(fechaEntrada);
    const fechaFormateada = calculadoraTarifas.obtenerFechaFormateada();
    resultadoDiv.textContent = fechaFormateada;
});