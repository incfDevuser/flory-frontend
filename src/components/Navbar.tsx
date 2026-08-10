import { useEffect, useState } from 'react'
import { useI18n } from '../i18n'
import type { Language } from '../i18n'
import { IconArrowRight, LogoFlory } from './icons'

const linkHrefs = ['#que-mide', '#como-funciona', '#precios', '#dudas']
const languages: { code: Language; flag: string; label: string }[] = [
  { code: 'en', flag: '🇺🇸', label: 'English' },
  { code: 'es', flag: '🇨🇱', label: 'Español' },
  { code: 'pt', flag: '🇧🇷', label: 'Português' },
]

function LanguagePicker() {
  const { language, setLanguage, copy } = useI18n()

  return (
    <div
      role="group"
      aria-label={copy.language.label}
      className="flex items-center rounded-full bg-white/75 p-1 shadow-sm ring-1 ring-forest/5"
    >
      {languages.map((item) => (
        <button
          key={item.code}
          type="button"
          onClick={() => setLanguage(item.code)}
          aria-label={item.label}
          aria-pressed={language === item.code}
          title={item.label}
          lang={item.code === 'pt' ? 'pt-BR' : item.code}
          className={`grid size-7 place-items-center rounded-full text-base leading-none transition sm:size-8 ${
            language === item.code
              ? 'bg-forest shadow-sm ring-2 ring-white'
              : 'opacity-55 grayscale-[35%] hover:opacity-100 hover:grayscale-0'
          }`}
        >
          <span aria-hidden="true">{item.flag}</span>
        </button>
      ))}
    </div>
  )
}

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
        <a href="#inicio" className="flex items-center gap-1" aria-label={copy.nav.homeLabel}>
          <LogoFlory />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-semibold text-forest/80 transition hover:bg-white/70 hover:text-forest"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#precios"
            className="hidden items-center gap-2 rounded-full bg-leaf px-5 py-2.5 text-sm font-bold text-white shadow-[0_10px_24px_-12px_rgba(63,157,99,0.9)] transition hover:-translate-y-0.5 hover:bg-leaf-600 active:translate-y-0 sm:inline-flex"
          >
            {copy.nav.cta}
            <IconArrowRight className="size-4" />
          </a>

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
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-semibold text-forest transition hover:bg-white/80"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="p-1">
            <a
              href="#precios"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-leaf px-5 py-3 text-sm font-bold text-white"
            >
              {copy.nav.cta}
              <IconArrowRight className="size-4" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
