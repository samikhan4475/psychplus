'use client'

import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { SelectOptionType } from '@/types'
import { useFiltersContext } from '../../context'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const SecondaryInsuranceDropdown = ({
  options,
  loading,
}: {
  options: SelectOptionType[]
  loading: boolean
}) => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.SecondaryInsurance)) return null

  return (
    <FormFieldContainer className="h-full">
      <FieldLabel>Secondary Insurance</FieldLabel>
      <MultiSelectField
        defaultValues={form.watch('secondaryInsuranceNames')}
        options={options}
        className="flex-1"
        onChange={(values) => {
          form.setValue('secondaryInsuranceNames', values, {
            shouldDirty: true,
          })
        }}
        menuClassName="w-[155px]"
        loading={loading}
      />
    </FormFieldContainer>
  )
}

export { SecondaryInsuranceDropdown }
