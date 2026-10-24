# DESIGN.md — Web de transporte de cargas (cliente: Victoria)

Dirección: **"Hoja de ruta"**. Una web operativa y clara, como la planilla
que un despachante tiene a mano: primero rastrear, después saber si llegan a
tu localidad, después cotizar. Transmite seriedad y cercanía, no lujo ni
tecnología abstracta.

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
| `--ink` | `#1A1D21` | Texto principal, títulos |
| `--ink-2` | `#4A5560` | Texto secundario, ayudas |
| `--line` | `#D9DEE3` | Bordes, divisores |
| `--surface` | `#FFFFFF` | Fondo de tarjetas y paneles |
| `--canvas` | `#F3F5F7` | Fondo de secciones alternas |
| `--deep` | `#10212E` | Paneles oscuros, pie de página, mapa |
| `--primary` | `#0E5A72` | Botones principales, enlaces, foco |
| `--primary-hover` | `#0B4759` | Hover y active del primario |
| `--primary-soft` | `#E3F0F4` | Fondos suaves asociados al primario |
| `--accent` | `#F5A524` | Marcadores de depósito en el mapa, resaltado del seguimiento |
| `--accent-ink` | `#7A4B00` | Texto sobre fondos de acento |
| `--success` | `#1E8E5A` | Estado "llegamos" en el buscador |
| `--warning` | `#B7791F` | Avisos |
| `--error` | `#C53030` | Errores de formulario |

Contraste: `--ink` sobre `--surface` 15.6:1; `--ink-2` sobre `--surface`
7.3:1; blanco sobre `--primary` 7.4:1; `--accent` sobre `--deep` 9.1:1
(solo para elementos grandes y marcadores; nunca texto pequeño en amarillo
sobre blanco).

## Tipografía

Una sola familia: **Archivo** (variable, ejes de peso y ancho, Google
Fonts). Los títulos usan ancho 112 y peso 700; el cuerpo ancho 100 y peso
400. Un número de seguimiento o un dato se muestra con `font-variant-numeric:
tabular-nums`.

| Token | Tamaño / interlineado | Uso |
|---|---|---|
| `--t-xs` | 13px / 1.4 | Notas, ayudas de campo |
| `--t-sm` | 15px / 1.5 | Texto compacto, chips |
| `--t-md` | 17px / 1.6 | Cuerpo |
| `--t-lg` | 20px / 1.5 | Intro de sección |
| `--t-xl` | 26px / 1.25 | Título de tarjeta |
| `--t-2xl` | 34px / 1.15 | Título de sección (móvil) |
| `--t-3xl` | 44px / 1.1 | Título de sección (escritorio) |
| `--t-4xl` | 60px / 1.02 | Título del hero (escritorio) |

Líneas de texto de 60 a 72 caracteres (`--measure: 66ch`). Sin versalitas
ni etiquetas en mayúsculas sobre los títulos.

## Espaciado y ancho

Escala de 8: `4, 8, 12, 16, 24, 32, 48, 64, 96`. Secciones con 64px de
aire vertical en móvil y 96px en escritorio. Contenido a 1200px máximo con
16px de margen lateral en móvil y 32px desde tablet.

## Forma y profundidad

Radios: `6px` campos y botones, `12px` tarjetas y paneles, `999px` chips.
Una sola sombra, reservada al panel flotante de seguimiento del hero:
`0 12px 32px rgba(16, 33, 46, .14)`. Todo lo demás se separa con `--line` o
con el cambio `--surface` / `--canvas`.

## Componentes

- **Botón primario**: fondo `--primary`, texto blanco, 48px de alto,
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
- **Chip de provincia**: borde `--line`, activo con fondo `--primary` y
  texto blanco; con depósito lleva un punto `--accent`.
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
