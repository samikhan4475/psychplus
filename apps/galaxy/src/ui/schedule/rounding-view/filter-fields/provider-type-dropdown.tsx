'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { useFiltersContext } from '../../context'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const ProviderTypeDropdown = () => {
  const { filters } = useFiltersContext()
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const options = useCodesetOptions(CODESETS.ProviderType, undefined, [
    CODE_NOT_SET,
  ])
  if (!filters.includes(SchedulerFilters.ProviderType)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Provider Type</FieldLabel>
      <Flex className="flex-1">
        <MultiSelectField
          options={options}
          defaultValues={form.watch('providerTypes')}
          onChange={(values) => {
            form.setValue('providerTypes', values, { shouldDirty: true })
          }}
          className="flex-1"
        />
      </Flex>
    </FormFieldContainer>
  )
}

export { ProviderTypeDropdown }
