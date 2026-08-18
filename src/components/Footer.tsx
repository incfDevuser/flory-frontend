import { Link } from 'react-router-dom'
import floryHeart from '../assets/mascot/flory-heart.png'
import { useI18n } from '../i18n'
import { LogoFlory } from './icons'

// Destinos por columna, en el mismo orden que `copy.footer.columns`.
// Las secciones que aún no existen apuntan al inicio en vez de simular
// páginas que no están construidas.
const columnHrefs = [
  ['/#como-funciona', '/#que-mide', '/#la-app', '/#precios'],
  ['/#dudas', '/', '/', '/'],
  ['/', '/', '/', '/'],
]

export default function Footer() {
  const { copy } = useI18n()

  return (
    <footer className="bg-cream pt-14 pb-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <LogoFlory />
            <p className="mt-4 max-w-[15rem] text-sm leading-relaxed text-pretty text-muted">
              {copy.footer.description}
            </p>
          </div>

          {copy.footer.columns.map((column, columnIndex) => (
            <div key={column.title}>
              <h3 className="font-display text-sm font-bold text-forest">{column.title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link, linkIndex) => (
                  <li key={link}>
                    <Link
                      to={columnHrefs[columnIndex][linkIndex]}
                      className="text-sm text-muted transition hover:text-forest"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-forest/10 pt-6 sm:flex-row">
          <p className="flex items-center gap-2 text-xs text-muted">
            <img src={floryHeart} alt="" aria-hidden="true" className="size-6 object-contain" />
            © {new Date().getFullYear()} Flory. {copy.footer.copyright}
          </p>
          <ul className="flex items-center gap-6">
            <li>
              <Link to="/" className="text-xs text-muted transition hover:text-forest">
                {copy.footer.terms}
              </Link>
            </li>
            <li>
              <Link to="/" className="text-xs text-muted transition hover:text-forest">
                {copy.footer.privacy}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
