import { getUsStatesOptionsAction } from '@/actions'
import { AsyncSelect, FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../shared'

const StateSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel className="text-[12px]">State</FormFieldLabel>
      <AsyncSelect
        field="stateId"
        fetchOptions={getUsStatesOptionsAction}
        buttonClassName="flex-1 h-6"
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { StateSelect }
