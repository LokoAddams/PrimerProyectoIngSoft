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
  #precioNocturnoHora = 6;
  #inicioNocturno = 22; // 10 PM
  #finNocturno = 6;    // 6 AM

  #esHoraNocturna(hora) {
    return hora >= this.#inicioNocturno || hora < this.#finNocturno;
  }

  #calcularHorasCobrables(inicio, fin) {
    const msPorHora = 1000 * 60 * 60;
    const diffMs = fin - inicio;
    const horasExactas = diffMs / msPorHora;
    const horasCobrables = Math.ceil(horasExactas);
    return { horasExactas, horasCobrables };
  }

  calcularTarifa() {
    // Validación: si fechas no válidas, retorna un objeto de error
    if (!this.#fechaEntrada || !this.#fechaSalida) {
      return { error: 'Formato de fecha inválido. Use YYYY-MM-DD HH:MM.' };
    }
    
    if (this.#fechaSalida < this.#fechaEntrada) {
      return { error: 'La fecha de salida no puede ser anterior a la fecha de entrada.' };
    }

    const { horasExactas, horasCobrables } = this.#calcularHorasCobrables(this.#fechaEntrada, this.#fechaSalida);
    
    if (horasCobrables === 0 && horasExactas > 0) { // Estancias muy cortas se cobran como 1h
        const tarifaAplicada = this.#esHoraNocturna(this.#fechaEntrada.getHours()) ? this.#precioNocturnoHora : this.#precioNormalHora;
        return {
            totalFormateado: `Total: Bs ${tarifaAplicada.toFixed(2)}`,
            detalles: `Horas exactas: ${horasExactas.toFixed(2)}. Horas a cobrar: 1. Tarifa: ${tarifaAplicada} Bs/h. (Se aplicó redondeo hacia arriba)`
        };
    }

    let total = 0;
    let horasDiurnas = 0;
    let horasNocturnas = 0;
    let fechaCursor = new Date(this.#fechaEntrada);

    for (let i = 0; i < horasCobrables; i++) {
        const horaActual = fechaCursor.getHours();
        if (this.#esHoraNocturna(horaActual)) {
            horasNocturnas++;
        } else {
            horasDiurnas++;
        }
        fechaCursor.setHours(fechaCursor.getHours() + 1);
    }
    
    total = (horasDiurnas * this.#precioNormalHora) + (horasNocturnas * this.#precioNocturnoHora);

    let detalles = `Horas Diurnas: ${horasDiurnas} (Bs ${this.#precioNormalHora}/h). Horas Nocturnas: ${horasNocturnas} (Bs ${this.#precioNocturnoHora}/h).`;
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