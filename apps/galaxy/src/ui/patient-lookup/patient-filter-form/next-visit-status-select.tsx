'use client'

import { useFormContext } from 'react-hook-form'
import { CodesetSelect, FormFieldContainer } from '@/components'
import { CODESETS } from '@/constants'
import { QueryByNextDays } from '../types'
import { PatientLookUpSchemaType } from './schema'

const NextVisitStatusSelect = () => {
  const { watch } = useFormContext<PatientLookUpSchemaType>()

  const futureVisitsByDays = watch('futureVisitsByDays')

  const isDisabled =
    !futureVisitsByDays ||
    futureVisitsByDays === QueryByNextDays.Disregard ||
    futureVisitsByDays === QueryByNextDays.NoVisits

  return (
    <FormFieldContainer className="flex-row gap-1">
      <CodesetSelect
        codeset={CODESETS.AppointmentStatus}
        size="1"
        name="futureVisitsStatus"
        placeholder="Status"
        className="flex-1"
        disabled={isDisabled}
      />
    </FormFieldContainer>
  )
}

export { NextVisitStatusSelect }
