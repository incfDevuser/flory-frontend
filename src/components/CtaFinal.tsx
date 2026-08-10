import floryWave from '../assets/mascot/flory-wave.png'
import { useI18n } from '../i18n'
import { IconArrowRight } from './icons'
import Reveal from './Reveal'

export default function CtaFinal() {
  const { copy } = useI18n()

  return (
    <section className="relative overflow-hidden bg-forest pt-32 pb-24 sm:pt-36 sm:pb-28">
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-16 w-full sm:h-24"
      >
        <path
          fill="var(--color-cream)"
          d="M0,0 L1440,0 L1440,120 C1140,120 1040,34 720,34 C400,34 300,120 0,120 Z"
        />
      </svg>

      <span aria-hidden="true" className="absolute top-[16%] -right-10 size-40 rounded-full bg-white/5 sm:size-52" />
      <span aria-hidden="true" className="absolute -bottom-10 left-[4%] size-32 rounded-full bg-white/5 sm:size-40" />

      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <Reveal>
          <img src={floryWave} alt="" aria-hidden="true" className="mx-auto h-28 animate-float object-contain sm:h-32" />
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-6 font-display text-3xl leading-[1.15] font-bold text-balance text-white sm:text-[2.6rem]">
            {copy.cta.title[0]}
            <br className="hidden sm:block" /> {copy.cta.title[1]}
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm text-pretty text-white/70 sm:text-base">
            {copy.cta.description}
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            <a
              href="#precios"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime px-7 py-3.5 font-display font-semibold text-forest shadow-[0_18px_34px_-16px_rgba(176,221,79,0.8)] transition hover:-translate-y-0.5 hover:bg-lime-300 active:translate-y-0 sm:w-auto"
            >
              {copy.cta.primary}
              <IconArrowRight className="size-5" />
            </a>

            <a
              href="#dudas"
              className="font-display font-semibold text-white/90 underline-offset-4 transition hover:text-white hover:underline"
            >
              {copy.cta.secondary}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
