'use client'

import { Flex } from '@radix-ui/themes'
import { FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { CurrentPharmaciesTable } from './current-pharmacies-table'
import { PharmacyFilterForm } from './filter-form'
import { PharmacyHeader } from './pharmacy-header'

interface PharmacyWidgetProps {
  patientId: string
}

const PharmacyWidget = ({ patientId }: PharmacyWidgetProps) => {
  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr8973EnableDawMedicationApi,
  )
  return (
    <Flex direction="column" width="100%" gap="1">
      <PharmacyHeader />
      {isFeatureFlagEnabled && <PharmacyFilterForm patientId={patientId} />}
      <CurrentPharmaciesTable
        patientId={patientId}
        isFeatureFlagEnabled={isFeatureFlagEnabled}
      />
    </Flex>
  )
}

export { PharmacyWidget }
