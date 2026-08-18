import leafPurple from '../assets/mascot/leaf-purple.png'
import device from '../assets/photos/flory-device.png'
import { useI18n } from '../i18n'
import CtaLoQuiero from './CtaLoQuiero'
import { IconPlay, IconSun } from './icons'

function Ring({ value }: { value: number }) {
  const radius = 15.5
  const circumference = 2 * Math.PI * radius

  return (
    <span className="relative inline-flex size-11 shrink-0 items-center justify-center">
      <svg viewBox="0 0 36 36" aria-hidden="true" className="size-11 -rotate-90">
        <circle cx="18" cy="18" r={radius} fill="none" stroke="#ebe5f9" strokeWidth="4" />
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          stroke="var(--color-grape)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${(value / 100) * circumference} ${circumference}`}
        />
      </svg>
      <span className="absolute font-display text-[11px] font-bold text-forest">
        {value}
        <span className="text-[8px]">%</span>
      </span>
    </span>
  )
}

function WaterCard() {
  const { copy } = useI18n()

  return (
    <div className="flex items-center gap-3 rounded-[22px] bg-white px-4 py-3 shadow-[0_18px_36px_-22px_rgba(31,74,44,0.55)]">
      <Ring value={38} />
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-[#b07a1e]">
          <span className="size-1.5 rounded-full bg-amber" />
          {copy.hero.waterStatus}
        </span>
        <p className="mt-1 text-xs font-semibold text-muted">{copy.hero.waterTip}</p>
      </div>
    </div>
  )
}

function SunCard() {
  const { copy } = useI18n()

  return (
    <div className="flex items-center gap-3 rounded-[22px] bg-white px-4 py-3 shadow-[0_18px_36px_-22px_rgba(31,74,44,0.55)]">
      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber">
        <IconSun className="size-5" />
      </span>
      <div>
        <p className="font-display text-sm font-bold text-forest">{copy.hero.sunValue}</p>
        <p className="text-xs font-semibold text-muted">{copy.hero.sunTip}</p>
      </div>
    </div>
  )
}

export default function Hero() {
  const { copy } = useI18n()

  return (
    <section id="inicio" className="relative overflow-hidden bg-cream pt-32 sm:pt-36">
      <div className="relative z-20 mx-auto max-w-3xl px-6 text-center">
        <h1
          className="mt-6 animate-rise font-display text-[2.4rem] leading-[1.06] font-bold text-balance sm:text-6xl"
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

        <div
          className="mt-8 flex animate-rise flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: '240ms' }}
        >
          <CtaLoQuiero label={copy.hero.primaryCta} location="hero" className="w-full sm:w-auto" />
          <a
            href="#como-funciona"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-display font-semibold text-forest shadow-[0_14px_30px_-20px_rgba(31,74,44,0.7)] transition hover:-translate-y-0.5 hover:bg-white/80 active:translate-y-0 sm:w-auto"
          >
            <IconPlay className="size-4" />
            {copy.hero.secondaryCta}
          </a>
        </div>

        <div className="mt-8 flex justify-center gap-3 sm:hidden">
          <WaterCard />
          <SunCard />
        </div>
      </div>

      <div className="relative mt-8 h-[380px] sm:mt-4 sm:h-[520px] lg:h-[560px]">
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
        <span aria-hidden="true" className="absolute top-[64%] left-[21%] size-5 rounded-full bg-black/10" />

        <img
          src={leafPurple}
          alt=""
          aria-hidden="true"
          className="absolute top-[16%] right-[24%] w-8 animate-sway sm:w-9"
        />

        <span
          aria-hidden="true"
          className="absolute bottom-[27%] left-1/2 h-5 w-40 -translate-x-1/2 rounded-[50%] bg-forest/25 blur-md sm:bottom-[25%] sm:w-56"
        />

        <img
          src={device}
          alt={copy.hero.deviceAlt}
          className="absolute bottom-[24%] left-1/2 h-[260px] -translate-x-1/2 object-contain drop-shadow-[0_24px_30px_rgba(31,74,44,0.25)] sm:bottom-[22%] sm:h-[350px] lg:h-[400px]"
        />

        <div className="absolute top-[34%] left-[5%] hidden sm:block">
          <WaterCard />
        </div>
        <div className="absolute top-[52%] right-[5%] hidden sm:block">
          <SunCard />
        </div>

      </div>
    </section>
  )
}
