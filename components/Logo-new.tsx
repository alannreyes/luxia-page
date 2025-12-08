import { siteConfig } from '@/lib/config'
import Image from 'next/image'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showIcon?: boolean
  className?: string
  variant?: 'default' | 'white' | 'dark'
}

const sizeClasses = {
  sm: 'text-xl',     
  md: 'text-3xl',    
  lg: 'text-4xl',    
  xl: 'text-5xl'     
}

const iconSizes = {
  sm: { width: 24, height: 24 },     
  md: { width: 32, height: 32 },     
  lg: { width: 48, height: 48 },   
  xl: { width: 64, height: 64 }    
}

const variantClasses = {
  default: 'text-slate-900 font-black',  
  white: 'text-white font-black',
  dark: 'text-luxia-primary font-black'
}

export default function Logo({ 
  size = 'md', 
  showIcon = true, 
  className = '',
  variant = 'default'
}: LogoProps) {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {showIcon && (
        <Image
          src="/logo.png"
          alt="Luxia Logo"
          width={iconSizes[size].width}
          height={iconSizes[size].height}
          className="object-contain"
          priority
        />
      )}
      <div className={`${sizeClasses[size]} ${variantClasses[variant]} tracking-tight`}>
        {siteConfig.navigation.logo}
      </div>
    </div>
  )
}

// Exportar también como componente individual para casos específicos
export const LogoText = ({ size = 'md', className = '', variant = 'default' }: Omit<LogoProps, 'showIcon'>) => (
  <div className={`${sizeClasses[size]} font-bold ${variantClasses[variant]} ${className}`}>
    {siteConfig.navigation.logo}
  </div>
)

export const LogoIcon = ({ size = 'md', className = '' }: Omit<LogoProps, 'showIcon' | 'variant'>) => (
  <Image
    src="/logo.png"
    alt="Luxia Logo"
    width={iconSizes[size].width}
    height={iconSizes[size].height}
    className={`object-contain ${className}`}
    priority
  />
)