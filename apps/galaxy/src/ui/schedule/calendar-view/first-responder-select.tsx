import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../shared'

const FirstResponderSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel className="text-[12px]">First Responder</FormFieldLabel>
      <CodesetSelect
        name="firstResponder"
        className='flex-1'
        codeset={CODESETS.FirstResponder}
        size="1"
      />
    </FormFieldContainer>
  )
}

export { FirstResponderSelect }
