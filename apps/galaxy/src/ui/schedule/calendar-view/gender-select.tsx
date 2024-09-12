import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from './form-field-container'

const GenderSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="text-[12px]">Gender</FormFieldLabel>
      <CodesetSelect name="gender" codeset={CODESETS.Gender} size="1" />
    </FormFieldContainer>
  )
}

export { GenderSelect }
