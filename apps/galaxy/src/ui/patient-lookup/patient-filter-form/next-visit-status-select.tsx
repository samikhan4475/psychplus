'use client'

import { useFormContext } from 'react-hook-form'
import { DropdownSelect, FormFieldContainer } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { QueryByNextDays } from '../types'
import { PatientLookUpSchemaType } from './schema'

const NextVisitStatusSelect = () => {
  const { watch } = useFormContext<PatientLookUpSchemaType>()
  const options = useCodesetOptions(CODESETS.AppointmentStatus)
  const futureVisitsByDays = watch('futureVisitsByDays')

  const isDisabled =
    !futureVisitsByDays ||
    futureVisitsByDays === QueryByNextDays.Disregard ||
    futureVisitsByDays === QueryByNextDays.NoVisits

  return (
    <FormFieldContainer className="flex-row gap-1">
      <DropdownSelect
        field="nextVisitStatus"
        options={options}
        disabled={isDisabled}
      />
    </FormFieldContainer>
  )
}

export { NextVisitStatusSelect }
