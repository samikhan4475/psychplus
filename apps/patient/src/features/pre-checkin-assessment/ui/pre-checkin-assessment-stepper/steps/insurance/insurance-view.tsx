import { GOOGLE_MAPS_API_KEY } from '@psychplus-v2/env'
import { FeatureCard } from '@/components-v2'
import { Insurance, InsurancePayer } from '@/features/billing/payments/types'
import { InsuranceForms } from '@/features/billing/payments/ui/insurance-card/insurance-forms'
import { GooglePlacesContextProvider } from '@/providers'

const InsuranceView = ({
  insurancePayers,
  patientInsurances,
}: {
  insurancePayers: InsurancePayer[]
  patientInsurances: Insurance[]
}) => {
  return (
    <GooglePlacesContextProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <FeatureCard
        title="Insurance on File"
        contentClassName="gap-3 relative"
        showTitleInsideCard
      >
        <InsuranceForms
          patientInsurances={patientInsurances}
          insurancePayers={insurancePayers}
        />
      </FeatureCard>
    </GooglePlacesContextProvider>
  )
}

export { InsuranceView }
