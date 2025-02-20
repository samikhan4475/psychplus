'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchemaType } from '../filter-actions-group'

const ProviderTypeDropdown = () => {
  const form = useFormContext<SchemaType>()
  const options = useCodesetOptions(CODESETS.ProviderType, '', [CODE_NOT_SET])

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
