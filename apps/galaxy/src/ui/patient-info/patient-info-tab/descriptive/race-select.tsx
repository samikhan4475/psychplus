import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODE_RACE, CODESETS, ETHNICITIES_GROUPING_CODES } from '@/constants'

const RaceSelect = () => {
  return (
    <FormFieldContainer className="min-w-96 w-auto">
      <FormFieldLabel className="!text-1">Race</FormFieldLabel>
      <CodesetSelect
        name="race"
        codeset={CODESETS.RaceAndEthnicity}
        groupingCodes={ETHNICITIES_GROUPING_CODES}
        size="1"
        exclude={[CODE_RACE]}
      />
    </FormFieldContainer>
  )
}

export { RaceSelect }
