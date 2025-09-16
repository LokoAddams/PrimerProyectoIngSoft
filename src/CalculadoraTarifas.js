class CalculadoraTarifas {
  #fecha;
  constructor(nuevaFecha) {
    this.#fecha = new String(nuevaFecha);
  }
  
  obtenerFechaFormateada() {
    return this.#fecha.toString();
  }
}
module.exports = CalculadoraTarifas;