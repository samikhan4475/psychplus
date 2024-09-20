import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { fieldName } from './utils'

interface UsStateSelectProps {
  required?: boolean
  prefix?: string
}
const UsStateSelect = ({ prefix, required = true }: UsStateSelectProps) => {
  const name = fieldName('state', prefix)

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="!text-1" required={required}>
        State
      </FormFieldLabel>
      <CodesetSelect name={name} codeset={CODESETS.UsStates} size="1" />
      <FormFieldError name={name} />
    </FormFieldContainer>
  )
}

export { UsStateSelect }
