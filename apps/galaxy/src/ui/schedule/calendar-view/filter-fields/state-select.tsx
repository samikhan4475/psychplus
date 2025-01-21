import { useCallback } from 'react'
import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  AsyncSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CalenderViewSchemaType } from '../../types'
import { getUsStatesOptionsAction } from '../../client-actions'

const StateSelect = () => {
  const form = useFormContext<CalenderViewSchemaType>()
  const fetchData = useCallback(() => getUsStatesOptionsAction(), [])

  return (
    <FormFieldContainer className="flex-1 gap-x-1">
      <Flex className="flex-1 gap-x-1" align="center">
        <FormFieldLabel className="h-6" required>
          State
        </FormFieldLabel>
        <AsyncSelect
          field="stateIds"
          fetchOptions={fetchData}
          buttonClassName="flex-1 h-6"
          className="flex-1"
          onValueChange={(value) => {
            form.setValue('stateIds', value, { shouldDirty: true })
            form.setValue('locationId', '')
            form.setValue('serviceIds', [])
          }}
        />
      </Flex>
      <FormFieldError name="stateIds" />
    </FormFieldContainer>
  )
}

export { StateSelect }
