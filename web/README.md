# Sitio web: transporte de cargas (cliente Victoria)

Sitio estático de una sola página. Sin frameworks ni dependencias de
ejecución.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La página completa, con el mapa de Argentina inline |
| `data.js` | **Datos de la empresa, provincias, localidades y depósitos.** Es el único archivo que se edita para actualizar contenido |
| `app.js` | Pestañas, seguimiento, buscador de cobertura, cotización por WhatsApp |
| `styles/tokens.css` | Colores, tipografía y espaciado (ver `DESIGN.md` en la raíz) |
| `styles/site.css` | Estilos de la página |
| `assets/argentina-provincias.svg` | Mapa por provincias, generado desde el GeoJSON oficial del IGN (datos.gob.ar) |
| `assets/og.png` | Imagen para compartir en WhatsApp y redes |

## Cómo actualizar el contenido

1. Abrir `data.js`.
2. Completar `EMPRESA` (nombre, WhatsApp, teléfono, correo, horario, URL de
   seguimiento con `{numero}`).
3. En `COBERTURA`, por cada provincia con cobertura, cargar `deposito`
   (o `null`) y la lista de `localidades`. La clave es el id oficial de la
   provincia que figura en `PROVINCIAS`.
4. Poner `esEjemplo: false` para quitar el aviso de borrador y los bordes
   punteados.

## Revisar antes de publicar

```bash
node tools/screenshots.js web/index.html .screenshots
```

Captura la página en celular, tablet y escritorio y avisa si hay scroll
horizontal, errores de consola o recursos rotos.

## Publicar

El repo tiene `vercel.json` apuntando a `web/`. Importar el repositorio en
Vercel y listo; cada push a la rama publica de nuevo.
