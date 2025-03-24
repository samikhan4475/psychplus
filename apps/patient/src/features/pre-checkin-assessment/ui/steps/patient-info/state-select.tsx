import { CODESETS } from '@psychplus-v2/constants'
import {
  CodesetFormSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components-v2'

const StateSelect = ({ name }: { name: string }) => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>State</FormFieldLabel>
      <CodesetFormSelect
        size="3"
        placeholder="Select state"
        className='outline-pp-gray-7 px-3'
        disabled
        name={name}
        codeset={CODESETS.UsStates}
      />
      <FormFieldError name={name} />
    </FormFieldContainer>
  )
}
export { StateSelect }
