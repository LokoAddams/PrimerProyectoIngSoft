class CalculadoraTarifas {
  #fechaEntrada;
  #fechaSalida;
  constructor() {
    
  }
  setFecha(nuevaFechaEntrada) {
    const formatoValido = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;

    if (formatoValido.test(nuevaFechaEntrada)) {
      this.#fechaEntrada = new Date(nuevaFechaEntrada);
    } else {
      this.#fechaEntrada = undefined;
    }
  }
  setFechaSalida(nuevaFechaSalida) {
    const formatoValido = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;

    if (formatoValido.test(nuevaFechaSalida)) {
      this.#fechaSalida = new Date(nuevaFechaSalida);
    } else {
      this.#fechaSalida = undefined;
    }
  }

  obtenerFechaFormateada() {
    if(this.#fechaEntrada === undefined){
      return 'Formato de fecha inválido. Use YYYY-MM-DD HH:MM.';
    }
    const anio = this.#fechaEntrada.getFullYear();
    const mes = String(this.#fechaEntrada.getMonth() + 1).padStart(2, '0'); // Los meses son de 0-11
    const dia = String(this.#fechaEntrada.getDate()).padStart(2, '0');
    const horas = String(this.#fechaEntrada.getHours()).padStart(2, '0');
    const minutos = String(this.#fechaEntrada.getMinutes()).padStart(2, '0');
    return `${anio}-${mes}-${dia} ${horas}:${minutos}`;
  }
  obtenerFechaSalidaFormateada() {
    if(this.#fechaSalida === undefined){
      return 'Formato de fecha inválido. Use YYYY-MM-DD HH:MM.';
    }
    const anio = this.#fechaSalida.getFullYear();
    const mes = String(this.#fechaSalida.getMonth() + 1).padStart(2, '0'); // Los meses son de 0-11
    const dia = String(this.#fechaSalida.getDate()).padStart(2, '0');
    const horas = String(this.#fechaSalida.getHours()).padStart(2, '0');
    const minutos = String(this.#fechaSalida.getMinutes()).padStart(2, '0');
    return `${anio}-${mes}-${dia} ${horas}:${minutos}`;
  }
}
module.exports = CalculadoraTarifas;