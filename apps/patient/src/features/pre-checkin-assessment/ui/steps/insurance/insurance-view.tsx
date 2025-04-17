import { useEffect } from 'react'
import { GOOGLE_MAPS_API_KEY } from '@psychplus-v2/env'
import { FeatureCard } from '@/components-v2'
import { useProfileStore } from '@/features/account/profile/store'
import { Insurance, InsurancePayer } from '@/features/billing/payments/types'
import { InsuranceForms } from '@/features/billing/payments/ui/insurance-card/insurance-forms'
import { useStore } from '@/features/pre-checkin-assessment/store'
import { GooglePlacesContextProvider } from '@/providers'

const InsuranceView = ({
  insurancePayers,
  patientInsurances,
}: {
  insurancePayers: InsurancePayer[]
  patientInsurances: Insurance
}) => {
  const { isSaveButtonPressed, save } = useStore()
  const patientId = useProfileStore((state) => state.profile.id)

  useEffect(() => {
    if (isSaveButtonPressed)
      save({ isTabCompleted: patientInsurances?.policies?.length > 0, patientId })
  }, [isSaveButtonPressed])

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
