import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const GenderOrientationSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="!text-1">Orientation</FormFieldLabel>
      <CodesetSelect
        name="genderOrientation"
        codeset={CODESETS.GenderOrientation}
        size="1"
      />
    </FormFieldContainer>
  )
}

export { GenderOrientationSelect }
