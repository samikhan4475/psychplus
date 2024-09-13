import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const ReligionSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="!text-1">Religion</FormFieldLabel>
      <CodesetSelect name="religion" codeset={CODESETS.Religion} size="1" />
    </FormFieldContainer>
  )
}

export { ReligionSelect }
