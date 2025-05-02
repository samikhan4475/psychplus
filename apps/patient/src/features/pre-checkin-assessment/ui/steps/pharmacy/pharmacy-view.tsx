'use client'

import React, { useEffect } from 'react'
import { FeatureCard, FeatureContainer } from '@/components-v2'
import { useProfileStore } from '@/features/account/profile/store'
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
  const patientId = useProfileStore((state) => state.profile.id)

  useEffect(() => {
    if (isSaveButtonPressed) save({ patientId })
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
