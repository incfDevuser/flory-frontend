import { useMemo } from 'react'
import { useI18n } from '../i18n'
import { formatCLP, getPlans, getPriceVariant } from '../lib/pricing'
import CtaLoQuiero from './CtaLoQuiero'
import { IconCheck } from './icons'
import Reveal from './Reveal'

/**
 * Resumen de precios de la landing.
 *
 * A propósito no tiene un botón por tarjeta: la elección de plan se mide en
 * /quiero-flory, así que aquí solo se muestra el precio y se manda a la
 * página de planes con un único CTA.
 */
export default function Precios() {
  const { copy } = useI18n()
  const plans = useMemo(() => getPlans(getPriceVariant()), [])

  return (
    <section id="precios" className="relative bg-white pt-16 pb-32 sm:pt-20 sm:pb-40">
      <div className="mx-auto max-w-5xl px-6">
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

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const planCopy = copy.pricing.plans[index]

            return (
              <Reveal key={plan.id} delay={index * 90}>
                <article
                  className={`flex h-full flex-col rounded-[28px] p-7 ${
                    plan.featured
                      ? 'bg-leaf-100 shadow-[0_34px_60px_-34px_rgba(31,74,44,0.6)] ring-2 ring-leaf-300'
                      : 'bg-cream ring-1 ring-forest/10'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-lg font-bold text-forest">{planCopy.name}</h3>
                    {plan.featured && (
                      <span className="rounded-full bg-lime-100 px-2.5 py-1 text-[11px] font-bold text-leaf-600">
                        {copy.pricing.mostPopular}
                      </span>
                    )}
                  </div>

                  <p className="mt-4 flex items-baseline gap-2">
                    <span className="font-display text-[2.1rem] leading-none font-bold text-forest">
                      {formatCLP(plan.price)}
                    </span>
                    <span className="text-xs font-semibold text-muted">{copy.pricing.oneTime}</span>
                  </p>

                  {/* Altura mínima de dos líneas: sin esto, las descripciones
                      de una y dos líneas descuadran las listas entre tarjetas. */}
                  <p className="mt-3 min-h-11 text-sm leading-relaxed text-pretty text-muted">{planCopy.tagline}</p>

                  <ul className="mt-5 flex flex-col gap-2.5">
                    {planCopy.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm font-semibold text-ink">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-white text-leaf">
                          <IconCheck className="size-3" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={280} className="mt-12 text-center">
          <CtaLoQuiero label={copy.pricing.cta} location="precios" />
          <p className="mt-4 text-xs text-muted">{copy.pricing.note}</p>
        </Reveal>
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
