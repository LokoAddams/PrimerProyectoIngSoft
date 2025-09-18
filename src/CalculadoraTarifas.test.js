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
    expect(resultado.totalFormateado).toEqual('Total: Bs 10.00');
  })
})

// 5
describe("Error si la salida es antes que la entrada", () => {
  it("Deberia mostrar un mensaje de error si la fecha de salida es anterior a la de entrada", () => {
    const calculadoraTarifas = new CalculadoraTarifas();
    calculadoraTarifas.setFechaEntrada('2025-09-10 20:00');
    calculadoraTarifas.setFechaSalida('2025-09-10 19:30');
    const resultado = calculadoraTarifas.calcularTarifa();
    expect(resultado.error).toEqual('La fecha de salida no puede ser anterior a la fecha de entrada.');
  });
});

// 6
describe("Calcular horas cobrables (redondeo hacia arriba)", () => {
  it("Deberia redondear hacia arriba la fraccion de hora", () => {
    const calculadoraTarifas = new CalculadoraTarifas();
    calculadoraTarifas.setFechaEntrada('2025-09-10 18:00');
    calculadoraTarifas.setFechaSalida('2025-09-10 21:10');
    const resultado = calculadoraTarifas.calcularTarifa();
    expect(resultado.totalFormateado).toEqual('Total: Bs 40.00');
  });
});

// 7
describe("Total NOCTURNO simple (22:00pm–06:00am a 6 Bs/h)", () => {
  it("Deberia calcular la tarifa para un periodo nocturno simple", () => {
    const calculadoraTarifas = new CalculadoraTarifas();
    calculadoraTarifas.setFechaEntrada('2025-09-10 22:20');
    calculadoraTarifas.setFechaSalida('2025-09-11 05:10'); // Cruza la medianoche
    const resultado = calculadoraTarifas.calcularTarifa();
    expect(resultado.totalFormateado).toEqual('Total: Bs 42.00');
  });
});
//8
describe("total nocturno  complicado (10:00am–06:00am a 6 Bs/h solo horas dentro de ese rango)", () => {
  it("Deberia calcular la tarifa para un periodo nocturno complicado solo aplicando la tarfica de 6 bs hora a las horas entre las 22pm y las 06am", () => {
    const calculadoraTarifas = new CalculadoraTarifas();
    calculadoraTarifas.setFechaEntrada('2025-09-10 10:00');
    calculadoraTarifas.setFechaSalida('2025-09-11 13:10'); // Cruza la medianoche
    const resultado = calculadoraTarifas.calcularTarifa();
    expect(resultado.totalFormateado).toEqual('Total: Bs 248.00');
  });
});



// 9
describe("Aplicar TOPE diario de 50 Bs", () => {
  it("Deberia aplicar el tope diario de 50 Bs si el costo excede ese monto en un solo dia", () => {
    const calculadoraTarifas = new CalculadoraTarifas();
    calculadoraTarifas.setFechaEntrada('2025-09-10 08:00');
    calculadoraTarifas.setFechaSalida('2025-09-10 20:30'); // 13 horas * 10 Bs/h = 130 Bs
    const resultado = calculadoraTarifas.calcularTarifa();
    expect(resultado.totalFormateado).toEqual('Total: Bs 50.00');
  });
});