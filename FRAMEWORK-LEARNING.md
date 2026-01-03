# Framework de Contenido Learning - luxIA

> **Estado actual (2026-01-02)**: Todo el contenido está completo: 28/28 Learning + 57/57 Cooking = 85/85 (100%)

---

## Investigación Base

Según [Cognitive Load Theory](https://www.mcw.edu/-/media/MCW/Education/Academic-Affairs/OEI/Faculty-Quick-Guides/Cognitive-Load-Theory.pdf):
- La memoria de trabajo es limitada
- Contenido debe ser "chunked" (dividido en partes manejables)
- Integrar texto + visuales reduce carga cognitiva

Según [Visual Learning Research](https://thevisualcommunicationguy.com/2025/02/18/the-power-of-visual-learning-for-technical-and-trade-skills/):
- El cerebro procesa visuales **60,000x más rápido** que texto
- Retención aumenta **65%** con elementos visuales
- Diagramas son esenciales para procesos complejos

Según [Google Documentation Guidelines](https://google.github.io/styleguide/docguide/best_practices.html):
- Estructura consistente genera confianza
- Ejemplos prácticos mejoran adopción
- Separar conceptos, tutoriales, y referencia

---

## Estructura de Cada Sección Learning

### 1. 🎯 EL PROBLEMA (Hook)
**Propósito**: Conectar emocionalmente, mostrar relevancia

```markdown
## ¿Por qué [tema]?

> Sin [tema]: [dolor/problema concreto]
> Con [tema]: [beneficio claro]
```

**Ejemplo para `terminal`**:
```markdown
## ¿Por qué aprender Terminal?

> Sin terminal: Click, click, click... esperar... click.
> Renombrar 100 archivos = 100 clicks = 10 minutos.

> Con terminal: `rename 's/old/new/' *.txt`
> Renombrar 100 archivos = 1 comando = 2 segundos.
```

---

### 2. 🧠 ANALOGÍA (Puente cognitivo)
**Propósito**: Conectar lo nuevo con lo conocido

```markdown
## Piénsalo así...

[Analogía con algo cotidiano]
```

**Ejemplo para `git`**:
```markdown
## Piénsalo así...

Git es como el "Control + Z" de tu proyecto, pero con superpoderes:

| Control + Z normal | Git |
|-------------------|-----|
| Solo deshace lo último | Puedes volver a CUALQUIER punto |
| Se pierde al cerrar | Guardado para siempre |
| Solo tú lo ves | Tu equipo puede ver el historial |
| Un solo camino | Puedes tener "versiones paralelas" |

Es como tener una máquina del tiempo para tu código.
```

---

### 3. 📊 DIAGRAMA/VISUAL (Procesamiento rápido)
**Propósito**: Mostrar relaciones y flujos

```markdown
## Cómo funciona

\`\`\`
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Input     │ ──→ │   Proceso   │ ──→ │   Output    │
└─────────────┘     └─────────────┘     └─────────────┘
\`\`\`
```

**Ejemplo para `apis`**:
```markdown
## Cómo funciona una API

\`\`\`
TU APP                         SERVIDOR
┌──────────┐                   ┌──────────┐
│          │  ── Request ──→   │          │
│ Frontend │     GET /users    │   API    │
│          │  ←── Response ──  │          │
└──────────┘     [{...}]       └──────────┘

Es como un mesero:
- Tú pides (request)
- El mesero lleva el pedido a cocina (servidor)
- Te trae la comida (response)
```

---

### 4. 📋 CONCEPTOS CLAVE (Vocabulario esencial)
**Propósito**: Definir términos antes de usarlos

```markdown
## Conceptos clave

| Término | Qué es | Ejemplo |
|---------|--------|---------|
| **X** | Definición simple | `código` |
```

**Ejemplo para `javascript`**:
```markdown
## Conceptos clave

| Término | Qué es | Ejemplo |
|---------|--------|---------|
| **Variable** | Caja para guardar datos | `let nombre = "Ana"` |
| **Función** | Bloque de código reutilizable | `function saludar() {}` |
| **Array** | Lista ordenada de elementos | `[1, 2, 3]` |
| **Objeto** | Colección de propiedades | `{nombre: "Ana", edad: 25}` |
| **Async** | Código que espera respuestas | `await fetch(url)` |
```

---

### 5. 🔄 COMPARATIVA (Decisiones informadas)
**Propósito**: Ayudar a elegir entre opciones

```markdown
## Comparativa

| Característica | Opción A | Opción B | Opción C |
|----------------|----------|----------|----------|
| **Uso ideal** | X | Y | Z |
| **Dificultad** | ⭐ | ⭐⭐ | ⭐⭐⭐ |
| **Costo** | Gratis | $$ | $$$ |
```

**Ejemplo para `llms-intro`**:
```markdown
## ¿Cuál API usar?

| | Gemini | Claude | OpenAI | Ollama |
|--|--------|--------|--------|--------|
| **Costo** | Gratis* | $3/M tokens | $5/M tokens | Gratis (local) |
| **Límite gratis** | 60 req/min | - | - | ∞ |
| **Calidad** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Velocidad** | Rápido | Medio | Rápido | Depende GPU |
| **Privacidad** | Cloud | Cloud | Cloud | 100% local |

*Recomendación*: Empieza con **Gemini** (gratis), luego explora otros.
```

---

### 6. 💻 EJEMPLO MÍNIMO (Hands-on)
**Propósito**: Código que pueden probar inmediatamente

```markdown
## Ejemplo rápido

\`\`\`lenguaje
// Código mínimo que funciona
// Con comentarios explicando cada línea
\`\`\`

> 💡 Copia este código y pruébalo. Modifica X para ver qué pasa.
```

**Ejemplo para `nodejs`**:
```markdown
## Ejemplo rápido

\`\`\`javascript
// servidor.js - Tu primer servidor en 5 líneas
const http = require('http');

const server = http.createServer((req, res) => {
  res.end('¡Hola desde Node.js!');
});

server.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});
\`\`\`

Ejecuta: `node servidor.js` y abre el navegador.

> 💡 Cambia el mensaje y recarga la página.
```

---

### 7. ⚠️ ERRORES COMUNES (Prevención)
**Propósito**: Anticipar frustraciones

```markdown
## Errores comunes

| Error | Por qué pasa | Solución |
|-------|--------------|----------|
| `X` | Causa | Fix |
```

**Ejemplo para `git`**:
```markdown
## Errores comunes

| Error | Por qué pasa | Solución |
|-------|--------------|----------|
| `fatal: not a git repository` | No inicializaste git | `git init` |
| `error: failed to push` | Hay cambios remotos | `git pull` primero |
| `CONFLICT in file.txt` | Dos personas editaron igual | Edita el archivo manualmente |
| Subiste tu API key 😱 | Olvidaste .gitignore | Regenera la key, añade a .gitignore |
```

---

### 8. 🔗 CONEXIONES (Mapa mental)
**Propósito**: Mostrar cómo se relaciona con otros temas

```markdown
## Conexiones

\`\`\`
              ┌─────────────┐
              │  ESTE TEMA  │
              └──────┬──────┘
         ┌───────────┼───────────┐
         ▼           ▼           ▼
   ┌──────────┐ ┌──────────┐ ┌──────────┐
   │ Previo 1 │ │ Previo 2 │ │Siguiente │
   └──────────┘ └──────────┘ └──────────┘
\`\`\`

- **Necesitas saber**: [links a prerequisitos]
- **Después aprende**: [links a siguientes temas]
```

---

### 9. 📚 FUENTES (Credibilidad)
**Propósito**: Profundizar y validar información

```markdown
## Aprende más

| Recurso | Tipo | Idioma |
|---------|------|--------|
| [Nombre](url) | Doc oficial | EN |
| [Nombre](url) | Tutorial | ES |
| [Nombre](url) | Video | ES |
```

**Ejemplo para `react`**:
```markdown
## Aprende más

| Recurso | Tipo | Idioma |
|---------|------|--------|
| [react.dev](https://react.dev) | Doc oficial | EN |
| [Midudev React](https://www.youtube.com/watch?v=7iobxzd_2wY) | Video curso | ES |
| [React en 100 segundos](https://www.youtube.com/watch?v=Tn6-PIqc4UM) | Intro rápida | EN |
```

---

### 10. ➡️ PRACTICA (Call to action)
**Propósito**: Dirigir al siguiente paso

```markdown
## Practica

Ahora que entiendes [concepto], ponlo en práctica:

→ [Nombre del platillo](/es/cooking/slug) - Descripción corta
→ [Otro platillo](/es/cooking/slug) - Descripción corta
```

---

## Checklist por Sección

Antes de considerar una sección completa:

- [ ] **Hook**: ¿Explica el problema que resuelve?
- [ ] **Analogía**: ¿Conecta con algo familiar?
- [ ] **Diagrama**: ¿Hay al menos un visual?
- [ ] **Conceptos**: ¿Tabla con términos clave?
- [ ] **Comparativa**: ¿Ayuda a decidir entre opciones?
- [ ] **Ejemplo**: ¿Código que pueden copiar y probar?
- [ ] **Errores**: ¿Anticipa frustraciones comunes?
- [ ] **Conexiones**: ¿Links a prerequisitos y siguientes?
- [ ] **Fuentes**: ¿Al menos 2-3 recursos externos?
- [ ] **Practica**: ¿Link a Cooking relacionado?
- [ ] **Bilingüe**: ¿Contenido en ES y EN?

---

## Tono y Estilo

### SÍ hacer:
- Frases cortas (máximo 20 palabras)
- Voz activa ("Escribe el código" vs "El código es escrito")
- Segunda persona ("Tú puedes..." vs "Se puede...")
- Ejemplos concretos, no abstractos
- Emojis moderados para señalizar secciones

### NO hacer:
- Jerga sin explicar
- Párrafos largos (máximo 3-4 líneas)
- Asumir conocimiento previo sin verificar
- Ejemplos que requieren setup complejo
- Contenido sin propósito claro

---

## Fuentes de Investigación

- [Cognitive Load Theory - MCW](https://www.mcw.edu/-/media/MCW/Education/Academic-Affairs/OEI/Faculty-Quick-Guides/Cognitive-Load-Theory.pdf)
- [Visual Learning Power](https://thevisualcommunicationguy.com/2025/02/18/the-power-of-visual-learning-for-technical-and-trade-skills/)
- [Google Documentation Style Guide](https://google.github.io/styleguide/docguide/best_practices.html)
- [Atlassian Documentation Best Practices](https://www.atlassian.com/blog/loom/software-documentation-best-practices)
- [Visual Learning Strategies - Instructure](https://www.instructure.com/resources/blog/visual-learning-effective-strategies-and-best-practices)
- [Creating Visual Explanations - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC5256450/)
