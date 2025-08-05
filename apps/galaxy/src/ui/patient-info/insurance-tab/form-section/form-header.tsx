'use client'

import { Flex } from '@radix-ui/themes'
import { FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { Insurance } from '@/types'
import { CheckEligibilityButton } from './check-eligibility-button'
import HistoryButton from './history-button'
import { SaveButton } from './save-button'
import StatusDropdown from './status-dropdown'

interface FormHeaderProps {
  insurance?: Insurance
  patientId: string
  disabled?: boolean
}

const FormHeader = ({ insurance, patientId, disabled }: FormHeaderProps) => {
  const isEligibilityFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr15134CheckEligibility,
  )
  return (
    <Flex className="w-full justify-end" gap="2">
      {isEligibilityFeatureFlagEnabled && <CheckEligibilityButton />}
      <StatusDropdown />
      <HistoryButton
        insurance={insurance}
        disabled={disabled || !insurance}
        patientId={patientId}
        policyId={insurance?.id ?? ''}
      />
      <SaveButton disabled={disabled} />
    </Flex>
  )
}

export { FormHeader }
