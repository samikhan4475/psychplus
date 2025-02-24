import { FeatureCard } from '@/components-v2'
import { PatientPharmacy } from '@/features/pharmacy/types'
import { PharmacyForms } from './pharmacy-forms'

interface InsuranceCardProps {
  pharmacies: PatientPharmacy[]
  isDawSystemFeatureFlagEnabled?: boolean
}

const PharmacyCard = ({
  pharmacies,
  isDawSystemFeatureFlagEnabled,
}: InsuranceCardProps) => {
  return (
    <FeatureCard title="Pharmacy" contentClassName="gap-3 relative">
      <PharmacyForms
        pharmacies={pharmacies}
        isDawSystemFeatureFlagEnabled={isDawSystemFeatureFlagEnabled}
      />
    </FeatureCard>
  )
}

export { PharmacyCard }
