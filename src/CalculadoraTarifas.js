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

    let desglosePorDia = {};
    let fechaCursor = new Date(this.#fechaEntrada);
    // console.log(this.#fechaEntrada);
    // console.log(this.#fechaSalida);
    // Itera hora por hora hasta la hora de salida real
    while (fechaCursor < this.#fechaSalida) {
        const anio = fechaCursor.getFullYear();
        const mes = String(fechaCursor.getMonth() + 1).padStart(2, '0');
        const dia = String(fechaCursor.getDate()).padStart(2, '0');
        const diaActual = `${anio}-${mes}-${dia}`;
        console.log("dia actual: " + diaActual);
        // console.log("fecha cursor:  "+fechaCursor);
        if (!desglosePorDia[diaActual]) {
            desglosePorDia[diaActual] = { diurnas: 0, nocturnas: 0 };
        }

        const horaActual = fechaCursor.getHours();
        console.log("hora actual: " + horaActual);
        if (this.#esHoraNocturna(horaActual)) {
            desglosePorDia[diaActual].nocturnas++;
        } else {
            desglosePorDia[diaActual].diurnas++;
        }
        fechaCursor.setHours(fechaCursor.getHours() + 1);

        
    }

    // Maneja el redondeo de la última hora
    const horasTotalesContadas = Object.values(desglosePorDia).reduce((acc, val) => acc + val.diurnas + val.nocturnas, 0);
    if (horasCobrables > horasTotalesContadas) {
        const diaSalida = this.#fechaSalida.toISOString().split('T')[0];
        if (!desglosePorDia[diaSalida]) {
            desglosePorDia[diaSalida] = { diurnas: 0, nocturnas: 0 };
        }
        // Asigna la hora de redondeo a la tarifa del momento de la salida
        if (this.#esHoraNocturna(this.#fechaSalida.getHours())) {
            desglosePorDia[diaSalida].nocturnas++;
        } else {
            desglosePorDia[diaSalida].diurnas++;
        }
    }
    
    let detalles = "";
    let totalHorasDiurnas = 0;
    let totalHorasNocturnas = 0;

    for (const dia in desglosePorDia) {
        var { diurnas, nocturnas } = desglosePorDia[dia];
        if (diurnas > 0 || nocturnas > 0) {
            detalles += `Día ${dia}: ${diurnas} horas diurnas, ${nocturnas} horas nocturnas. `;
        }
        if(diurnas + nocturnas > 5){
          diurnas = 5;
          nocturnas = 0;
          detalles += ("Tope diario aplicado el dia" + dia + " por horas diurnas.");
        } 
        if(nocturnas + diurnas > 5)
        {
          nocturnas = 5;
          diurnas = 0;
          detalles += ("Tope diario aplicado el dia " + dia + " por horas nocturnas.");
        }  
        if (diurnas > 0 || nocturnas > 0) {
            totalHorasDiurnas += diurnas;
            totalHorasNocturnas += nocturnas;
        }
    }

    let total = (totalHorasDiurnas * this.#precioNormalHora) + (totalHorasNocturnas * this.#precioNocturnoHora);

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