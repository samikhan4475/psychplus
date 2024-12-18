'use client'

import { Flex } from '@radix-ui/themes'
import { Insurance } from '@/types'
import HistoryButton from './history-button'
import { RemoveButton } from './remove-button'
import { SaveButton } from './save-button'
import StatusDropdown from './status-dropdown'

interface FormHeaderProps {
  insurance?: Insurance
  patientId: string
  disabled?: boolean
}

const FormHeader = ({ insurance, patientId, disabled }: FormHeaderProps) => {
  return (
    <Flex className="w-full justify-end" gap="2">
      <StatusDropdown />
      <HistoryButton
        insurance={insurance}
        disabled={disabled || !insurance}
        patientId={patientId}
        policyId={insurance?.id ?? ''}
      />
      <RemoveButton
        insurance={insurance}
        patientId={patientId}
        disabled={disabled}
      />
      <SaveButton disabled={disabled} />
    </Flex>
  )
}

export { FormHeader }
