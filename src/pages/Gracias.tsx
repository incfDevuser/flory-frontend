import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import floryWave from '../assets/mascot/flory-wave.png'
import { IconMail } from '../components/icons'
import PageHeader from '../components/PageHeader'
import { useI18n, usePageMeta } from '../i18n'
import { track } from '../lib/analytics'

export default function Gracias() {
  const { copy } = useI18n()
  const location = useLocation()
  const state = location.state as { email?: unknown } | null
  const email = typeof state?.email === 'string' ? state.email : null
  usePageMeta(copy.gracias.meta.title, copy.gracias.meta.description)

  useEffect(() => {
    track('view_confirmation')
  }, [])

  return (
    <div className="flex min-h-dvh flex-col bg-cream">
      <PageHeader />

      <main className="relative flex flex-1 items-center overflow-hidden px-6 py-16">
        <span aria-hidden="true" className="absolute top-[12%] -left-16 size-48 rounded-full bg-lime-300/40" />
        <span aria-hidden="true" className="absolute bottom-[8%] -right-16 size-56 rounded-full bg-grape-100/60" />

        <div className="relative mx-auto max-w-lg text-center">
          <img
            src={floryWave}
            alt={copy.gracias.alt}
            className="mx-auto h-32 animate-float object-contain sm:h-36"
          />

          <h1 className="mt-6 animate-rise font-display text-3xl leading-[1.15] font-bold text-balance sm:text-[2.6rem]">
            <span aria-hidden="true">🌱</span> {copy.gracias.title}
          </h1>

          <p
            className="mt-4 animate-rise text-base text-pretty text-muted"
            style={{ animationDelay: '80ms' }}
          >
            {copy.gracias.description}
          </p>

          {email && (
            <div
              className="mx-auto mt-6 flex max-w-md animate-rise items-center gap-3 rounded-[20px] bg-leaf-100 px-5 py-4 text-left ring-1 ring-leaf/15"
              style={{ animationDelay: '130ms' }}
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-leaf">
                <IconMail className="size-5" />
              </span>
              <p className="text-sm text-muted">
                {copy.gracias.emailPrefix}{' '}
                <strong className="block break-all font-bold text-forest">{email}</strong>
              </p>
            </div>
          )}

          <p
            className="mx-auto mt-4 inline-block animate-rise rounded-full bg-white px-4 py-2 text-sm font-semibold text-muted shadow-[0_14px_30px_-24px_rgba(31,74,44,0.7)]"
            style={{ animationDelay: '170ms' }}
          >
            {copy.gracias.note}
          </p>

          <div className="mt-8 animate-rise" style={{ animationDelay: '230ms' }}>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-leaf px-7 py-3.5 font-display font-semibold text-white shadow-[0_18px_34px_-16px_rgba(63,157,99,0.95)] transition hover:-translate-y-0.5 hover:bg-leaf-600 active:translate-y-0"
            >
              {copy.gracias.back}
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
