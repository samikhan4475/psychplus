import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const GenderPronounSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="!text-1">Pronoun</FormFieldLabel>
      <CodesetSelect
        name="genderPronoun"
        codeset={CODESETS.GenderPronoun}
        size="1"
      />
    </FormFieldContainer>
  )
}

export { GenderPronounSelect }
