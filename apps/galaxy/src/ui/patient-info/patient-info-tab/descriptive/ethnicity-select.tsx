import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import {
  CODE_ETHNICITY,
  CODESETS,
  ETHNICITIES_GROUPING_CODES,
} from '@/constants'

const EthnicitySelect = () => {
  return (
    <FormFieldContainer className="min-w-96 w-auto">
      <FormFieldLabel className="!text-1">Ethnicity</FormFieldLabel>
      <CodesetSelect
        name="ethnicity"
        codeset={CODESETS.RaceAndEthnicity}
        groupingCodes={ETHNICITIES_GROUPING_CODES}
        size="1"
        exclude={[CODE_ETHNICITY]}
      />
    </FormFieldContainer>
  )
}

export { EthnicitySelect }
