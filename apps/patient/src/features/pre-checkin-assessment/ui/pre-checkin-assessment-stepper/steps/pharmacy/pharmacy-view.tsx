'user client'

import React, { useEffect } from 'react'
import { FeatureCard, FeatureContainer } from '@/components-v2'
import { type PatientPharmacy } from '@/features/pharmacy/types'
import { PharmacyForms } from '@/features/pharmacy/ui/pharmacy-card/pharmacy-forms'
import { useStore } from '@/features/pre-checkin-assessment/store'

const PharmacyView = ({
  pharmacies,
  isDawSystemFeatureFlagEnabled,
}: {
  pharmacies: PatientPharmacy[]
  isDawSystemFeatureFlagEnabled?: boolean
}) => {
  const { isSaveButtonPressed, save } = useStore()

  useEffect(() => {
    if (isSaveButtonPressed) save()
  }, [isSaveButtonPressed])

  return (
    <FeatureContainer>
      <FeatureCard
        title="Pharmacy"
        contentClassName="gap-3 relative"
        showTitleInsideCard
      >
        <PharmacyForms
          pharmacies={pharmacies}
          isDawSystemFeatureFlagEnabled={isDawSystemFeatureFlagEnabled}
        />
      </FeatureCard>
    </FeatureContainer>
  )
}

export { PharmacyView }
