// Tipos para la aplicación Luxia Web
import type { Locale } from '@/middleware'
import type { DictionaryKeys } from '@/lib/i18n/dictionaries'

// Google Analytics
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: {
        [key: string]: any;
        page_title?: string;
        page_location?: string;
        event_category?: string;
        event_label?: string;
        value?: number;
        source?: string;
        button_text?: string;
        company_size?: string;
      }
    ) => void;
    dataLayer: any[];
  }
}

// Configuración del sitio
export interface SiteConfig {
  hero: {
    mainTitle: string;
    subtitle: string;
    primaryCTA: string;
    secondaryCTA: string;
    benefits: string[];
    metrics: Metric[];
  };
  navigation: {
    links: NavigationLink[];
  };
  tracking: {
    googleAnalytics: string;
    events: {
      heroCtaClick: string;
      appointmentBooked: string;
      demoViewed: string;
      contactFormSubmit: string;
    };
  };
}

// Métricas del Hero
export interface Metric {
  value: string;
  label: string;
  description: string;
  source: string;
}

// Links de navegación
export interface NavigationLink {
  href: string;
  label: string;
}

// Eventos de Analytics
export interface TrackingEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  source?: string;
  button_text?: string;
  company_size?: string;
  [key: string]: any;
}

// Props de componentes con i18n
export interface BaseComponentProps {
  locale: Locale;
  dictionary: DictionaryKeys;
}

export interface MetricCardProps {
  metric: Metric;
  delay: number;
  isVisible: boolean;
  onClick?: () => void;
  showIndicator?: boolean;
  currentIndex?: number;
  totalMetrics?: number;
}

export interface MetricInfoModalProps {
  metric: Metric;
  isOpen: boolean;
  onClose: () => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError?: () => void }>;
}

// Tipos para formularios
export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  companySize: string;
  message: string;
  source?: string;
}

// Performance metrics
export interface WebVitals {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

// Scroll tracking
export interface ScrollDepthEvent {
  percentage: number;
  timestamp: number;
  url: string;
}

// User session
export interface UserSession {
  sessionId: string;
  startTime: number;
  pageViews: number;
  events: TrackingEvent[];
}