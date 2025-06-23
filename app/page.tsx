import { redirect } from 'next/navigation'

// Esta página nunca debería verse porque el middleware redirecciona
// Pero la incluimos como fallback
export default function RootPage() {
  // Redirigir a español por defecto
  redirect('/es')
}