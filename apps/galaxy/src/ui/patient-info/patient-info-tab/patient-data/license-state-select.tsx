import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const LicenseStateSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="!text-1">Driving License State</FormFieldLabel>
      <CodesetSelect
        name="driversLicense.validIn"
        codeset={CODESETS.UsStates}
        size="1"
      />
    </FormFieldContainer>
  )
}

export { LicenseStateSelect }
