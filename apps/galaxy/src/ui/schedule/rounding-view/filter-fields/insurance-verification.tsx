'use client'

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { useFiltersContext } from '../../context'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const InsuranceVerificationSelect = () => {
  const { filters } = useFiltersContext()
  const codes = useCodesetCodes(CODESETS.BillingVerificationStatus)
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const options = useMemo(
    () =>
      codes
        .toSorted((a, b) => {
          const aValue =
            a.attributes?.find((attr) => attr.name === 'SortValue')?.value ?? 0
          const bValue =
            b.attributes?.find((attr) => attr.name === 'SortValue')?.value ?? 0
          return +aValue - +bValue
        })
        .map((item) => ({
          value: item.value,
          label: item.display,
        })),
    [codes],
  )

  if (!filters.includes(SchedulerFilters.InsVerification)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Ins Verification</FieldLabel>
      <MultiSelectField
        defaultValues={form.watch('patientInsuranceVerificationStatuses')}
        className="flex-1"
        options={options}
        onChange={(values) => {
          form.setValue('patientInsuranceVerificationStatuses', values, {
            shouldDirty: true,
          })
        }}
      />
    </FormFieldContainer>
  )
}

export { InsuranceVerificationSelect }
