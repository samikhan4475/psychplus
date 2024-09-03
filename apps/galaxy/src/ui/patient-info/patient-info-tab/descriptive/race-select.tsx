import {
  CodesetGroupMultiSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODE_RACE, CODESETS, RACES_GROUPING_CODES } from '@/constants'

const RaceSelect = () => {
  return (
    <FormFieldContainer className="min-w-96 w-auto">
      <FormFieldLabel required>Race</FormFieldLabel>
      <CodesetGroupMultiSelect
        name="races"
        codeset={CODESETS.RaceAndEthnicity}
        groupingCodes={RACES_GROUPING_CODES}
        exclude={[CODE_RACE]}
      />
    </FormFieldContainer>
  )
}

export { RaceSelect }
