import { CODESETS } from '@psychplus-v2/constants'
import {
  CodesetFormSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components-v2'

const StateSelect = ({ name }: { name: string }) => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>State</FormFieldLabel>
      <CodesetFormSelect
        size="3"
        placeholder="Select state"
        name={name}
        codeset={CODESETS.UsStates}
      />
    </FormFieldContainer>
  )
}
export { StateSelect }
