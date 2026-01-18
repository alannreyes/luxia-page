import EnterpriseLayout from '@/components/EnterpriseLayout'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function ServicesLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params
  const locale = resolvedParams.locale as 'es' | 'en'

  return (
    <EnterpriseLayout locale={locale} section="services">
      {children}
    </EnterpriseLayout>
  )
}
