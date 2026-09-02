import { Link } from 'react-router-dom'
import { track } from '../lib/analytics'
import { INSTAGRAM_URL } from '../lib/links'
import type { PlanId } from '../lib/pricing'
import { IconArrowRight } from './icons'

/**
 * CTA principal de Flory. Centraliza la navegación y el evento de analítica:
 * Free lleva al Instagram de Flory; Plus y Pro entran al funnel de interés.
 *
 * `plan` preselecciona un plan en /quiero-flory mediante `?plan=`. Va en la
 * URL y no en el state del router para que el enlace siga funcionando si se
 * comparte o se recarga la página.
 */

export type CtaLocation =
  | 'hero'
  | 'navbar'
  | 'navbar_mobile'
  | 'precios'
  | 'precios_plan'
  | 'sensor'
  | 'cta_final'

const variants = {
  leaf: 'bg-leaf text-white shadow-[0_18px_34px_-16px_rgba(63,157,99,0.95)] hover:bg-leaf-600',
  lime: 'bg-lime text-forest shadow-[0_18px_34px_-16px_rgba(176,221,79,0.8)] hover:bg-lime-300',
  outline: 'text-forest ring-1 ring-forest/15 hover:bg-cream-200',
}

const sizes = {
  md: 'px-7 py-3.5 font-display font-semibold',
  sm: 'px-5 py-2.5 text-sm font-bold',
}

type Props = {
  label: string
  location: CtaLocation
  plan?: PlanId
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  className?: string
  onNavigate?: () => void
}

export default function CtaLoQuiero({
  label,
  location,
  plan,
  variant = 'leaf',
  size = 'md',
  className = '',
  onNavigate,
}: Props) {
  const handleClick = () => {
    track('click_lo_quiero', { location, plan, destination: plan === 'FREE' ? 'instagram' : 'waitlist' })
    onNavigate?.()
  }

  const classes = `inline-flex items-center justify-center gap-2 rounded-full transition hover:-translate-y-0.5 active:translate-y-0 ${variants[variant]} ${sizes[size]} ${className}`

  if (plan === 'FREE') {
    return (
      <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" onClick={handleClick} className={classes}>
        {label}
        <IconArrowRight className={size === 'sm' ? 'size-4' : 'size-5'} />
      </a>
    )
  }

  return (
    <Link
      to={plan ? `/quiero-flory?plan=${plan}` : '/quiero-flory'}
      onClick={handleClick}
      className={classes}
    >
      {label}
      <IconArrowRight className={size === 'sm' ? 'size-4' : 'size-5'} />
    </Link>
  )
}
