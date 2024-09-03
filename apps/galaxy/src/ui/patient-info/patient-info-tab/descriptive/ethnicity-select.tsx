import {
  CodesetGroupMultiSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import {
  CODE_ETHNICITY,
  CODESETS,
  ETHNICITIES_GROUPING_CODES,
} from '@/constants'

const EthnicitySelect = () => {
  return (
    <FormFieldContainer className="min-w-96 w-auto">
      <FormFieldLabel required>Ethnicity</FormFieldLabel>
      <CodesetGroupMultiSelect
        name="ethnicities"
        codeset={CODESETS.RaceAndEthnicity}
        groupingCodes={ETHNICITIES_GROUPING_CODES}
        exclude={[CODE_ETHNICITY]}
      />
    </FormFieldContainer>
  )
}

export { EthnicitySelect }
