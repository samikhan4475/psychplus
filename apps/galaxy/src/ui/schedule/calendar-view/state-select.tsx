import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from './form-field-container'

const StateSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="text-[12px]">State</FormFieldLabel>
      <CodesetSelect placeholder='Select State' name="usState" codeset={CODESETS.UsStates} size="1" />
    </FormFieldContainer>
  )
}

export { StateSelect }
