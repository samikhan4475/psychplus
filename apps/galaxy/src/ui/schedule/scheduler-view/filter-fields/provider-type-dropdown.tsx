'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { EXCLUDED_PROVIDER_TYPES } from '../../constants'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchemaType } from '../filter-actions-group'

const ProviderTypeDropdown = () => {
  const form = useFormContext<SchemaType>()
  const options = useCodesetOptions(
    CODESETS.ProviderType,
    '',
    EXCLUDED_PROVIDER_TYPES,
  )

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
