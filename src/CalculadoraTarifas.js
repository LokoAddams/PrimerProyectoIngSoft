class CalculadoraTarifas {
  #fecha;
  constructor(nuevaFecha) {
    this.#fecha = new Date(nuevaFecha);
  }
  
  obtenerFechaFormateada() {
    const anio = this.#fecha.getFullYear();
    const mes = String(this.#fecha.getMonth() + 1).padStart(2, '0'); // Los meses son de 0-11
    const dia = String(this.#fecha.getDate()).padStart(2, '0');
    const horas = String(this.#fecha.getHours()).padStart(2, '0');
    const minutos = String(this.#fecha.getMinutes()).padStart(2, '0');
    return `${anio}-${mes}-${dia} ${horas}:${minutos}`;
  }
}
module.exports = CalculadoraTarifas;