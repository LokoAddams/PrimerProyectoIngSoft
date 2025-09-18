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
  `feat: lógica de horas cobrables con UI` · 
  `refactor: función calcularHorasCobrables`


## 7) Total NOCTURNO simple (22:00pm–06:00am a 6 Bs/h)

* **ROJO:** `22:20 → 05:10` → **2 h × 6 = Bs 12.00**.
* **VERDE:** detectar ventana nocturna y aplicar 6 Bs/h (redondeo).
* **Refactor:** `calcularHorasNocturnas() + detalles`.
* **Commits:**
  `test: total nocturno (22-06)` ·
   `feat: tarifa nocturna (6 Bs/h)` ·
    `refactor: función calcularHorasNocturnas + detalles`

## 8) Total NOCTURNO complicado (10:00am–06:00am a 6 Bs/h solo horas dentro de ese rango)

* **ROJO:** `10:20 → 13:10(dia siguiente)` → **2 h × 6 = Bs 12.00 de 22:00pm–06:00am** .
* **VERDE:** detectar ventana nocturna y aplicar 6 Bs/h (redondeo).
* **Refactor:** `calcularHorasNocturnas() + detalles`.
* **Commits:**
  `test: total nocturno  complicado (10:00am–13:00pm(dia siguiente) a 6 Bs/h solo horas dentro de ese rango)` ·
   `feat: tarifa nocturna  complicado (10:00am–13:00pm(dia siguiente) a 6 Bs/h solo horas dentro de ese rango)` ·
    `refactor: detalles UI + fix: se estaba contando un dia de mas`


## 9) Aplicar TOPE diario de 50 Bs

* **ROJO:** `08:00 → 20:30` (mismo día) → antes del tope **Bs 130.00**, cobro día = **Bs 50.00**.
* **VERDE:** aplicar tope 50 Bs por **cada día**.
* **Refactor:** flag `topeAplicado` y campo `antesDeTope`.
* **Commits:**
  `test: aplica tope diario 50 Bs` · 
  `feat: política de tope por día` · 
  `refactor: detalles UI`


## 10) Ticket perdido = Bs 80.00 (anula cálculos)

* **ROJO:** marcar “Ticket perdido = Sí” → total **Bs 80.00**, sin desglose.
* **VERDE:** si `ticketPerdido=true`, devolver 80 y ocultar detalle.
* **Refactor:** desactivar campos de hora si está perdido.
* **Commits:**
  `test: ticket perdido cobra 80` · 
  `feat: penalidad ticket perdido` · 
  `refactor: activa/desactiva campo en UI por con ticket/sin ticket`


