'use client'

import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { SelectOptionType } from '@/types'
import { useFiltersContext } from '../context'
import { BookedAppointmentsSchemaType } from '../schema'
import { FieldLabel, FormFieldContainer } from '../shared'
import { SchedulerFilters } from '../types'

const PrimaryInsuranceDropdown = ({
  loading,
  options,
}: {
  loading: boolean
  options: SelectOptionType[]
}) => {
  const { filters } = useFiltersContext()
  const form = useFormContext<BookedAppointmentsSchemaType>()
  if (!filters.includes(SchedulerFilters.PrimaryInsurance)) return null

  return (
    <FormFieldContainer className="h-full">
      <FieldLabel>Primary Insurance</FieldLabel>
      <MultiSelectField
        defaultValues={form.watch('primaryInsuranceNames')}
        className="flex-1"
        options={options}
        onChange={(values) => {
          form.setValue('primaryInsuranceNames', values, { shouldDirty: true })
        }}
        menuClassName="w-[155px]"
        loading={loading}
      />
    </FormFieldContainer>
  )
}

export { PrimaryInsuranceDropdown }
