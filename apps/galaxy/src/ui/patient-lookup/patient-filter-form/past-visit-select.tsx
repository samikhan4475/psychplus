'use client'

import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const PastVisitSelect = () => {
  const options = useCodesetOptions(CODESETS.QueryByLastDays)
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Past Visit</FormFieldLabel>
      <DropdownSelect
        field="visitHistoryPastDays"
        options={options}
        placeholder="Days"
      />
    </FormFieldContainer>
  )
}

export { PastVisitSelect }
