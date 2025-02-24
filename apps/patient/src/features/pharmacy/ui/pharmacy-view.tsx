import React from 'react'
import { Flex } from '@radix-ui/themes'
import { FeatureCard } from '@/components-v2'
import { PatientPharmacy } from '@/features/pharmacy/types'
import { PharmacyForms } from './pharmacy-card/pharmacy-forms'

type ViewPharmacyProps = {
  pharmacies: PatientPharmacy[]
  isDawSystemFeatureFlagEnabled?: boolean
}

const ViewPharmacy = ({
  pharmacies,
  isDawSystemFeatureFlagEnabled,
}: ViewPharmacyProps) => {
  return (
    <Flex direction="column" gap="5">
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
    </Flex>
  )
}

export { ViewPharmacy }
