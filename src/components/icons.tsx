type IconProps = {
  className?: string
}

export function LogoFlory({ className = '' }: IconProps) {
  return (
    <span className={`inline-flex items-baseline font-display text-2xl font-bold text-leaf ${className}`}>
      Flory
      <svg viewBox="0 0 12 12" aria-hidden="true" className="ml-0.5 size-2.5 self-start">
        <path
          fill="currentColor"
          d="M11 1C7.5 0.6 4.4 1.7 3 4.2c-1 1.8-.6 3.9.8 5 .3-2.1 1.6-4 3.6-5.2C6 5.3 4.7 7 4.2 9.1c2 .4 4-.6 5-2.4C10.6 4.2 11.3 2.6 11 1Z"
        />
      </svg>
    </span>
  )
}

export function IconArrowRight({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M4 10h11m0 0-4.2-4.2M15 10l-4.2 4.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconPlay({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M7.5 5.6v8.8c0 .5.5.8 1 .6l7-4.4a.7.7 0 0 0 0-1.2l-7-4.4a.7.7 0 0 0-1 .6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconSparkle({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M11 2.5c.6 2.6 1.9 3.9 4.5 4.5-2.6.6-3.9 1.9-4.5 4.5-.6-2.6-1.9-3.9-4.5-4.5C9.1 6.4 10.4 5.1 11 2.5Z"
        fill="currentColor"
      />
      <path
        d="M5.4 11.5c.35 1.5 1.1 2.25 2.6 2.6-1.5.35-2.25 1.1-2.6 2.6-.35-1.5-1.1-2.25-2.6-2.6 1.5-.35 2.25-1.1 2.6-2.6Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function IconDrop({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M10 3.2c2.6 2.7 4.2 4.9 4.2 7a4.2 4.2 0 1 1-8.4 0c0-2.1 1.6-4.3 4.2-7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconSun({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <circle cx="10" cy="10" r="3.4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M10 2.4v1.8M10 15.8v1.8M17.6 10h-1.8M4.2 10H2.4M15.4 4.6l-1.3 1.3M5.9 14.1l-1.3 1.3M15.4 15.4l-1.3-1.3M5.9 5.9 4.6 4.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function IconNutrients({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M16.2 3.8c-4.6-.6-8 1-9.7 3.9-1.2 2-.9 4.4.6 5.8 2-2.9 4.3-4.7 7.1-5.8-2.6 1.7-4.6 4-5.7 7.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4.6 16.4c.4-1.4.9-2.6 1.5-3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function IconThermometer({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M8.2 11.4V5a1.8 1.8 0 1 1 3.6 0v6.4a3.6 3.6 0 1 1-3.6 0Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M10 8.4v5.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function IconHumidity({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M13.4 2.8c2 2.1 3.1 3.8 3.1 5.3a3.1 3.1 0 1 1-6.2 0c0-1.5 1-3.2 3.1-5.3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M2.8 12.6c.9-.85 1.8-.85 2.7 0s1.8.85 2.7 0 1.8-.85 2.7 0M2.8 16.2c.9-.85 1.8-.85 2.7 0s1.8.85 2.7 0 1.8-.85 2.7 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function IconBox({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M10 2.6 3.4 5.8v8.4L10 17.4l6.6-3.2V5.8L10 2.6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M3.4 5.8 10 9l6.6-3.2M10 9v8.4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

export function IconMail({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <rect x="2.6" y="4.4" width="14.8" height="11.2" rx="2.4" stroke="currentColor" strokeWidth="1.5" />
      <path d="m3.6 6.2 5.5 4a1.5 1.5 0 0 0 1.8 0l5.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconDash({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path d="M5.5 10h9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

export function IconCheck({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="m5 10.4 3.3 3.2L15 6.8"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconPlusMinus({ className = '', open = false }: IconProps & { open?: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path d="M4.6 10h10.8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path
        d="M10 4.6v10.8"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        className={`origin-center transition duration-300 ease-out ${open ? 'scale-y-0 opacity-0' : 'scale-y-100 opacity-100'}`}
      />
    </svg>
  )
}
