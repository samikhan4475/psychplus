import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from './form-field-container'

const FirstResponderSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="text-[12px]">First Responder</FormFieldLabel>
      <CodesetSelect
        name="firstResponder"
        codeset={CODESETS.FirstResponder}
        size="1"
      />
    </FormFieldContainer>
  )
}

export { FirstResponderSelect }
