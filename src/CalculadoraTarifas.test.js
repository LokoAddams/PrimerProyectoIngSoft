import CalculadoraTarifas from './CalculadoraTarifas.js';
// 1
describe("Ingresar la hora de ENTRADA y que se vea en pantalla", () => {
  it("Deberia ingresar la hora de entrada y verla en pantalla", () => {
    const calculadoraTarifas = new CalculadoraTarifas();
    calculadoraTarifas.setFechaEntrada('2025-09-10 18:00');
    const obtenerFecha = calculadoraTarifas.obtenerFechaEntradaFormateada(); 
    expect(obtenerFecha).toEqual('2025-09-10 18:00');
  })
})
// 2
describe("Formato de fecha invalido", () => {
  it("Deberia mostrar un mensaje de error para formato de fecha invalido", () => {
    const calculadoraTarifas = new CalculadoraTarifas();
    calculadoraTarifas.setFechaEntrada('2025');
    const obtenerFecha = calculadoraTarifas.obtenerFechaEntradaFormateada(); 
    expect(obtenerFecha).toEqual('Formato de fecha inválido. Use YYYY-MM-DD HH:MM.');
  })
})
// 3
describe("Ingresar la hora de SALIDA y que se vea en pantalla", () => {
  it("Deberia ingresar la hora de salida y verla en pantalla", () => {
    const calculadoraTarifas = new CalculadoraTarifas();
    calculadoraTarifas.setFechaSalida('2025-09-10 20:00');
    const obtenerFecha = calculadoraTarifas.obtenerFechaSalidaFormateada();
    expect(obtenerFecha).toEqual('2025-09-10 20:00');
  })
})
// 4
describe("Error si CALCULAR no retorna nada", () => {
  it("Deberia mostrar total a pagar", () => {
    const calculadoraTarifas = new CalculadoraTarifas();
    calculadoraTarifas.setFechaEntrada('2025-09-10 20:00');
    calculadoraTarifas.setFechaSalida('2025-09-10 21:00');
    const resultado = calculadoraTarifas.calcularTarifa();
    expect(resultado).toEqual('Total: Bs 10.00');
  })
})
