# DESIGN.md — Web de transporte de cargas (cliente: Victoria)

Dirección: **"Un mapa y dos preguntas"**. Una página corta de cuatro
bloques que responde lo que los clientes preguntan por chat: dónde está mi
envío, si llegan a mi localidad, cuánto cuesta. El mapa de Argentina con las
provincias y depósitos es la imagen; lo demás es texto corto y formularios.
Sin tarjetas, sin chips de cifras, sin fichas con ícono: layout, tipografía
y espacio en blanco hacen el trabajo. Transmite cercanía y confianza.

Bloques: (1) hero con búsqueda de envío, búsqueda de localidad, mapa y
resultado de cobertura; (2) cómo trabajamos, con cuatro pasos; (3) pedí tu
cotización; (4) pie con depósitos y contacto.

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

- **Botón primario**: fondo `--primary`, texto blanco, 50px de alto, radio
  8px. **Secundario**: borde `--primary`, fondo transparente. **WhatsApp**:
  verde de WhatsApp, solo para el envío de la cotización y el flotante.
- **Campo**: 50px, borde 2px `--line`, foco `--primary`; etiqueta visible
  encima en peso 800. Error en `--error` debajo.
- **Búsquedas del hero**: dos filas (envío y localidad), sin pestañas, sin
  panel. La etiqueta es la pregunta.
- **Mapa**: provincias sin cobertura en gris azulado, con cobertura en
  `#9FCAD5`, con depósito en `#4EA0B4`, activa en `--primary`. Etiquetas con
  el nombre de la provincia en Nunito 800 con halo del color de fondo; punto
  `--accent` sobre las que tienen depósito.
- **Resultado de cobertura**: bajo las búsquedas, separado por una línea
  `--primary`. Título "Llegamos a X", un `select` para cambiar de provincia,
  una línea de depósito y las localidades como texto corrido separadas por
  comas. La localidad buscada va en negrita.
- **Pasos**: lista numerada con círculo `--primary`, una línea por paso.
- **Pie**: fondo `--deep`, depósitos y contacto como listas de texto.

## Imágenes e íconos

- El único elemento visual es el **mapa de Argentina por provincias**,
  generado desde el GeoJSON oficial del IGN. Sin tarjeta alrededor.
- Fotos: solo reales cuando Victoria las envíe. Sin stock.
- Íconos: solo dos, el camión del logo provisorio y el de WhatsApp.

## Movimiento

Ninguna animación de entrada. Solo transiciones de color al pasar o tocar
una provincia. Todo se desactiva con `prefers-reduced-motion`.

## Las tres opciones

Las tres comparten tokens, `site.css`, `data.js` y `app.js`. Cambia solo la
composición:

- **Opción 1 (`web/index.html`)**: la descripta arriba. Mapa y dos búsquedas
  en la portada, sin fotos.
- **Opción 2 (`web/v2/`)**: foto de operación detrás de las búsquedas,
  franja de confianza (antigüedad, flota, logos de clientes, aviso de
  canales oficiales) y foto de depósito junto al proceso.
- **Opción 3 (`web/v3/`)**: foto en la portada con título centrado y un
  único buscador que distingue número de envío de localidad; franja de
  confianza; tipos de carga en tres fichas con foto; mapa de cobertura; el
  proceso en cuatro pasos con foto; cotización; cuatro preguntas; pie.
  Es la que reúne todo lo que los sitios de mayor tráfico del rubro tienen
  en común (ver `docs/referencias-trafico.md`).

Las fotos de las opciones 2 y 3 son provisorias (Unsplash) y se reemplazan
por fotos reales de la empresa.
