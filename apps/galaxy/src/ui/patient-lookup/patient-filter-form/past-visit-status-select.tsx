'use client'

import { useFormContext } from 'react-hook-form'
import { DropdownSelect, FormFieldContainer } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { QueryByNextDays } from '../types'
import { PatientLookUpSchemaType } from './schema'

const PastVisitStatusSelect = () => {
  const { watch } = useFormContext<PatientLookUpSchemaType>()
  const visitHistoryPastDays = watch('visitHistoryPastDays')
  const options = useCodesetOptions(CODESETS.AppointmentStatus)
  const isDisabled =
    !visitHistoryPastDays ||
    visitHistoryPastDays === QueryByNextDays.Disregard ||
    visitHistoryPastDays === QueryByNextDays.NoVisits

  return (
    <FormFieldContainer className="flex-row gap-1">
      <DropdownSelect
        field="pastVisitStatus"
        options={options}
        disabled={isDisabled}
      />
    </FormFieldContainer>
  )
}

export { PastVisitStatusSelect }
