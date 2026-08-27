import { useI18n } from '../i18n'
import { formatCLP, getPlans } from '../lib/pricing'
import CtaLoQuiero from './CtaLoQuiero'
import { IconCheck, IconSparkle } from './icons'
import Reveal from './Reveal'

/**
 * Precios de la app.
 *
 * Solo Free se puede usar hoy. Plus y Pro existen en la base de datos de la
 * app pero no están comercialmente activos (no hay pasarela de pago), así
 * que se muestran como "Próximamente" y su CTA solo deja el correo.
 *
 * Founding no es un plan: es una condición para quienes llegan durante el
 * lanzamiento, así que va en su propio bloque y nunca como cuarta tarjeta.
 */
export default function Precios() {
  const { copy } = useI18n()
  const plans = getPlans()

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

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const planCopy = copy.pricing.plans[index]
            const isFree = plan.monthlyPrice === 0

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
                    {!plan.available && (
                      <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-[#9a6817]">
                        {copy.pricing.comingSoon}
                      </span>
                    )}
                  </div>

                  {/* Altura mínima de dos líneas: sin esto, las descripciones
                      de una y dos líneas descuadran las listas entre tarjetas. */}
                  <p className="mt-3 min-h-11 text-sm leading-relaxed text-pretty text-muted">{planCopy.tagline}</p>

                  <div className="mt-4">
                    <p className="flex items-baseline gap-2">
                      <span className="font-display text-[2.1rem] leading-none font-bold text-forest">
                        {formatCLP(plan.monthlyPrice)}
                      </span>
                      <span className="text-xs font-semibold text-muted">
                        {isFree ? copy.pricing.forever : copy.pricing.perMonth}
                      </span>
                    </p>
                    {/* Altura reservada también en Free: mantiene las listas
                        de features alineadas entre las tres tarjetas. */}
                    <p className="mt-2 min-h-8 text-xs font-bold text-leaf-600">
                      {isFree ? '' : `${formatCLP(plan.annualPrice)} ${copy.pricing.annualSuffix}`}
                    </p>
                  </div>

                  <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                    {planCopy.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm font-semibold text-ink">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-white text-leaf">
                          <IconCheck className="size-3" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <CtaLoQuiero
                    label={planCopy.cta}
                    location="precios_plan"
                    plan={plan.id}
                    variant={plan.available ? 'leaf' : 'outline'}
                    className="mt-6 w-full"
                  />
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={200} className="mt-6">
          <p className="text-center text-xs text-muted">{copy.pricing.openPeriodNote}</p>
        </Reveal>

        <Reveal delay={240} className="mt-16">
          <h3 className="text-center font-display text-xl font-bold text-forest sm:text-2xl">
            {copy.pricing.comparison.title}
          </h3>

          {/* La tabla no cabe en móvil sin encoger la tipografía a algo
              ilegible, así que se desplaza en horizontal. */}
          <div className="no-scrollbar mt-6 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <caption className="sr-only">{copy.pricing.comparison.title}</caption>
              <thead>
                <tr className="border-b border-forest/10">
                  <th scope="col" className="py-3 pr-4 font-display text-sm font-bold text-muted">
                    {copy.pricing.comparison.featureLabel}
                  </th>
                  {plans.map((plan, index) => (
                    <th
                      key={plan.id}
                      scope="col"
                      className="py-3 pr-4 font-display text-sm font-bold text-forest"
                    >
                      {copy.pricing.plans[index].name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Las dos filas de precio se arman aquí y no en el copy:
                    los precios viven en lib/pricing.ts. */}
                <tr className="border-b border-forest/[0.07]">
                  <th scope="row" className="py-3 pr-4 text-sm font-semibold text-muted">
                    {copy.pricing.comparison.monthlyPriceLabel}
                  </th>
                  {plans.map((plan) => (
                    <td key={plan.id} className="py-3 pr-4 text-sm font-bold text-ink">
                      {formatCLP(plan.monthlyPrice)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-forest/[0.07]">
                  <th scope="row" className="py-3 pr-4 text-sm font-semibold text-muted">
                    {copy.pricing.comparison.annualPriceLabel}
                  </th>
                  {plans.map((plan) => (
                    <td key={plan.id} className="py-3 pr-4 text-sm font-bold text-ink">
                      {formatCLP(plan.annualPrice)}
                    </td>
                  ))}
                </tr>

                {copy.pricing.comparison.rows.map((row) => (
                  <tr key={row.label} className="border-b border-forest/[0.07]">
                    <th scope="row" className="py-3 pr-4 text-sm font-semibold text-muted">
                      {row.label}
                    </th>
                    {row.values.map((value, valueIndex) => (
                      <td key={plans[valueIndex].id} className="py-3 pr-4 text-sm font-bold text-ink">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Founding no es un plan que se compre: es una condición para los
            usuarios iniciales, así que va fuera de la parrilla de tarjetas. */}
        <Reveal delay={300} className="mt-14">
          <aside className="flex flex-col items-start gap-4 rounded-[28px] bg-grape-100/60 p-7 sm:flex-row sm:items-center sm:gap-6">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-grape">
              <IconSparkle className="size-6" />
            </span>
            <div>
              <p className="font-display text-[11px] font-bold tracking-[0.14em] text-grape uppercase">
                {copy.pricing.founding.badge}
              </p>
              <h3 className="mt-1.5 font-display text-lg font-bold text-forest">{copy.pricing.founding.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-pretty text-muted">
                {copy.pricing.founding.description}
              </p>
            </div>
          </aside>
        </Reveal>

        <Reveal delay={340} className="mt-12 text-center">
          <CtaLoQuiero label={copy.pricing.cta} location="precios" plan="FREE" />
          <p className="mx-auto mt-4 max-w-lg text-xs text-pretty text-muted">{copy.pricing.note}</p>
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
