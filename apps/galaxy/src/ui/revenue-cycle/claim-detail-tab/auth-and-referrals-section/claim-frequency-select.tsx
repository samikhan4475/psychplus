import { CodesetSelect, FormFieldContainer, FormFieldError, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const ClaimFrequencySelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Claim Frequency Code</FormFieldLabel>
      <CodesetSelect
        name="claimFrequencyCode"
        codeset={CODESETS.ClaimFrequencyCode}
        size="1"
        className="h-full flex-1"
      />
      <FormFieldError name='claimFrequencyCode'/>
    </FormFieldContainer>
  )
}

export { ClaimFrequencySelect }
