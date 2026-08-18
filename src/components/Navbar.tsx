import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import CtaLoQuiero from './CtaLoQuiero'
import { LogoFlory } from './icons'
import LanguagePicker from './LanguagePicker'

// Van con `/` delante para que también funcionen desde /quiero-flory:
// ScrollRestoration se encarga de saltar a la sección al llegar.
const linkHrefs = ['/#como-funciona', '/#que-mide', '/#la-app', '/#precios', '/#dudas']

export default function Navbar() {
  const { copy } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const links = copy.nav.links.map((label, index) => ({ label, href: linkHrefs[index] }))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between gap-6 rounded-full px-4 py-2.5 transition duration-300 sm:px-5 ${
          scrolled ? 'bg-cream/85 shadow-[0_10px_30px_-18px_rgba(31,74,44,0.5)] backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <Link to="/" className="flex items-center gap-1" aria-label={copy.nav.homeLabel}>
          <LogoFlory />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-semibold text-forest/80 transition hover:bg-white/70 hover:text-forest"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <CtaLoQuiero
            label={copy.nav.cta}
            location="navbar"
            size="sm"
            className="hidden sm:inline-flex"
          />

          <LanguagePicker />

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? copy.nav.closeMenu : copy.nav.openMenu}
            className="inline-flex size-10 items-center justify-center rounded-full bg-white/80 text-forest shadow-sm lg:hidden"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-5">
              <path
                d={open ? 'M5.5 5.5l9 9M14.5 5.5l-9 9' : 'M4 6.5h12M4 13.5h12'}
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </nav>

      <div
        id="menu-movil"
        hidden={!open}
        className="mx-auto mt-2 max-w-6xl rounded-3xl bg-cream/95 p-3 shadow-[0_18px_40px_-24px_rgba(31,74,44,0.6)] backdrop-blur-md lg:hidden"
      >
        <ul className="flex flex-col">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-semibold text-forest transition hover:bg-white/80"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="p-1">
            <CtaLoQuiero
              label={copy.nav.cta}
              location="navbar_mobile"
              size="sm"
              className="w-full py-3"
              onNavigate={() => setOpen(false)}
            />
          </li>
        </ul>
      </div>
    </header>
  )
}
