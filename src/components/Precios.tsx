import { useI18n } from '../i18n'
import { IconCheck, IconDash } from './icons'
import Reveal from './Reveal'

const sensorVisuals = [
  {
    arc: 'bg-lime',
    featured: false,
  },
  {
    arc: 'bg-amber',
    featured: true,
  },
]

export default function Precios() {
  const { copy } = useI18n()
  const sensors = copy.pricing.sensors.map((sensor, index) => ({ ...sensor, ...sensorVisuals[index] }))
  const appPlans = copy.pricing.appPlans.map((plan, index) => ({ ...plan, featured: index === 1 }))

  return (
    <section id="precios" className="relative bg-white pt-16 pb-32 sm:pt-20 sm:pb-40">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <p className="font-display text-xs font-semibold tracking-[0.18em] text-leaf uppercase">
            {copy.pricing.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl leading-[1.15] font-bold text-balance sm:text-[2.6rem]">
            {copy.pricing.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-pretty text-muted sm:text-base">
            {copy.pricing.description}
          </p>
        </Reveal>

        <div className="mx-auto mt-20 grid max-w-3xl items-center gap-8 sm:grid-cols-2 sm:gap-6">
          {sensors.map((sensor, index) => (
            <Reveal key={sensor.name} delay={index * 110} className="relative">
              <span
                aria-hidden="true"
                className={`absolute -top-7 left-1/2 h-14 w-28 -translate-x-1/2 rounded-t-full ${sensor.arc}`}
              />

              <article
                className={`relative flex h-full flex-col rounded-[28px] p-7 transition duration-300 ${
                  sensor.featured
                    ? 'bg-leaf-100 shadow-[0_34px_60px_-34px_rgba(31,74,44,0.6)] ring-2 ring-leaf-300'
                    : 'bg-white shadow-[0_26px_50px_-34px_rgba(31,74,44,0.55)] ring-1 ring-black/5 hover:-translate-y-1'
                }`}
              >
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-lg font-bold">{sensor.name}</h3>
                  {sensor.featured && (
                    <span className="rounded-full bg-lime-100 px-2.5 py-1 text-[11px] font-bold text-leaf-600">
                      {copy.pricing.mostPopular}
                    </span>
                  )}
                </div>

                <p className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-[2.1rem] leading-none font-bold text-forest">{sensor.price}</span>
                  <span className="text-xs font-semibold text-muted">{sensor.period}</span>
                </p>

                <p className="mt-4 text-sm leading-relaxed text-pretty text-muted">{sensor.description}</p>

                <ul className="mt-6 flex flex-col gap-3">
                  {sensor.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm font-semibold text-ink">
                      {sensor.featured ? (
                        <IconCheck className="size-4 shrink-0 text-leaf" />
                      ) : (
                        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-leaf-100 text-leaf">
                          <IconCheck className="size-3" />
                        </span>
                      )}
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#inicio"
                  className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3.5 font-display font-semibold transition ${
                    sensor.featured
                      ? 'bg-leaf text-white shadow-[0_18px_32px_-18px_rgba(63,157,99,0.95)] hover:-translate-y-0.5 hover:bg-leaf-600'
                      : 'text-forest ring-1 ring-black/10 hover:-translate-y-0.5 hover:bg-cream'
                  }`}
                >
                  {sensor.cta}
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24 text-center">
          <p className="font-display text-xs font-semibold tracking-[0.18em] text-leaf uppercase">
            {copy.pricing.appEyebrow}
          </p>
          <h3 className="mx-auto mt-3 max-w-xl font-display text-2xl leading-[1.2] font-bold text-balance sm:text-[2rem]">
            {copy.pricing.appTitle}
          </h3>
        </Reveal>

        <div className="mt-10 grid items-start gap-6 md:grid-cols-2">
          {appPlans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 110}>
              <article
                className={`flex h-full flex-col rounded-[28px] p-7 sm:p-8 ${
                  plan.featured
                    ? 'bg-forest shadow-[0_38px_70px_-38px_rgba(31,74,44,0.9)]'
                    : 'bg-cream ring-1 ring-forest/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <h3 className={`font-display text-lg font-bold ${plan.featured ? 'text-white' : 'text-forest'}`}>
                    {plan.name}
                  </h3>
                  {plan.featured && (
                    <span className="rounded-full bg-lime px-2.5 py-1 text-[11px] font-bold text-forest">
                      {copy.pricing.intelligence}
                    </span>
                  )}
                </div>

                <p className="mt-4 flex items-baseline gap-2">
                  <span
                    className={`font-display text-[2.1rem] leading-none font-bold ${
                      plan.featured ? 'text-white' : 'text-forest'
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span className={`text-xs font-semibold ${plan.featured ? 'text-white/60' : 'text-muted'}`}>
                    {plan.period}
                  </span>
                </p>

                <p
                  className={`mt-4 text-sm leading-relaxed text-pretty ${plan.featured ? 'text-white/70' : 'text-muted'}`}
                >
                  {plan.description}
                </p>

                <ul className="mt-6 flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature.label}
                      className={`flex items-start gap-3 text-sm font-semibold ${
                        !feature.included ? (plan.featured ? 'text-white/40' : 'text-muted/70') : plan.featured ? 'text-white' : 'text-ink'
                      }`}
                    >
                      {feature.included ? (
                        <span
                          className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${
                            plan.featured ? 'bg-white/10 text-lime' : 'bg-leaf-100 text-leaf'
                          }`}
                        >
                          <IconCheck className="size-3" />
                        </span>
                      ) : (
                        <span
                          className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${
                            plan.featured ? 'bg-white/5 text-white/40' : 'bg-cream-300/60 text-muted'
                          }`}
                        >
                          <IconDash className="size-3" />
                        </span>
                      )}
                      {feature.label}
                    </li>
                  ))}
                </ul>

                {plan.featured ? (
                  <a
                    href="#inicio"
                    className="mt-8 inline-flex items-center justify-center rounded-full bg-lime px-6 py-3.5 font-display font-semibold text-forest shadow-[0_18px_32px_-18px_rgba(176,221,79,0.9)] transition hover:-translate-y-0.5 hover:bg-lime-300"
                  >
                    {copy.pricing.plusCta}
                  </a>
                ) : (
                  <p className="mt-8 rounded-full bg-white px-6 py-3.5 text-center font-display font-semibold text-muted">
                    {copy.pricing.basicIncluded}
                  </p>
                )}
              </article>
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
        <path fill="var(--color-cream)" d="M0,62 C260,18 520,4 800,26 C1050,46 1250,86 1440,66 L1440,120 L0,120 Z" />
      </svg>
    </section>
  )
}
