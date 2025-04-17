'use client'

import {
  FormFieldContainer,
  FormFieldLabel,
  SelectInput
} from '@/components'
import { OPTIONS } from './constants'

const GuardianSelect = () => {
  return (
    <FormFieldContainer className="flex-row gap-2">
      <FormFieldLabel className="!text-1">Guardian</FormFieldLabel>
      <SelectInput field="hasGuardian" options={OPTIONS} buttonClassName='min-w-[83px] h-6' />
    </FormFieldContainer>
  )
}

export { GuardianSelect }
