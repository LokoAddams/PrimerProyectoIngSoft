class CalculadoraTarifas {
  #fechaEntrada;
  #fechaSalida;
  constructor() {
    
  }
  #validate(fecha){
    const formatoValido = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
    
    if (formatoValido.test(fecha)) {
      return new Date(fecha);
    } else {
      return undefined;
    }
  }
  setFechaEntrada(nuevaFechaEntrada) {
    this.#fechaEntrada = this.#validate(nuevaFechaEntrada);
  }
  setFechaSalida(nuevaFechaSalida) {
    this.#fechaSalida = this.#validate(nuevaFechaSalida);
  }

  #formatearFecha(fecha) {
    if(fecha === undefined){
      return 'Formato de fecha inválido. Use YYYY-MM-DD HH:MM.';
    }
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses son de 0-11
    const dia = String(fecha.getDate()).padStart(2, '0');
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    return `${anio}-${mes}-${dia} ${horas}:${minutos}`;
  }
  obtenerFechaEntradaFormateada() {
    return this.#formatearFecha(this.#fechaEntrada);
  }
  obtenerFechaSalidaFormateada() {
    return this.#formatearFecha(this.#fechaSalida);
  }
  #precioNormalHora = 10;
  calcularTarifa() {
    // Calculo básico: diferencia en horas, redondeo hacia arriba, tarifa fija 10 Bs/h
    const msPorHora = 1000 * 60 * 60;
    const diffMs = this.#fechaSalida - this.#fechaEntrada;
    const horas = (diffMs / msPorHora);
    const total = horas * this.#precioNormalHora;
    return `Total: Bs ${total.toFixed(2)}`;
  }
}
module.exports = CalculadoraTarifas;