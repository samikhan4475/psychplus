'use client'

import { useFormContext } from 'react-hook-form'
import { CodesetSelect, FormFieldContainer } from '@/components'
import { CODESETS } from '@/constants'
import { QueryByNextDays } from '../types'
import { PatientLookUpSchemaType } from './schema'

const PastVisitStatusSelect = () => {
  const { watch } = useFormContext<PatientLookUpSchemaType>()
  const visitHistoryPastDays = watch('visitHistoryPastDays')

  const isDisabled =
    !visitHistoryPastDays ||
    visitHistoryPastDays === QueryByNextDays.Disregard ||
    visitHistoryPastDays === QueryByNextDays.NoVisits

  return (
    <FormFieldContainer className="flex-row gap-1">
      <CodesetSelect
        size="1"
        name="visitHistoryPastStatus"
        codeset={CODESETS.AppointmentStatus}
        className="flex-1"
        placeholder="Status"
        disabled={isDisabled}
      />
    </FormFieldContainer>
  )
}

export { PastVisitStatusSelect }
