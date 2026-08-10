import floryHero from '../assets/mascot/flory-hero.png'
import floryThinking from '../assets/mascot/flory-thinking.png'
import floryWatering from '../assets/mascot/flory-watering.png'
import { useI18n } from '../i18n'
import Reveal from './Reveal'

const stepVisuals = [
  {
    image: floryHero,
    circle: 'bg-lime',
  },
  {
    image: floryThinking,
    circle: 'bg-amber',
  },
  {
    image: floryWatering,
    circle: 'bg-grape',
  },
]

export default function ComoFunciona() {
  const { copy } = useI18n()

  return (
    <section id="como-funciona" className="relative bg-white pt-20 pb-32 sm:pt-24 sm:pb-40">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <p className="font-display text-xs font-semibold tracking-[0.18em] text-leaf uppercase">
            {copy.steps.eyebrow}
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl leading-[1.15] font-bold text-balance sm:text-[2.6rem]">
            {copy.steps.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 sm:mt-16 sm:grid-cols-3 sm:gap-8">
          {copy.steps.items.map((step, index) => (
            <Reveal key={step.title} delay={index * 110} className="flex flex-col items-center text-center">
              <div className="relative">
                <div className={`grid size-36 place-items-center rounded-full sm:size-40 ${stepVisuals[index].circle}`}>
                  <img
                    src={stepVisuals[index].image}
                    alt={step.alt}
                    className="max-h-[104px] max-w-[104px] object-contain sm:max-h-[118px] sm:max-w-[118px]"
                  />
                </div>
                <span aria-hidden="true" className="absolute -top-1 -right-1 size-12 rounded-full bg-cream/60" />
                <span className="absolute bottom-3 -left-3 grid size-9 place-items-center rounded-full bg-white font-display text-sm font-bold text-forest shadow-[0_10px_20px_-12px_rgba(31,74,44,0.7)]">
                  {index + 1}
                </span>
              </div>

              <h3 className="mt-7 font-display text-xl font-bold">{step.title}</h3>
              <p className="mt-3 max-w-[17rem] text-sm leading-relaxed text-pretty text-muted">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-16 w-full sm:h-24"
      >
        <path
          fill="var(--color-cream)"
          d="M0,52 C240,6 520,0 760,22 C1010,45 1240,92 1440,74 L1440,120 L0,120 Z"
        />
      </svg>
    </section>
  )
}
