'use client'

import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const GenderSelect = () => {
  const options = useCodesetOptions(CODESETS.Gender)
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Gender</FormFieldLabel>
      <DropdownSelect field="gender" options={options} />
    </FormFieldContainer>
  )
}

export { GenderSelect }
