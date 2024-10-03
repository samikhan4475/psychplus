'use client'

import { Flex } from '@radix-ui/themes'
import { AddAuthButton } from './add-auth-button'
import { EligibilityCheckButton } from './eligibility-check-button'
import HistoryButton from './history-button'
import { RemoveButton } from './remove-button'
import { SaveButton } from './save-button'
import StatusDropdown from './status-dropdown'
import { Insurance } from '@/types'

interface FormHeaderProps {
    insurance? :Insurance
    patientId:string
    disabled?:boolean
}


const FormHeader = ({insurance,patientId,disabled}:FormHeaderProps) => {
  return (
    <Flex className="w-full justify-end" gap="2">
      <AddAuthButton disabled={disabled}  />
      <StatusDropdown />
      <EligibilityCheckButton disabled={disabled}  />
      <HistoryButton disabled={disabled}  />
      <RemoveButton insurance={insurance} patientId={patientId} disabled={disabled}/>
      <SaveButton disabled={disabled} />
    </Flex>
  )
}

export { FormHeader }
