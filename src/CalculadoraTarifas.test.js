import CalculadoraTarifas from './CalculadoraTarifas.js';

describe("Ingresar la hora de ENTRADA y que se vea en pantalla", () => {
  it("Deberia ingresar la hora de entrada y verla en pantalla", () => {
    const calculadoraTarifas = new CalculadoraTarifas('2025-09-10 18:00');
    const obtenerFecha = calculadoraTarifas.obtenerFechaFormateada(); 
    expect(obtenerFecha).toEqual('2025-09-10 18:00');
  })
})

describe("Formato de fecha invalido", () => {
  it("Deberia mostrar un mensaje de error para formato de fecha invalido", () => {
    const calculadoraTarifas = new CalculadoraTarifas('2025');
    const obtenerFecha = calculadoraTarifas.obtenerFechaFormateada(); 
    expect(obtenerFecha).toEqual('Formato de fecha inválido. Use YYYY-MM-DD HH:MM.');
  })
})