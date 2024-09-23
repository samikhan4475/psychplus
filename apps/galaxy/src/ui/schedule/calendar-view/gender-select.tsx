import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const GenderSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel className="text-[12px]">Gender</FormFieldLabel>
      <CodesetSelect name="gender" codeset={CODESETS.Gender} size="1" />
    </FormFieldContainer>
  )
}

export { GenderSelect }
