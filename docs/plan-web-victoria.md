# Plan de la web (una página, sitio estático)

Objetivo de la página: que un cliente de Victoria resuelva solo, sin
escribirle por chat, tres cosas: **dónde está mi envío**, **si llegan a mi
localidad** y **cuánto me cuesta** (pidiendo cotización por WhatsApp con los
datos ya ordenados).

Datos marcados así `[dato]` se completan con lo que Victoria manda el
lunes. En la página se ven con borde punteado para encontrarlos rápido.

| # | Sección | Su único trabajo | Contenido |
|---|---|---|---|
| 1 | Barra de navegación | Llevar a las 3 acciones | Logo, Seguimiento, Cobertura, Servicios, Contacto, botón "Cotizar por WhatsApp" |
| 2 | Hero | Rastrear o verificar cobertura en 5 segundos | Título: "Transporte de cargas a `[N]` provincias, con seguimiento online de cada envío". Panel con dos pestañas: **Seguir envío** (número + botón, abre el seguimiento del sistema) y **¿Llegamos a tu localidad?** (buscador). Mapa de Argentina con los depósitos iluminados. |
| 3 | Cobertura | Responder "¿llegan a X?" y "¿dónde dejo la carga?" | Chips por provincia (con punto si hay depósito), lista de localidades filtrable, tarjetas de depósito con dirección, horario y teléfono. |
| 4 | Servicios | Decir qué llevan y cómo | Lista concreta: tipos de carga, carga y descarga, retiro y entrega, almacenaje. Y qué no transportan. Sin tarjetas con ícono. |
| 5 | Cómo trabajamos | Bajar la ansiedad del primer envío | 4 pasos reales (es una secuencia, por eso va numerada): cotizás, retiramos o recibís en depósito, seguís online, entregamos. |
| 6 | Cotizar | Convertir | Formulario corto (origen, destino, tipo de carga, peso aprox.) que arma el mensaje de WhatsApp ya escrito. No envía datos a ningún servidor. |
| 7 | Preguntas frecuentes | Sacar objeciones | Qué necesito para enviar, cómo embalar, seguro, horarios, pagos. Respuestas pendientes de Victoria. |
| 8 | Contacto y pie | Que llamen o escriban | WhatsApp, teléfono, correo, depósitos, horario, redes. |

## Fuera del alcance de los 500 USD

Panel de administración, cuenta de cliente, cotizador automático con
tarifas, blog, varios idiomas, fotos profesionales, pasarela de pagos.
Se cotizan aparte si Victoria los pide.

## Decisiones técnicas

- HTML, CSS y JavaScript sin frameworks: carga en menos de 1 segundo,
  cero mantenimiento de dependencias, se aloja gratis en Vercel.
- Datos de cobertura en un solo archivo (`web/data.js`) para actualizar
  localidades sin tocar el diseño.
- El seguimiento abre el sistema de gestión de la empresa con el número
  cargado. Si el sistema permite incrustarlo, se cambia por un iframe.
