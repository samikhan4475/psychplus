
'use client'

import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const VisitHxSelect = () => {
  const options = useCodesetOptions(CODESETS.QueryByLastDays)
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Visit Hx</FormFieldLabel>
      <DropdownSelect
        field="visitHx"
        options={options}
        placeholder="Days"
      />
    </FormFieldContainer>
  )
}

export { VisitHxSelect }
