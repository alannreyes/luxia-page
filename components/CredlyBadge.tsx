'use client'
import { useEffect } from 'react'

/**
 * Badge oficial de Credly — "Claude Certified Architect – Professional" (issued by Anthropic).
 * Credly está diseñado para compartir públicamente con verificación, por lo que es la vía
 * sancionada para mostrar la certificación. El script reemplaza el div por un iframe verificado.
 */
export default function CredlyBadge() {
  useEffect(() => {
    if (document.querySelector('script[src*="credly.com/assets/utilities/embed.js"]')) return
    const s = document.createElement('script')
    s.src = 'https://cdn.credly.com/assets/utilities/embed.js'
    s.async = true
    document.body.appendChild(s)
  }, [])

  return (
    <div
      data-iframe-width="150"
      data-iframe-height="270"
      data-share-badge-id="d4f30538-390f-430d-a1c1-e2cba04b18e4"
      data-share-badge-host="https://www.credly.com"
    />
  )
}
