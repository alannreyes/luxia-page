/**
 * Badge oficial de Credly, verificado. En vez de cargar el `embed.js` de Credly —que
 * escanea el DOM y, con varios badges o el doble-render de React, inyecta iframes
 * duplicados— renderizamos directamente el mismo iframe que ese script termina creando
 * (`/embedded_badge/<id>`). Es determinista, sin JS de terceros y sin duplicados.
 */
interface CredlyBadgeProps {
  /** ID público del badge en Credly (data-share-badge-id) */
  badgeId: string
  /** Etiqueta accesible del badge */
  title: string
  width?: number
  height?: number
}

export default function CredlyBadge({ badgeId, title, width = 150, height = 270 }: CredlyBadgeProps) {
  return (
    <iframe
      src={`https://www.credly.com/embedded_badge/${badgeId}`}
      title={title}
      width={width}
      height={height}
      loading="lazy"
      style={{ border: 0, colorScheme: 'light' }}
      allowTransparency
    />
  )
}
