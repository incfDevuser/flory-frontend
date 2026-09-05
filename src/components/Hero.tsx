import leafPurple from '../assets/mascot/leaf-purple.png'
import appHoy from '../assets/mockups-free/hoy.png'
import { useI18n } from '../i18n'
import { APP_STORE_URL } from '../lib/links'
import CtaLoQuiero from './CtaLoQuiero'
import { IconCamera, IconDrop, IconPlay } from './icons'
import PhoneFrame from './PhoneFrame'

function IdentifyCard() {
  const { copy } = useI18n()

  return (
    <div className="flex items-center gap-3 rounded-[22px] bg-white px-4 py-3 shadow-[0_18px_36px_-22px_rgba(31,74,44,0.55)]">
      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-grape-100 text-grape">
        <IconCamera className="size-5" />
      </span>
      <div>
        <p className="text-xs font-semibold text-muted">{copy.hero.identifyLabel}</p>
        <p className="font-display text-sm font-bold text-forest">{copy.hero.identifyValue}</p>
      </div>
    </div>
  )
}

function WaterCard() {
  const { copy } = useI18n()

  return (
    <div className="flex items-center gap-3 rounded-[22px] bg-white px-4 py-3 shadow-[0_18px_36px_-22px_rgba(31,74,44,0.55)]">
      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-leaf-100 text-leaf">
        <IconDrop className="size-5" />
      </span>
      <div>
        <p className="text-xs font-semibold text-muted">{copy.hero.waterLabel}</p>
        <p className="font-display text-sm font-bold text-forest">{copy.hero.waterValue}</p>
      </div>
    </div>
  )
}

export default function Hero() {
  const { copy } = useI18n()

  return (
    <section id="inicio" className="relative overflow-hidden bg-cream pt-32 sm:pt-36">
      <div className="relative z-20 mx-auto max-w-3xl px-6 text-center">
        <p
          className="inline-flex animate-rise items-center gap-2 rounded-full bg-lime-100 px-3.5 py-1.5 font-display text-xs font-bold text-leaf-600"
          style={{ animationDelay: '40ms' }}
        >
          {copy.hero.badge}
        </p>

        <h1
          className="mt-5 animate-rise font-display text-[2.4rem] leading-[1.06] font-bold text-balance sm:text-6xl"
          style={{ animationDelay: '80ms' }}
        >
          {copy.hero.title[0]}
          <br className="hidden sm:block" /> {copy.hero.title[1]}
        </h1>

        <p
          className="mx-auto mt-5 max-w-xl animate-rise text-base text-pretty text-muted"
          style={{ animationDelay: '160ms' }}
        >
          {copy.hero.description}
        </p>

        <div className="mt-8 animate-rise" style={{ animationDelay: '240ms' }}>
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <CtaLoQuiero
              label={copy.hero.primaryCta}
              location="hero"
              plan="FREE"
              href={APP_STORE_URL}
              destination="app_store"
              className="w-full sm:w-auto"
            />
            <div
              aria-label={`${copy.hero.androidCta}: ${copy.hero.comingSoon}`}
              className="inline-flex w-full cursor-default items-center justify-center gap-3 rounded-full border border-forest/10 bg-white/75 px-6 py-3.5 font-display font-semibold text-forest shadow-[0_14px_30px_-22px_rgba(31,74,44,0.55)] sm:w-auto"
            >
              <span>{copy.hero.androidCta}</span>
              <span className="rounded-full bg-amber/20 px-2.5 py-1 text-[0.65rem] font-bold tracking-[0.08em] text-forest uppercase">
                {copy.hero.comingSoon}
              </span>
            </div>
          </div>
          <a
            href="#como-funciona"
            className="mt-4 inline-flex items-center justify-center gap-2 font-display text-sm font-semibold text-forest underline decoration-forest/25 underline-offset-4 transition hover:decoration-forest"
          >
            <IconPlay className="size-4" />
            {copy.hero.secondaryCta}
          </a>
        </div>

        <div className="mt-8 flex justify-center gap-3 sm:hidden">
          <IdentifyCard />
          <WaterCard />
        </div>
      </div>

      <div className="relative mt-20 h-[420px] sm:mt-20 sm:h-[560px] lg:h-[600px]">
        <svg
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[58%] w-full"
        >
          <path fill="var(--color-hill-100)" d="M0,150 C220,140 340,40 700,42 C1030,44 1210,150 1440,120 L1440,400 L0,400 Z" />
          <path fill="var(--color-hill-200)" d="M0,236 C190,224 330,150 660,158 C980,166 1210,250 1440,214 L1440,400 L0,400 Z" />
          <path fill="var(--color-hill-300)" d="M0,312 C240,300 470,326 760,300 C1010,278 1230,300 1440,286 L1440,400 L0,400 Z" />
          <path fill="#ffffff" d="M0,352 C260,368 520,392 820,386 C1080,381 1280,356 1440,344 L1440,400 L0,400 Z" />
        </svg>

        <span
          aria-hidden="true"
          className="absolute top-[8%] left-[4%] size-16 animate-float-slow rounded-full bg-lime sm:size-24"
        />
        <span
          aria-hidden="true"
          className="absolute top-[12%] right-[5%] size-12 animate-float rounded-full bg-grape sm:size-16"
        />
        <span
          aria-hidden="true"
          className="absolute top-[62%] right-[20%] size-8 animate-float-slow rounded-full bg-amber sm:size-9"
        />

        <img
          src={leafPurple}
          alt=""
          aria-hidden="true"
          className="absolute top-[16%] right-[24%] w-8 animate-sway sm:w-9"
        />

        <span
          aria-hidden="true"
          className="absolute bottom-[14%] left-1/2 h-5 w-40 -translate-x-1/2 rounded-[50%] bg-forest/20 blur-md sm:w-56"
        />

        <PhoneFrame
          src={appHoy}
          alt={copy.hero.appAlt}
          priority
          className="absolute bottom-[16%] left-1/2 w-[168px] -translate-x-1/2 sm:w-[224px] lg:w-[244px]"
        />

        <div className="absolute top-[34%] left-[5%] hidden sm:block">
          <IdentifyCard />
        </div>
        <div className="absolute top-[54%] right-[5%] hidden sm:block">
          <WaterCard />
        </div>
      </div>
    </section>
  )
}
