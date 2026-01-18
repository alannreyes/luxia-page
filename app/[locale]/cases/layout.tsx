import EnterpriseLayout from '@/components/EnterpriseLayout'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function CasesLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params
  const locale = resolvedParams.locale as 'es' | 'en'

  return (
    <EnterpriseLayout locale={locale} section="cases">
      {children}
    </EnterpriseLayout>
  )
}
