'use client'

import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { SelectOptionType } from '@/types'
import { useFiltersContext } from '../../context'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const SecondaryInsuranceDropdown = ({
  loading,
  options,
}: {
  loading: boolean
  options: SelectOptionType[]
}) => {
  const { filters } = useFiltersContext()
  const form = useFormContext<BookedAppointmentsSchemaType>()
  if (!filters.includes(SchedulerFilters.SecondaryInsurance)) return null

  return (
    <FormFieldContainer className="h-full">
      <FieldLabel>Secondary Insurance</FieldLabel>
      <MultiSelectField
        className="flex-1"
        defaultValues={form.watch('secondaryInsuranceNames')}
        options={options}
        onChange={(values) => {
          form.setValue('secondaryInsuranceNames', values, {
            shouldDirty: true,
          })
        }}
        loading={loading}
        menuClassName="w-[155px]"
      />
    </FormFieldContainer>
  )
}

export { SecondaryInsuranceDropdown }
