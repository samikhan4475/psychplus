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
          field="stateIds"
          fetchOptions={getUsStatesOptionsAction}
          buttonClassName="flex-1 h-6"
          className="flex-1"
        />
      </Flex>
      <FormFieldError name="stateIds" />
    </FormFieldContainer>
  )
}

export { StateSelect }
