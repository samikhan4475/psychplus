'use client'

import { Flex } from '@radix-ui/themes'
import { FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { ImmunizationListWidget } from './immunization-list-widget/immunization-list-widget'

const ImmunizationListClientLoader = () => {
  const isFeatureFlagEnabledForImmunization = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr15803OncClinicalModules,
  )
  if (isFeatureFlagEnabledForImmunization) {
    return (
      <Flex direction="column" width="100%" gap="2">
        <ImmunizationListWidget />
      </Flex>
    )
  }
}

export { ImmunizationListClientLoader }
