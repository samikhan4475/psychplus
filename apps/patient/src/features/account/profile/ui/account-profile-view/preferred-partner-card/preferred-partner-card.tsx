import { FeatureCard } from '@/components-v2'
import { PreferredPartnerTable } from './preferred-partner-table.server.tsx'

const PreferredPartnerCard = () => {
  return (
    <FeatureCard title="Preferred Partner" contentClassName="gap-3">
      <PreferredPartnerTable />
    </FeatureCard>
  )
}

export { PreferredPartnerCard }
