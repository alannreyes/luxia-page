# Marca luxIA — fuente única

**La identidad vigente vive en el CÓDIGO del sitio, no en esta carpeta.** Antes había tres
identidades distintas conviviendo aquí sin que ninguna coincidiera con lo que realmente se veía en
luxia.us — una estrella gris de 8 puntas, después un sistema azul genérico ("sala de operaciones"),
y por fin la actual. Las dos primeras se limpiaron el 2026-08-08 (SVGs rotos/genéricos, paleta
`#3b82f6` que no es la del sitio, plantillas de tarjetas/correo con esos colores viejos). Si un
archivo de identidad no está en las rutas de abajo, no es oficial — no reconstruir nada a mano.

## 1 · Dónde está cada cosa (las reales)

| Qué | Dónde |
|---|---|
| **Isotipo** (rosa de los vientos facetada, plana) | `components/LogoMark.tsx` — SVG inline, fuente única del arte. 3 tonos: `color` / `white` / `ink`. |
| **Wordmark completo** (isotipo + "lux"+"IA") | `components/Logo.tsx` — usa `LogoMark` + texto en `.font-editorial` (Bricolage Grotesque). |
| **Colores** | `app/globals.css`, bloque `--ed-*` (sistema "editorial en luz", 2026). |
| **Logo exportado (PNG 512, SEO/JSON-LD)** | `public/logo.png` — generado del mismo arte que `LogoMark.tsx`. |
| **Logo exportado (SVG)** | `public/luxia-star.svg` — mismo arte, vectorial. |
| **Favicons / apple-touch-icon / og-image** | `public/favicon.*`, `public/apple-touch-icon.png`, `public/og-image.jpg` — generados en el mismo lote (2026-07-27). |

## 2 · Colores (`--ed-*`, `app/globals.css`)

| Rol | Token | Hex |
|---|---|---|
| Papel (fondo) | `--ed-paper` | `#F7F8FA` |
| Papel banda alterna | `--ed-paper-2` | `#EEF0F4` |
| Tinta (texto/negros) | `--ed-ink` | `#0E1116` |
| Gris secundario | `--ed-gray` | `#5B6270` |
| Acento (azul eléctrico, "IA") | `--ed-accent` | `#2540FF` |
| Hairline | `--ed-line` | `#E4E7EC` |

El isotipo usa su propio ramp de 3 azules (no el `--ed-accent` plano): `bright #2E4BFF` /
`dark #1B2FB5` / `light #7C93FF` — es el degradado facetado que le da volumen a la rosa de los vientos.

> Existió antes un sistema "sala de operaciones" (`--lux-noche`, `--lux-senal #3B82F6`, `--lux-alba`
> ámbar) — quedó retirado con el rediseño editorial de 2026-07-26. Sigue en `globals.css` por si
> algún componente viejo aún lo referencia, pero **no es la identidad vigente**.

## 3 · Tipografía

- **Display** (`.font-editorial`): **Bricolage Grotesque**, vía `next/font/google` en `app/layout.tsx`.
- **Cuerpo**: Inter.
- **Datos/eyebrows** (`.font-data`): IBM Plex Mono.

## 4 · Escritura del nombre y el dominio

- **En prosa** ("la empresa", texto corrido): **LuxIA** (L mayúscula) — así lo usa el propio sitio
  en `<title>`, meta description y el copy del hero.
- **El dominio**, siempre: **`luxIA.us`** — "lux" minúsculas, "IA" mayúsculas, `.us` pegado al
  final. Nunca "Luxia.us", "LUXIA.US" ni el dominio sin el `.us`.
- **Pronunciación al narrar** (voz/video): "lux" + "IA" (deletreada, i-a) + ".us" dicho como
  "punto u, ese" — nunca en inglés, nunca de corrido.

## 5 · Qué se limpió el 2026-08-08

Se borraron (recuperables del historial de git si hiciera falta):

```
brand/README.md                              (identidad vieja: estrella gris de 8 puntas)
brand/QUICK_START.md
brand/guidelines/brand-guidelines.md         (identidad vieja: azul genérico #3b82f6)
brand/colors/color-palette.css
brand/logos/svg/*.svg                        (3 con el icono "Sparkles" genérico, 1 vacío)
brand/templates/**                           (tarjetas/carta/firma/banner, con los colores viejos)
components/Logo-new.tsx                      (pese al nombre, era la versión VIEJA — no la usaba nadie)
components/Logo.md                           (documentaba Logo-new.tsx)
```

Si se necesita una plantilla de tarjeta/firma/banner en el futuro, se construye de nuevo desde los
tokens `--ed-*` reales — no se recupera la vieja.

---

*Última actualización: 2026-08-08.*
