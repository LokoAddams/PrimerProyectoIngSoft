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
    // Validación: si fechas no válidas, retorna un objeto de error
    if (!this.#fechaEntrada || !this.#fechaSalida) {
      return { error: 'Formato de fecha inválido. Use YYYY-MM-DD HH:MM.' };
    }
    const msPorHora = 1000 * 60 * 60;
    const diffMs = this.#fechaSalida - this.#fechaEntrada;
    if (diffMs < 0) {
      return { error: 'La fecha de salida no puede ser anterior a la fecha de entrada.' };
    }
    const horasExactas = diffMs / msPorHora;
    const horasCobrables = Math.ceil(horasExactas);
    const total = horasCobrables * this.#precioNormalHora;

    let detalles = `Horas exactas: ${horasExactas.toFixed(2)}. Horas a cobrar: ${horasCobrables}.`;
    if (horasCobrables > horasExactas) {
        detalles += ` (Se aplicó redondeo hacia arriba)`;
    }

    return {
        totalFormateado: `Total: Bs ${total.toFixed(2)}`,
        detalles: detalles
    };
  }
}
export default CalculadoraTarifas;