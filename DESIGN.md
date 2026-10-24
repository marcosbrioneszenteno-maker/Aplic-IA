# DESIGN.md — Web de transporte de cargas (cliente: Victoria)

Dirección: **"Hoja de ruta, versión amigable"**. Una web clara y liviana,
como la de los líderes del rubro por tráfico (Correo Argentino, Andreani, OCA,
Via Cargo): fondo claro con tinte de marca, seguimiento arriba, accesos rápidos
con ícono, servicios en fichas de una línea y pasos ilustrados. Poco texto,
mucha acción. Transmite cercanía y confianza, no tecnología ni lujo.

Referencias completas por tráfico en `docs/referencias-trafico.md`.

## En qué se basa

Sitios reales comparados el 24/10/2026 (capturas en escritorio):

- Argentina: Andreani, Via Cargo, Cruz del Sur, OCA.
- Mundo: XPO, Kuehne+Nagel, DSV (ex DB Schenker), Flexport, FedEx.

Patrones que se repiten en todos y adoptamos:

1. El **seguimiento de envío** es lo primero del hero (Andreani, Via Cargo,
   XPO, Kuehne+Nagel, DSV): un campo grande y un botón, sin registro.
2. Un bloque de **herramientas** justo debajo: cotizar, localidades,
   sucursales o depósitos, retiros (Cruz del Sur, OCA, Via Cargo).
3. **Buscador por provincia y localidad** (OCA, Cruz del Sur) para la
   pregunta más frecuente: "¿llegan a mi pueblo?".
4. **WhatsApp flotante** (Via Cargo, Cruz del Sur).
5. Foto real de operación (camión, depósito) como fondo o apoyo del hero.

Lo que evitamos a propósito: carruseles (OCA, Via Cargo), banners de
promociones que tapan la acción (Andreani), ventanas de cookies que bloquean
la pantalla (DSV, Kuehne+Nagel), tres tarjetas idénticas con ícono.

Colores que ya ocupan los competidores locales, y por eso no usamos como
primario: rojo (Andreani), verde (Via Cargo), azul marino + celeste (Cruz del
Sur), violeta (OCA).

## Color

Un solo tema claro. No hay modo oscuro en el alcance.

| Token | Valor | Rol |
|---|---|---|
| `--ink` | `#1B2430` | Texto principal, títulos |
| `--ink-2` | `#536070` | Texto secundario |
| `--line` | `#DDE3E9` | Bordes, divisores |
| `--surface` | `#FFFFFF` | Tarjetas y paneles |
| `--canvas` | `#F4F7F9` | Secciones alternas |
| `--tint` | `#E6F3F6` | Fondo del hero y de la sección de cotización (tinte de marca) |
| `--deep` | `#12303D` | Solo el pie de página |
| `--primary` | `#0F6F82` | Botones, enlaces, íconos, provincia activa |
| `--primary-hover` | `#0B5968` | Hover del primario |
| `--primary-soft` | `#D9EEF2` | Fondo de íconos de pasos, foco de campos |
| `--accent` | `#F5A524` | Provincias con depósito en el mapa |
| `--accent-soft` | `#FFF1D6` | Chips de cifras, localidad con depósito |
| `--accent-ink` | `#7A4B00` | Texto sobre `--accent-soft` |
| `--success` / `--warning` / `--error` | `#1E8E5A` / `#B7791F` / `#C53030` | Estados |
| WhatsApp | `#25D366` | Solo el botón de WhatsApp, por reconocimiento |

Contraste: `--ink` sobre blanco 14.9:1; `--ink-2` sobre blanco 6.4:1; blanco
sobre `--primary` 5.6:1; `--accent-ink` sobre `--accent-soft` 7.8:1.

## Tipografía

Una sola familia: **Nunito** (Google Fonts), redondeada y amigable. Ningún
competidor local la usa (Andreani: Rubik; Via Cargo: Cairo; OCA: Fira;
Correo: Gilroy; Urbano: Montserrat). Títulos en peso 800, subtítulos 700,
cuerpo 400 y 600 para datos. Números con `tabular-nums`.

| Token | Tamaño / interlineado | Uso |
|---|---|---|
| `--t-xs` | 13px / 1.4 | Notas, ayudas de campo |
| `--t-sm` | 15px / 1.5 | Texto compacto, chips |
| `--t-md` | 17px / 1.6 | Cuerpo |
| `--t-lg` | 20px / 1.5 | Intro de sección |
| `--t-xl` | 24px / 1.3 | Título de tarjeta |
| `--t-2xl` | 32px / 1.15 | Título de sección (móvil) |
| `--t-3xl` | 40px / 1.15 | Título de sección (escritorio) |
| `--t-4xl` | 52px / 1.1 | Título del hero (escritorio) |

Líneas de texto de hasta 62 caracteres (`--measure: 62ch`). Ningún bloque de
texto supera dos líneas salvo las respuestas de preguntas frecuentes.

## Espaciado y ancho

Escala de 8: `4, 8, 12, 16, 24, 32, 48, 64, 96`. Secciones con 64px de
aire vertical en móvil y 96px en escritorio. Contenido a 1200px máximo con
16px de margen lateral en móvil y 32px desde tablet.

## Forma y profundidad

Radios generosos: `10px` campos, `16px` tarjetas, `24px` tarjeta del mapa,
píldora para botones, chips y cifras. Dos sombras: `--shadow` para el panel
de seguimiento y el formulario de cotización, `--shadow-sm` para fichas y
tarjetas sobre fondo gris.

## Componentes

- **Botón primario**: píldora, fondo `--primary`, texto blanco, 50px de alto,
  hover `--primary-hover`, foco con anillo de 3px `--accent`, disabled al
  50% sin hover.
- **Botón secundario**: fondo blanco, borde 1.5px `--ink`, texto `--ink`.
- **Botón silencioso**: solo texto `--primary` subrayado al hover.
- **Enlace**: `--primary`, subrayado siempre, grosor 1.5px.
- **Campo**: 48px de alto, borde 1.5px `--line`, foco borde `--primary` y
  anillo `--primary-soft`; etiqueta visible encima; error en `--error` con
  texto explicativo debajo.
- **Panel de seguimiento**: tarjeta blanca con la sombra única, sobre el
  hero oscuro.
- **Accesos rápidos**: 4 tiles con ícono y una etiqueta, debajo del hero.
- **Ficha de servicio**: ícono de 36px, título y una línea. Nunca párrafos.
- **Chip de provincia**: píldora con borde, activa con fondo `--primary` y
  texto blanco; con depósito lleva un punto `--accent`. Sin cobertura, gris
  y deshabilitada.
- **Chips de cifras**: píldoras `--accent-soft` sobre el mapa (provincias,
  depósitos, localidades).
- **Tarjeta de depósito**: fondo `--surface`, borde `--line`, radio 12,
  dirección, horario y teléfono con enlaces reales.
- **Acordeón de preguntas**: `details/summary` nativo, divisor `--line`.
- **Navegación**: barra blanca fija, logo a la izquierda, 4 enlaces,
  botón "Cotizar por WhatsApp" a la derecha; en móvil, menú desplegable con
  botón accesible.
- **WhatsApp flotante**: solo en móvil, 56px, abajo a la derecha.
- **Pie**: fondo `--deep`, texto claro, datos de contacto, depósitos, legal.

## Imágenes e íconos

- El elemento memorable es el **mapa de Argentina por provincias** en el
  hero y en la sección de cobertura: las provincias con depósito se
  iluminan en `--accent`, las atendidas en `--primary-soft`.
- Fotos: solo reales (camiones, depósitos, equipo) cuando Victoria las
  envíe. Hasta entonces, el mapa y el panel de seguimiento sostienen el
  hero, sin fotos de stock.
- Íconos: un set propio en SVG inline, trazo 1.75px, 24px, color del texto.
  Nunca emoji.

## Movimiento

Una sola animación de entrada en el hero (el mapa ilumina los depósitos al
cargar). El resto responde solo a acciones del usuario (abrir acordeón,
filtrar localidades). Todo se desactiva con `prefers-reduced-motion`.
