import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

interface UsStateSelectProps {
  required?: boolean
}
const UsStateSelect = ({ required = true }: UsStateSelectProps) => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="!text-1" required={required}>
        State
      </FormFieldLabel>
      <CodesetSelect name="state" codeset={CODESETS.UsStates} size="1" />
      <FormFieldError name="state" />
    </FormFieldContainer>
  )
}

export { UsStateSelect }
