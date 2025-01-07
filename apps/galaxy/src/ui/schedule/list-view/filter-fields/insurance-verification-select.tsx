'use client'

import { useMemo } from 'react'
import { SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { useFiltersContext } from '../../context'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const InsuranceVerificationSelect = () => {
  const { filters } = useFiltersContext()
  const codes = useCodesetCodes(CODESETS.BillingVerificationStatus)
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
          label: item.display,
          value: item.value,
        })),
    [codes],
  )

  if (!filters.includes(SchedulerFilters.InsVerification)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Ins Verification</FieldLabel>
      <SelectInput
        field="patientInsuranceVerificationStatus"
        placeholder="Select"
        options={options}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { InsuranceVerificationSelect }
