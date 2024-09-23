import { CodesetSelect, FormFieldLabel, FormFieldContainer } from '@/components'
import { CODESETS } from '@/constants'

const FirstResponderSelect = () => {
  return (
    <FormFieldContainer>
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
