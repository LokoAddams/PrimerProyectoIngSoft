import CalculadoraTarifas from "./CalculadoraTarifas.js";

const calcularBtn = document.querySelector("#calcular");
const resultadoDiv = document.querySelector("#resultado");

calcularBtn.addEventListener("click", () => {
  const fechaEntrada = document.querySelector("#fecha-entrada").value;

    const calculadoraTarifas = new CalculadoraTarifas(fechaEntrada);
    const fechaFormateada = calculadoraTarifas.obtenerFechaFormateada();
    resultadoDiv.textContent = fechaFormateada;
});