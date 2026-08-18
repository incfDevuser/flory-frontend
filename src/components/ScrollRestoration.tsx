import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Al cambiar de ruta el navegador conserva el scroll anterior, así que
 * /quiero-flory se abriría a media página. Si la URL trae hash, saltamos a
 * esa sección; si no, arriba.
 *
 * El salto al tope es instantáneo a propósito: `scroll-behavior: smooth`
 * está activo en el html y animar el recorrido completo desde el footer
 * hasta el tope se siente lento.
 */
export default function ScrollRestoration() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView()
        return
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash, key])

  return null
}
