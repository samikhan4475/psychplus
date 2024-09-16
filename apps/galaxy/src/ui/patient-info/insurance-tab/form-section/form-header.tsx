'use client'

import { Flex } from '@radix-ui/themes'
import { AddAuthButton } from './add-auth-button'
import { EligibilityCheckButton } from './eligibility-check-button'
import HistoryButton from './history-button'
import { RemoveButton } from './remove-button'
import { SaveButton } from './save-button'
import StatusDropdown from './status-dropdown'
import { Insurance } from '../types'

interface FormHeaderProps {
    insurance? :Insurance
}

const FormHeader = ({insurance}:FormHeaderProps) => {
  return (
    <Flex className="w-full justify-end" gap="2">
      <AddAuthButton />
      <StatusDropdown />
      <EligibilityCheckButton />
      <HistoryButton />
      <RemoveButton insurance={insurance}/>
      <SaveButton />
    </Flex>
  )
}

export { FormHeader }
