'use client'

import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const NextVisitSelect = () => {
  const options = useCodesetOptions(CODESETS.QueryByNextDays)
  return (
    <FormFieldContainer className="flex-1 flex-row gap-1">
      <FormFieldLabel className="!text-1">Next Visit</FormFieldLabel>
      <DropdownSelect field="nextVisit" options={options} placeholder="Days" />
    </FormFieldContainer>
  )
}

export { NextVisitSelect }
