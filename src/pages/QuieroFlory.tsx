import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { IconArrowRight, IconCheck, IconMail, IconSparkle } from '../components/icons'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { useI18n, usePageMeta } from '../i18n'
import { track } from '../lib/analytics'
import { isValidEmail, submitLead } from '../lib/leads'
import { INSTAGRAM_URL } from '../lib/links'
import { formatCLP, getPlans, isPlanId } from '../lib/pricing'
import type { PlanId } from '../lib/pricing'

type FormStatus = 'idle' | 'submitting'
type FormError = 'invalid_email' | 'network' | null

/**
 * Paso 1 (elegir plan) y paso 2 (dejar el correo).
 *
 * Nada se cobra aquí: Plus y Pro todavía no se pueden contratar, así que
 * incluso el plan de pago termina en una lista de espera. El período de
 * facturación mostrado es siempre mensual, que es el precio que se enseña
 * en las tarjetas.
 */
export default function QuieroFlory() {
  const { copy, language } = useI18n()
  usePageMeta(copy.quiero.meta.title, copy.quiero.meta.description)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const plans = getPlans()

  // `?plan=` permite que "Empezar gratis" salte directo al formulario sin
  // pedir que se elija de nuevo lo que ya se eligió en la landing.
  const planParam = searchParams.get('plan')
  const [selectedId, setSelectedId] = useState<PlanId | null>(() =>
    isPlanId(planParam) ? planParam : null,
  )
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [error, setError] = useState<FormError>(null)

  const selectedIndex = plans.findIndex((plan) => plan.id === selectedId)
  const selectedPlan = selectedIndex >= 0 ? plans[selectedIndex] : null
  const selectedCopy = selectedIndex >= 0 ? copy.pricing.plans[selectedIndex] : null

  useEffect(() => {
    track('view_pricing')
  }, [])

  useEffect(() => {
    if (!selectedId) return
    track('view_lead_form', { plan: selectedId })
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [selectedId])

  const handleSelect = (planId: PlanId, price: number) => {
    track('select_plan', { plan: planId, price })
    setSelectedId(planId)
  }

  const handleChangePlan = () => {
    setSelectedId(null)
    setError(null)
    // Sin esto, el `?plan=` de la URL contradiría la pantalla que se ve.
    if (searchParams.has('plan')) {
      searchParams.delete('plan')
      setSearchParams(searchParams, { replace: true })
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selectedPlan || status === 'submitting') return

    if (!isValidEmail(email)) {
      setError('invalid_email')
      track('lead_error', { reason: 'invalid_email' })
      return
    }

    setError(null)
    setStatus('submitting')

    const result = await submitLead(
      {
        email,
        name,
        selectedPlan: selectedPlan.id,
        billingPeriod: 'monthly',
        displayedPrice: selectedPlan.monthlyPrice,
      },
      language,
    )

    if (result.ok) {
      track('submit_lead', {
        plan: selectedPlan.id,
        displayedPrice: selectedPlan.monthlyPrice,
        hasName: Boolean(name.trim()),
      })
      navigate('/gracias', {
        state: {
          email: result.lead.email,
          planName: selectedCopy?.name,
        },
      })
      return
    }

    setStatus('idle')
    setError(result.error)
    track('lead_error', { reason: result.error })
  }

  return (
    <div className="flex min-h-dvh flex-col bg-cream">
      <PageHeader />

      <main className="relative flex-1 overflow-hidden px-6 py-12 sm:py-16">
        <span aria-hidden="true" className="absolute top-[18%] -left-20 size-52 rounded-full bg-lime-300/35" />
        <span aria-hidden="true" className="absolute bottom-[10%] -right-20 size-56 rounded-full bg-grape-100/50" />

        {selectedPlan && selectedCopy ? (
          <div className="relative mx-auto max-w-lg">
            <p className="text-center font-display text-xs font-semibold tracking-[0.18em] text-leaf uppercase">
              {copy.lead.eyebrow}
            </p>
            <h1 className="mt-3 text-center font-display text-3xl leading-[1.15] font-bold text-balance sm:text-[2.4rem]">
              {copy.lead.title}
            </h1>
            <p className="mx-auto mt-4 max-w-md text-center text-sm text-pretty text-muted sm:text-base">
              {copy.lead.description}
            </p>

            <div className="mt-8 flex items-center justify-between gap-4 rounded-[22px] bg-white px-5 py-4 shadow-[0_20px_40px_-30px_rgba(31,74,44,0.6)]">
              <div>
                <p className="text-[11px] font-bold tracking-[0.14em] text-muted uppercase">
                  {copy.lead.selectedLabel}
                </p>
                <p className="mt-1 flex flex-wrap items-center gap-2 font-display text-base font-bold text-forest">
                  {selectedCopy.name}
                  {!selectedPlan.available && (
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-[#9a6817]">
                      {copy.pricing.comingSoon}
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-muted">
                  {formatCLP(selectedPlan.monthlyPrice)}{' '}
                  {selectedPlan.monthlyPrice === 0 ? copy.pricing.forever : copy.pricing.perMonth}
                </p>
              </div>
              <button
                type="button"
                onClick={handleChangePlan}
                className="shrink-0 rounded-full px-3 py-1.5 font-display text-sm font-semibold text-leaf underline-offset-4 transition hover:bg-cream hover:underline"
              >
                {copy.lead.change}
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate className="mt-5 rounded-[26px] bg-white p-6 shadow-[0_26px_50px_-34px_rgba(31,74,44,0.6)] sm:p-7">
              <div>
                <label htmlFor="lead-email" className="font-display text-sm font-bold text-forest">
                  {copy.lead.emailLabel}
                </label>
                <input
                  id="lead-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  maxLength={254}
                  required
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    if (error === 'invalid_email') setError(null)
                  }}
                  placeholder={copy.lead.emailPlaceholder}
                  aria-invalid={error === 'invalid_email'}
                  aria-describedby={error ? 'lead-error' : undefined}
                  className={`mt-2 w-full rounded-2xl bg-cream px-4 py-3.5 text-sm font-semibold text-ink transition placeholder:font-normal placeholder:text-muted/70 ${
                    error === 'invalid_email' ? 'ring-2 ring-clay' : 'ring-1 ring-forest/10 focus:ring-2 focus:ring-leaf'
                  }`}
                />
              </div>

              <div className="mt-5">
                <label htmlFor="lead-name" className="font-display text-sm font-bold text-forest">
                  {copy.lead.nameLabel}{' '}
                  <span className="text-xs font-semibold text-muted">({copy.lead.nameOptional})</span>
                </label>
                <input
                  id="lead-name"
                  name="name"
                  type="text"
                  autoComplete="given-name"
                  maxLength={100}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={copy.lead.namePlaceholder}
                  className="mt-2 w-full rounded-2xl bg-cream px-4 py-3.5 text-sm font-semibold text-ink ring-1 ring-forest/10 transition placeholder:font-normal placeholder:text-muted/70 focus:ring-2 focus:ring-leaf"
                />
              </div>

              {error && (
                <p id="lead-error" role="alert" className="mt-4 text-sm font-semibold text-clay">
                  {error === 'invalid_email' ? copy.lead.errorEmail : copy.lead.errorNetwork}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-leaf px-7 py-3.5 font-display font-semibold text-white shadow-[0_18px_34px_-16px_rgba(63,157,99,0.95)] transition hover:-translate-y-0.5 hover:bg-leaf-600 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {status === 'submitting' ? copy.lead.submitting : copy.lead.submit}
                {status === 'idle' && <IconArrowRight className="size-5" />}
              </button>

              <p className="mt-4 text-center text-xs text-pretty text-muted">{copy.lead.privacy}</p>
            </form>
          </div>
        ) : (
          <div className="relative mx-auto max-w-5xl">
            <Reveal className="text-center">
              <p className="font-display text-xs font-semibold tracking-[0.18em] text-leaf uppercase">
                {copy.quiero.eyebrow}
              </p>
              <h1 className="mt-3 font-display text-3xl leading-[1.15] font-bold text-balance sm:text-[2.6rem]">
                {copy.quiero.title}
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-sm text-pretty text-muted sm:text-base">
                {copy.quiero.description}
              </p>
            </Reveal>

            <Reveal delay={70} className="mx-auto mt-8 max-w-3xl">
              <aside className="border-y border-forest/10 py-4">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-0">
                  <div className="flex items-center gap-3 sm:pr-6">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-amber-100 text-[#b07a1e]">
                      <IconSparkle className="size-5" />
                    </span>
                    <p className="text-sm leading-snug text-muted">
                      <span className="block font-display text-[10px] font-bold tracking-[0.12em] text-[#9a6817] uppercase">
                        {copy.quiero.availability.badge}
                      </span>
                      <strong className="font-bold text-forest">{copy.quiero.availability.launchTitle}</strong>{' '}
                      {copy.quiero.availability.launchText}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 border-t border-forest/10 pt-4 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-leaf-100 text-leaf">
                      <IconMail className="size-5" />
                    </span>
                    <p className="text-sm leading-snug text-muted">
                      <strong className="font-bold text-forest">{copy.quiero.availability.freeTitle}</strong>{' '}
                      {copy.quiero.availability.freeText}
                    </p>
                  </div>
                </div>
              </aside>
            </Reveal>

            <div className="mt-10 grid items-start gap-6 lg:grid-cols-3">
              {plans.map((plan, index) => {
                const planCopy = copy.pricing.plans[index]
                const isFree = plan.monthlyPrice === 0

                return (
                  <Reveal key={plan.id} delay={index * 90}>
                    <article
                      className={`flex h-full flex-col rounded-[28px] p-7 ${
                        plan.featured
                          ? 'bg-white shadow-[0_34px_60px_-34px_rgba(31,74,44,0.6)] ring-2 ring-leaf'
                          : 'bg-white/70 shadow-[0_24px_46px_-34px_rgba(31,74,44,0.5)] ring-1 ring-forest/10'
                      }`}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-display text-lg font-bold text-forest">{planCopy.name}</h2>
                        {plan.featured && (
                          <span className="rounded-full bg-lime-100 px-2.5 py-1 text-[11px] font-bold text-leaf-600">
                            {copy.quiero.mostPopular}
                          </span>
                        )}
                        {!plan.available && (
                          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-[#9a6817]">
                            {copy.pricing.comingSoon}
                          </span>
                        )}
                      </div>

                      {/* Altura mínima de dos líneas para que las tres listas
                          de features arranquen a la misma altura. */}
                      <p className="mt-3 min-h-11 text-sm leading-relaxed text-pretty text-muted">
                        {planCopy.tagline}
                      </p>

                      <div className="mt-4">
                        <p className="flex items-baseline gap-2">
                          <span className="font-display text-[2.1rem] leading-none font-bold text-forest">
                            {formatCLP(plan.monthlyPrice)}
                          </span>
                          <span className="text-xs font-semibold text-muted">
                            {isFree ? copy.pricing.forever : copy.pricing.perMonth}
                          </span>
                        </p>
                        <p className="mt-2 min-h-8 text-xs font-bold text-leaf-600">
                          {isFree ? '' : `${formatCLP(plan.annualPrice)} ${copy.pricing.annualSuffix}`}
                        </p>
                      </div>

                      <ul className="mt-5 flex flex-1 flex-col gap-3">
                        {planCopy.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3 text-sm font-semibold text-ink">
                            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-leaf-100 text-leaf">
                              <IconCheck className="size-3" />
                            </span>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {plan.id === 'FREE' ? (
                        <a
                          href={INSTAGRAM_URL}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => track('select_plan', { plan: plan.id, price: 0, destination: 'instagram' })}
                          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-leaf px-6 py-3.5 font-display font-semibold text-white shadow-[0_18px_32px_-18px_rgba(63,157,99,0.95)] transition hover:-translate-y-0.5 hover:bg-leaf-600 active:translate-y-0"
                        >
                          {planCopy.cta}
                          <IconArrowRight className="size-5" />
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSelect(plan.id, plan.monthlyPrice)}
                          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-display font-semibold text-forest ring-1 ring-forest/15 transition hover:-translate-y-0.5 hover:bg-cream-200 active:translate-y-0"
                        >
                          {planCopy.cta}
                          <IconArrowRight className="size-5" />
                        </button>
                      )}
                    </article>
                  </Reveal>
                )
              })}
            </div>

            <Reveal delay={280} className="mt-10">
              <aside className="mx-auto flex max-w-3xl items-center gap-4 rounded-[26px] bg-grape-100/60 px-6 py-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-grape">
                  <IconSparkle className="size-5" />
                </span>
                <p className="text-sm leading-relaxed text-pretty text-muted">
                  <strong className="font-display font-bold text-forest">{copy.pricing.founding.badge}:</strong>{' '}
                  {copy.pricing.founding.description}
                </p>
              </aside>
            </Reveal>

            <Reveal delay={320} className="mt-10 text-center">
              <p className="mx-auto max-w-md text-sm text-pretty text-muted">{copy.quiero.disclaimer}</p>
              <p className="mx-auto mt-2 max-w-lg text-xs text-pretty text-muted/80">{copy.pricing.note}</p>
              <Link
                to="/"
                className="mt-6 inline-block font-display text-sm font-semibold text-leaf underline-offset-4 transition hover:underline"
              >
                {copy.quiero.back}
              </Link>
            </Reveal>
          </div>
        )}
      </main>
    </div>
  )
}
