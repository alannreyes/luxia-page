'use client'
import { Sparkles } from 'lucide-react'
import { siteConfig } from '@/lib/config'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showIcon?: boolean
  className?: string
  variant?: 'default' | 'white' | 'dark'
}

const sizeClasses = {
  sm: 'text-lg',
  md: 'text-2xl', 
  lg: 'text-3xl',
  xl: 'text-4xl'
}

const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8', 
  xl: 'w-10 h-10'
}

const variantClasses = {
  default: 'gradient-text',
  white: 'text-white',
  dark: 'text-gray-900'
}

export default function Logo({ 
  size = 'md', 
  showIcon = true, 
  className = '',
  variant = 'default'
}: LogoProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {showIcon && (
        <Sparkles className={`${iconSizes[size]} ${variant === 'default' ? 'text-blue-600' : variant === 'white' ? 'text-white' : 'text-gray-900'}`} />
      )}
      <div className={`${sizeClasses[size]} font-bold ${variantClasses[variant]}`}>
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

export const LogoIcon = ({ size = 'md', className = '', variant = 'default' }: Omit<LogoProps, 'showIcon'>) => (
  <Sparkles className={`${iconSizes[size]} ${variant === 'default' ? 'text-blue-600' : variant === 'white' ? 'text-white' : 'text-gray-900'} ${className}`} />
) 