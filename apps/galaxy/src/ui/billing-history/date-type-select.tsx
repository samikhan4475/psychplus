'use client'

import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const DateTypeSelect = () => {
  const options = useCodesetOptions(CODESETS.ClaimFiltrationDateType)
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Date Type</FormFieldLabel>
      <DropdownSelect field="dateType" options={options} placeholder="Select" />
    </FormFieldContainer>
  )
}

export { DateTypeSelect }
