'use client'

import { Flex } from '@radix-ui/themes'
import { getUsStatesOptionsAction } from '@/actions'
import {
  AsyncSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'

const StateSelect = () => {
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
        />
      </Flex>
      <FormFieldError name="stateId" />
    </FormFieldContainer>
  )
}

export { StateSelect }
