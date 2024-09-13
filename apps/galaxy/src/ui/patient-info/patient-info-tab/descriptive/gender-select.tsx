import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const GenderSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="!text-1">Gender</FormFieldLabel>
      <CodesetSelect name="gender" codeset={CODESETS.Gender} size="1" />
      <FormFieldError name="gender" />
    </FormFieldContainer>
  )
}

export { GenderSelect }
