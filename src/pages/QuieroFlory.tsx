import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IconArrowRight, IconBox, IconCheck, IconMail } from '../components/icons'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { useI18n, usePageMeta } from '../i18n'
import { track } from '../lib/analytics'
import { isValidEmail, submitLead } from '../lib/leads'
import { LAUNCH_DEVICE_PRICE, PREMIUM_MONTHLY_PRICE, formatCLP, getPlans, getPriceVariant } from '../lib/pricing'
import type { PlanId } from '../lib/pricing'

type FormStatus = 'idle' | 'submitting'
type FormError = 'invalid_email' | 'network' | null

export default function QuieroFlory() {
  const { copy, language } = useI18n()
  usePageMeta(copy.quiero.meta.title, copy.quiero.meta.description)
  const navigate = useNavigate()

  // La variante se fija una vez por sesión: si cambiara al re-renderizar,
  // el precio bailaría delante del usuario y el experimento no serviría.
  const priceVariant = useMemo(() => getPriceVariant(), [])
  const plans = useMemo(() => getPlans(priceVariant), [priceVariant])

  const [selectedId, setSelectedId] = useState<PlanId | null>(null)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [error, setError] = useState<FormError>(null)

  const selectedIndex = plans.findIndex((plan) => plan.id === selectedId)
  const selectedPlan = selectedIndex >= 0 ? plans[selectedIndex] : null
  const selectedCopy = selectedIndex >= 0 ? copy.quiero.plans[selectedIndex] : null

  useEffect(() => {
    track('view_pricing', { priceVariant })
  }, [priceVariant])

  useEffect(() => {
    if (!selectedId) return
    track('view_lead_form', { plan: selectedId })
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [selectedId])

  const handleSelect = (planId: PlanId, regularPrice: number, offerPrice: number) => {
    track('select_plan', { plan: planId, price: offerPrice, regularPrice, priceVariant })
    setSelectedId(planId)
  }

  const handleChangePlan = () => {
    setSelectedId(null)
    setError(null)
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
        regularPrice: selectedPlan.price,
        displayedPrice: selectedPlan.offerPrice,
        launchUnitPrice: LAUNCH_DEVICE_PRICE,
        priceVariant,
      },
      language,
    )

    if (result.ok) {
      track('submit_lead', {
        plan: selectedPlan.id,
        displayedPrice: selectedPlan.offerPrice,
        regularPrice: selectedPlan.price,
        priceVariant,
        hasName: Boolean(name.trim()),
      })
      navigate('/gracias', {
        state: {
          email: result.lead.email,
          planName: selectedCopy?.name,
          offerPrice: selectedPlan.offerPrice,
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
                <p className="mt-1 font-display text-base font-bold text-forest">{selectedCopy.name}</p>
                <p className="mt-0.5 flex items-baseline gap-2">
                  <del className="text-xs font-semibold text-muted">{formatCLP(selectedPlan.price)}</del>
                  <strong className="font-display text-lg font-bold text-leaf-600">
                    {formatCLP(selectedPlan.offerPrice)}
                  </strong>
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
                      <IconBox className="size-5" />
                    </span>
                    <p className="text-sm leading-snug text-muted">
                      <span className="block font-display text-[10px] font-bold tracking-[0.12em] text-[#9a6817] uppercase">
                        {copy.quiero.availability.badge}
                      </span>
                      <strong className="font-bold text-forest">{copy.quiero.availability.manufacturingTitle}</strong>{' '}
                      {copy.quiero.availability.manufacturingText}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 border-t border-forest/10 pt-4 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-leaf-100 text-leaf">
                      <IconMail className="size-5" />
                    </span>
                    <p className="text-sm leading-snug text-muted">
                      <strong className="font-bold text-forest">
                        {copy.quiero.availability.emailTitle} {formatCLP(LAUNCH_DEVICE_PRICE)}
                      </strong>{' '}
                      {copy.quiero.availability.emailText}
                    </p>
                  </div>
                </div>
              </aside>
            </Reveal>

            <div className="mt-10 grid items-start gap-6 lg:grid-cols-3">
              {plans.map((plan, index) => {
                const planCopy = copy.quiero.plans[index]

                return (
                  <Reveal key={plan.id} delay={index * 90}>
                    <article
                      className={`flex h-full flex-col rounded-[28px] p-7 ${
                        plan.featured
                          ? 'bg-white shadow-[0_34px_60px_-34px_rgba(31,74,44,0.6)] ring-2 ring-leaf'
                          : 'bg-white/70 shadow-[0_24px_46px_-34px_rgba(31,74,44,0.5)] ring-1 ring-forest/10'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <h2 className="font-display text-lg font-bold text-forest">{planCopy.name}</h2>
                        {plan.featured && (
                          <span className="rounded-full bg-lime-100 px-2.5 py-1 text-[11px] font-bold text-leaf-600">
                            {copy.quiero.mostPopular}
                          </span>
                        )}
                      </div>

                      <div className="mt-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-lime-100 px-2.5 py-1 text-[10px] font-bold text-leaf-600">
                            {copy.pricing.launchOffer}
                          </span>
                          <del className="text-xs font-semibold text-muted" aria-label={copy.pricing.regularPriceLabel}>
                            {formatCLP(plan.price)}
                          </del>
                        </div>
                        <p className="mt-2 flex items-baseline gap-2">
                          <span className="font-display text-[2.1rem] leading-none font-bold text-forest">
                            {formatCLP(plan.offerPrice)}
                          </span>
                          <span className="text-xs font-semibold text-muted">{copy.quiero.oneTime}</span>
                        </p>
                        {plan.deviceCount > 1 && (
                          <p className="mt-1 text-xs font-bold text-leaf-600">
                            {plan.deviceCount} × {formatCLP(LAUNCH_DEVICE_PRICE)} {copy.pricing.eachDevice}
                          </p>
                        )}
                      </div>

                      {/* Altura mínima de dos líneas para que las tres listas
                          de features arranquen a la misma altura. */}
                      <p className="mt-4 min-h-11 text-sm leading-relaxed text-pretty text-muted">
                        {planCopy.description}
                      </p>
                      <p className="mt-1 text-xs font-bold text-leaf-600">{planCopy.offerDetail}</p>

                      <ul className="mt-6 flex flex-1 flex-col gap-3">
                        {planCopy.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3 text-sm font-semibold text-ink">
                            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-leaf-100 text-leaf">
                              <IconCheck className="size-3" />
                            </span>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {plan.featured && (
                        <p className="mt-5 rounded-2xl bg-cream px-4 py-3 text-xs leading-relaxed text-pretty text-muted">
                          {copy.quiero.premiumNotePrefix}
                          <strong className="font-bold text-forest">{formatCLP(PREMIUM_MONTHLY_PRICE)}</strong>
                          {copy.quiero.premiumNoteSuffix}
                        </p>
                      )}

                      <button
                        type="button"
                        onClick={() => handleSelect(plan.id, plan.price, plan.offerPrice)}
                        className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-display font-semibold transition hover:-translate-y-0.5 active:translate-y-0 ${
                          plan.featured
                            ? 'bg-leaf text-white shadow-[0_18px_32px_-18px_rgba(63,157,99,0.95)] hover:bg-leaf-600'
                            : 'text-forest ring-1 ring-forest/15 hover:bg-cream-200'
                        }`}
                      >
                        {planCopy.cta}
                        <IconArrowRight className="size-5" />
                      </button>
                    </article>
                  </Reveal>
                )
              })}
            </div>

            <Reveal delay={280} className="mt-10 text-center">
              <p className="mx-auto max-w-md text-sm text-pretty text-muted">{copy.quiero.disclaimer}</p>
              <p className="mt-2 text-xs text-muted/80">{copy.pricing.note}</p>
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
