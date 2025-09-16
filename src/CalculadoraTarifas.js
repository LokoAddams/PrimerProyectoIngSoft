class CalculadoraTarifas {
  #fecha;
  constructor(nuevaFecha = undefined) {
    const formatoValido = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;

    if (formatoValido.test(nuevaFecha)) {
      this.#fecha = new Date(nuevaFecha);
    }
    else{
      this.#fecha = undefined;
    }
  }
  obtenerFechaFormateada() {
    if(this.#fecha === undefined){
      return 'Formato de fecha inválido. Use YYYY-MM-DD HH:MM.';
    }
    const anio = this.#fecha.getFullYear();
    const mes = String(this.#fecha.getMonth() + 1).padStart(2, '0'); // Los meses son de 0-11
    const dia = String(this.#fecha.getDate()).padStart(2, '0');
    const horas = String(this.#fecha.getHours()).padStart(2, '0');
    const minutos = String(this.#fecha.getMinutes()).padStart(2, '0');
    return `${anio}-${mes}-${dia} ${horas}:${minutos}`;
  }
}
module.exports = CalculadoraTarifas;