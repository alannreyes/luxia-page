# 🎨 Componente Logo - luxIA

El componente `Logo` es un componente reutilizable que puedes usar en cualquier página o proyecto para mostrar el logo de luxIA de manera consistente.

## 📦 Ubicación
```
components/Logo.tsx
```

## 🚀 Uso Básico

```tsx
import Logo from '@/components/Logo'

// Logo completo (icono + texto)
<Logo />

// Solo texto
<Logo showIcon={false} />

// Diferentes tamaños
<Logo size="sm" />
<Logo size="md" />  // Por defecto
<Logo size="lg" />
<Logo size="xl" />

// Diferentes variantes de color
<Logo variant="default" />  // Gradiente azul (por defecto)
<Logo variant="white" />    // Blanco (para fondos oscuros)
<Logo variant="dark" />     // Gris oscuro
```

## 🎛️ Props Disponibles

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Tamaño del logo |
| `showIcon` | `boolean` | `true` | Mostrar/ocultar el icono |
| `className` | `string` | `''` | Clases CSS adicionales |
| `variant` | `'default' \| 'white' \| 'dark'` | `'default'` | Variante de color |

## 📐 Tamaños

- **sm**: `text-lg` (18px) - Para elementos pequeños
- **md**: `text-2xl` (24px) - Tamaño estándar
- **lg**: `text-3xl` (30px) - Para headers
- **xl**: `text-4xl` (36px) - Para landing pages

## 🎨 Variantes

- **default**: Gradiente azul con efecto `gradient-text`
- **white**: Texto blanco para fondos oscuros
- **dark**: Texto gris oscuro para fondos claros

## 🔧 Componentes Individuales

También puedes usar los componentes por separado:

```tsx
import { LogoText, LogoIcon } from '@/components/Logo'

// Solo el texto
<LogoText size="lg" variant="white" />

// Solo el icono
<LogoIcon size="md" variant="default" />
```

## 📋 Ejemplos de Uso

### En Navigation
```tsx
<Logo />
```

### En Footer
```tsx
<Logo variant="white" />
```

### En una página externa
```tsx
<Logo size="xl" className="mb-8" />
```

### Header de sección
```tsx
<Logo size="lg" showIcon={false} variant="dark" />
```

## 🔄 Para Exportar a Otras Páginas

1. **Copia el archivo**: `components/Logo.tsx`
2. **Copia la configuración**: La parte del logo de `lib/config.ts`
3. **Instala dependencias**: `lucide-react`
4. **Copia los estilos**: La clase `gradient-text` de tu CSS

### Configuración mínima:
```tsx
// config.ts
export const siteConfig = {
  navigation: {
    logo: 'luxIA'
  }
}
```

### CSS necesario:
```css
.gradient-text {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

## ✨ Características

- ✅ **Responsive**: Se adapta a diferentes tamaños de pantalla
- ✅ **Accesible**: Estructura semántica correcta
- ✅ **Consistente**: Mismo diseño en toda la aplicación
- ✅ **Flexible**: Múltiples variantes y tamaños
- ✅ **Reutilizable**: Fácil de exportar a otros proyectos 