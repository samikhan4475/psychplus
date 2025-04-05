'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { EXCLUDED_PROVIDER_TYPES } from '../../constants'
import { useFiltersContext } from '../../context'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const ProviderTypeDropdown = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const { filters } = useFiltersContext()
  const options = useCodesetOptions(
    CODESETS.ProviderType,
    undefined,
    EXCLUDED_PROVIDER_TYPES,
  )
  if (!filters.includes(SchedulerFilters.ProviderType)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Provider Type</FieldLabel>
      <Flex className="flex-1">
        <MultiSelectField
          defaultValues={form.watch('providerTypes')}
          options={options}
          className="flex-1"
          onChange={(values) => {
            form.setValue('providerTypes', values, { shouldDirty: true })
          }}
        />
      </Flex>
    </FormFieldContainer>
  )
}

export { ProviderTypeDropdown }
