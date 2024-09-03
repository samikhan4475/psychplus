import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const ReligionSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Religion</FormFieldLabel>
      <CodesetSelect name="religion" codeset={CODESETS.Religion} size="1" />
    </FormFieldContainer>
  )
}

export { ReligionSelect }
