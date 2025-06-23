'use client'
import React from 'react'
import type { ErrorBoundaryState, ErrorBoundaryProps } from '@/types'

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        stack: error.stack
      })
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error} resetError={() => this.setState({ hasError: false })} />
      }

      return <DefaultErrorFallback error={this.state.error} resetError={() => this.setState({ hasError: false })} />
    }

    return this.props.children
  }
}

// Componente de fallback por defecto
function DefaultErrorFallback({ error, resetError }: { error?: Error; resetError?: () => void }) {
  return (
    <div className="min-h-[400px] flex items-center justify-center bg-gray-50 rounded-lg p-8">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Algo salió mal
        </h2>
        <p className="text-gray-600 mb-4">
          Ha ocurrido un error inesperado. Nuestro equipo ha sido notificado automáticamente.
        </p>
        {process.env.NODE_ENV === 'development' && error && (
          <details className="text-left bg-red-50 p-4 rounded-lg mb-4">
            <summary className="font-mono text-sm text-red-700 cursor-pointer">
              Error técnico (desarrollo)
            </summary>
            <pre className="mt-2 text-xs text-red-600 overflow-auto">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
        <div className="flex gap-3 justify-center">
          <button
            onClick={resetError}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Intentar de nuevo
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Recargar página
          </button>
        </div>
      </div>
    </div>
  )
}

// Error Boundary específico para secciones críticas
export function HeroErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={({ resetError }) => (
      <div className="min-h-[600px] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <h1 className="text-4xl font-light text-gray-900 mb-4">luxIA</h1>
          <p className="text-gray-600 mb-6">
            Error al cargar la página principal. Por favor, recarga la página.
          </p>
          <button
            onClick={resetError}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    )}>
      {children}
    </ErrorBoundary>
  )
}

// Error Boundary para formularios
export function FormErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={() => (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700">
          Error al cargar el formulario. Por favor, contacta directamente a{' '}
          <a href="mailto:contacto@luxia.us" className="underline">
            contacto@luxia.us
          </a>
        </p>
      </div>
    )}>
      {children}
    </ErrorBoundary>
  )
}

export default ErrorBoundary