'use client'

import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const NextVisitSelect = () => {
  const options = useCodesetOptions(CODESETS.QueryByNextDays)
  const statusOptions = useCodesetOptions(CODESETS.AppointmentStatus)

  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Next Visit</FormFieldLabel>
      <DropdownSelect
        field="nextVisitStatus"
        options={statusOptions}
        className="flex-1 min-w-[72px] h-6"
        placeholder='Status'
      />
      <DropdownSelect
        field="futureVisitsByDays"
        options={options}
        className="flex-1 min-w-[72px] h-6"
        placeholder="Days"
      />
    </FormFieldContainer>
  )
}

export { NextVisitSelect }
