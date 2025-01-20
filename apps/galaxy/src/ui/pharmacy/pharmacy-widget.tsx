'use client'

import { Flex } from '@radix-ui/themes'
import { FeatureFlag } from '@/types/feature-flag'
import { CurrentPharmaciesTable } from './current-pharmacies-table'
import { PharmacyFilterForm } from './filter-form'
import { PharmacyHeader } from './pharmacy-header'

interface PharmacyWidgetProps {
  patientId: string
  featureFlags: FeatureFlag[]
}

const PharmacyWidget = ({ patientId, featureFlags }: PharmacyWidgetProps) => {
  return (
    <Flex direction="column" width="100%" gap="1">
      <PharmacyHeader featureFlags={featureFlags} />
      {!featureFlags?.[0]?.environments?.[0]?.isEnabledDefault && (
        <PharmacyFilterForm patientId={patientId} />
      )}
      <CurrentPharmaciesTable
        patientId={patientId}
        featureFlags={featureFlags}
      />
    </Flex>
  )
}

export { PharmacyWidget }
