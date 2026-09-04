import LogoMark from './LogoMark'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showIcon?: boolean
  className?: string
  variant?: 'default' | 'white' | 'dark'
}

const markSize = {
  sm: 'w-7 h-7',
  md: 'w-9 h-9',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
}

const textSize = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-3xl',
  xl: 'text-4xl',
}

// lux = tinta/blanco según variante · IA = acento
const wordTone = {
  default: { lux: 'var(--ed-ink)', ia: 'var(--ed-accent)' },
  white: { lux: '#ffffff', ia: '#8fa8ff' },
  dark: { lux: 'var(--ed-ink)', ia: 'var(--ed-accent)' },
}

export default function Logo({ size = 'md', showIcon = true, className = '', variant = 'default' }: LogoProps) {
  const tone = variant === 'white' ? 'white' : 'color'
  const w = wordTone[variant]
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {showIcon && <LogoMark tone={tone} className={`${markSize[size]} flex-none`} />}
      <span className={`font-editorial font-extrabold tracking-[-0.03em] leading-none ${textSize[size]}`}>
        <span style={{ color: w.lux }}>lux</span><span style={{ color: w.ia }}>IA</span>
      </span>
    </div>
  )
}

export const LogoText = ({ size = 'md', className = '', variant = 'default' }: Omit<LogoProps, 'showIcon'>) => {
  const w = wordTone[variant]
  return (
    <span className={`font-editorial font-extrabold tracking-[-0.03em] ${textSize[size]} ${className}`}>
      <span style={{ color: w.lux }}>lux</span><span style={{ color: w.ia }}>IA</span>
    </span>
  )
}

export const LogoIcon = ({ size = 'md', className = '', variant = 'default' }: Omit<LogoProps, 'showIcon'>) => (
  <LogoMark tone={variant === 'white' ? 'white' : 'color'} className={`${markSize[size]} ${className}`} />
)
