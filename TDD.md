# TDD
## 1) Ingresar la hora de ENTRADA y que se vea en pantalla

* **Prueba (ROJO):** escribo `2025-09-10 18:00` como entrada y la pantalla la muestra igual.
* **Implementación (VERDE):** guardar y renderizar la hora de entrada en su campo/etiqueta.
* **Refactor:** nombres claros (ej. `entradaHora`).
* **Commits:**

  1. `test: no muestra hora de entrada en pantalla`
  2. `feat: ingresar y visualizar hora de entrada`
  3. `refactor: nombres claros para campo de entrada`

## 2) Ingresar la hora de ENTRADA y que se vea en pantalla

* **Prueba (ROJO):** escribo `2025` y muestra un mensaje de error de formato invalido.
* **Implementación (VERDE):** indentificar formatos invalidos.
* **Refactor:** hacer objeto "calculadoraTarifas" tarifas global para presenter.js y setter
* **Commits:**

  1. `test: no valida formato invalido`
  2. `feat: retornar y visualizar mensaje de formato invalido`
  3. `refactor: hacer objeto "calculadoraTarifas" tarifas global para presenter.js y setter` 

## 3) Ingresar la hora de SALIDA y que se vea en pantalla

* **ROJO:** escribo `2025-09-10 21:10` como salida y se ve igual.
* **VERDE:** guardar y mostrar hora de salida.
* **Refactor:** función común para formatear/validar horas.
* **Commits:**
  `test: no muestra hora de salida en pantalla` · 
  `feat: ingresar y visualizar hora de salida` · 
  `refactor: función común para formatear/validar horas`

## 4) Botón CALCULAR

* **ROJO:** al presionar **Calcular** no se retorna nada.
* **VERDE:** con datos cargados, al presionar **Calcular** se actualiza total.
* **Refactor:** mostrar mensaje de exito UI.
* **Commits:**
  `test: al presionar Calcular no retorna nada (en el git me equivoque y le puse "test: al presionar Calcular se actualiza total")` · 
  `feat: acción de cálculo en botón` · 
  `refactor: mostrar mensaje de exito o fallo en UI`

## 5) Error si la salida es antes que la entrada

* **ROJO:** entrada `20:00`, salida `19:30` → se ve “La salida no puede ser anterior a la entrada”.
* **VERDE:** comparar fechas; si es inválido, mostrar mensaje y bloquear cálculo.
* **Refactor:** util `showError(mensaje)`.
* **Commits:**
  `test: no da error si salida < entrada` · 
  `feat: validación de horario (salida >= entrada)` · `refactor: utilitario showError`

## 6) Calcular horas cobrables (redondeo hacia arriba)

* **ROJO:** `18:00 → 21:10` → **4 horas**.
* **VERDE:** diferencia de tiempo con redondeo hacia arriba por fracción.
* **Refactor:** `calcularHorasCobrables(inicio, fin)`.
* **Commits:**
  `test: calcula horas cobrables con redondeo` ·
  `feat: lógica de horas cobrables` · 
  `refactor: función calcularHorasCobrables`

## 5) Total DIURNO simple (10 Bs/h)

* **ROJO:** `18:00 → 21:10` (todo diurno) → **Bs 40.00** (4×10).
  *Prueba:* `calcula_total_diurno_simple`
* **VERDE:** multiplicar horas diurnas × 10 Bs.
* **Refactor:** servicio `tarifas.diurno()`.
* **Commits:**
  `test: total diurno en un día` · `feat: tarifa diurna (10 Bs/h)` · `refactor: servicio tarifas.diurno()`

## 6) Mostrar total con 2 decimales

* **ROJO:** de `40` a **“Bs 40.00”**.
  *Prueba:* `formatea_monto_dos_decimales`
* **VERDE:** formateo monetario (2 decimales, prefijo Bs).
* **Refactor:** util `formatearBs()`.
* **Commits:**
  `test: formatea montos a dos decimales` · `feat: formateo de dinero Bs` · `refactor: utilitario formatearBs`

## 7) Total NOCTURNO simple (22:00–06:00 a 6 Bs/h)

* **ROJO:** `23:20 → 01:10` → **2 h × 6 = Bs 12.00**.
  *Prueba:* `calcula_total_nocturno_simple`
* **VERDE:** detectar ventana nocturna y aplicar 6 Bs/h (redondeo).
* **Refactor:** `calcularHorasNocturnas()`.
* **Commits:**
  `test: total nocturno (22-06)` · `feat: tarifa nocturna (6 Bs/h)` · `refactor: función calcularHorasNocturnas`

## 8) Combinar DIURNO + NOCTURNO con detalle

* **ROJO:** `21:30 → 23:45` → diurno 0:30 (→1h=10) + nocturno 1:45 (→2h=12) = **Bs 22.00**.
  *Prueba:* `combina_diurno_y_nocturno_con_detalle`
* **VERDE:** partir el intervalo por ventanas y aplicar cada tarifa con su redondeo; mostrar desglose.
* **Refactor:** modelo `DetalleDia` (líneas por segmento).
* **Commits:**
  `test: combina diurno+nocturno con detalle` · `feat: cálculo combinado con desglose` · `refactor: modelo DetalleDia`

## 9) Separar por DÍAS con subtotales (cruce de medianoche)

* **ROJO:** `21:00 → 01:15` → Día 1 ≈ **Bs 22.00**, Día 2 ≈ **Bs 12.00**, Total **Bs 34.00** (según desglose).
  *Prueba:* `separa_por_dias_con_subtotales`
* **VERDE:** cortar por día calendario y calcular subtotales por día.
* **Refactor:** `partirPorDia(inicio, fin)`.
* **Commits:**
  `test: separa por días con subtotales` · `feat: desglose por día` · `refactor: función partirPorDia`

## 10) Aplicar TOPE diario de 50 Bs

* **ROJO:** `08:00 → 20:30` (mismo día) → antes del tope **Bs 130.00**, cobro día = **Bs 50.00**.
  *Prueba:* `aplica_tope_diario_por_dia`
* **VERDE:** aplicar tope 50 Bs por **cada día**.
* **Refactor:** flag `topeAplicado` y campo `antesDeTope`.
* **Commits:**
  `test: aplica tope diario 50 Bs` · `feat: política de tope por día` · `refactor: marca topeAplicado`

## 11) Aviso visual cuando un día llegó al TOPE

* **ROJO:** si un día alcanzó 50, se ve “**Tope alcanzado (Día X)**”.
  *Prueba:* `muestra_aviso_tope_alcanzado`
* **VERDE:** renderizar aviso cuando `topeAplicado = true`.
* **Refactor:** componente `AvisoTope(día)`.
* **Commits:**
  `test: muestra aviso de tope alcanzado` · `feat: marca visual de tope por día` · `refactor: componente AvisoTope`

## 12) Varios días: tope por cada día + resumen

* **ROJO:** `Vie 10:00 → Lun 09:00` → resumen por día (ej. Día1=50, Día2=50, Día3=50, Día4=…) + **Total**.
  *Prueba:* `aplica_tope_varios_dias_con_resumen`
* **VERDE:** iterar días, aplicar tope, sumar y construir resumen final.
* **Refactor:** `resumenPorDia(listaDias)`.
* **Commits:**
  `test: tope en varios días con resumen` · `feat: resumen multi-día con topes` · `refactor: función resumenPorDia`

## 13) Ticket perdido = Bs 80.00 (anula cálculos)

* **ROJO:** marcar “Ticket perdido = Sí” → total **Bs 80.00**, sin desglose.
  *Prueba:* `ticket_perdido_sobrescribe_total`
* **VERDE:** si `ticketPerdido=true`, devolver 80 y ocultar detalle.
* **Refactor:** desactivar campos de hora si está perdido.
* **Commits:**
  `test: ticket perdido cobra 80` · `feat: penalidad ticket perdido` · `refactor: desactiva campos si perdido`


## 15) Botón LIMPIAR

* **ROJO:** al presionar **Limpiar**, entradas y resultados quedan vacíos.
  *Prueba:* `boton_limpiar_restaurar_estado`
* **VERDE:** resetear estado (entradas, total, desglose).
* **Refactor:** función `resetEstado()` reutilizable.
* **Commits:**
  `test: botón limpiar resetea` · `feat: acción limpiar` · `refactor: función resetEstado`

## 16) Recordar últimos datos (opcional)

* **ROJO:** activo “Recordar últimos datos” → cierro y vuelvo, aparecen mis últimos datos.
  *Prueba:* `recuerda_ultimos_datos_activado`
* **VERDE:** guardar/leer estado simple (p.ej., localStorage) cuando el toggle está “on”.
* **Refactor:** módulo `almacenamiento()`.
* **Commits:**
  `test: recuerda últimos datos` · `feat: recordar últimos datos (opcional)` · `refactor: módulo almacenamiento`

## 17) Botón COPIAR total

* **ROJO:** al presionar **Copiar**, el valor (ej. “Bs 22.00”) queda listo para pegar y la UI muestra “Copiado”.
  *Prueba:* `copia_total_al_portapapeles`
* **VERDE:** generar texto del total y llamar API de copiar (o fallback); mostrar confirmación.
* **Refactor:** `getTextoTotal()` reutilizable.
* **Commits:**
  `test: copia total para pegar` · `feat: acción copiar total` · `refactor: util getTextoTotal`

## 18) AYUDA con reglas (diurno/nocturno/tope)

* **ROJO:** al abrir **Ayuda**, veo reglas en lenguaje simple con ejemplos.
  *Prueba:* `muestra_ayuda_reglas_de_cobro`
* **VERDE:** panel/modal con contenido estático claro.
* **Refactor:** componente `Ayuda()`.
* **Commits:**
  `test: muestra ayuda con reglas` · `feat: panel de ayuda de reglas` · `refactor: componente Ayuda`
