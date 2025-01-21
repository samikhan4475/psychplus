'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  AsyncSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { getUsStatesOptionsAction } from '../../client-actions'
import { SchemaType } from '../filter-actions-group'

const StateSelect = () => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer className="flex-1 gap-x-1">
      <Flex className="flex-1 gap-x-1" align="center">
        <FormFieldLabel className="h-6" required>
          State
        </FormFieldLabel>
        <AsyncSelect
          field="stateId"
          placeholder="Select"
          fetchOptions={getUsStatesOptionsAction}
          buttonClassName="h-6 w-full"
          className="h-full flex-1"
          onValueChange={(value) => {
            form.setValue('stateId', value, { shouldDirty: true })
            form.setValue('locationIds', '')
            form.setValue('serviceIds', [])
          }}
        />
      </Flex>
      <FormFieldError name="stateId" />
    </FormFieldContainer>
  )
}

export { StateSelect }
