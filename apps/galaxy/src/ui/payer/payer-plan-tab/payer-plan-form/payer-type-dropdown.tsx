import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const PayerTypeSelect = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>Payer Type</FormFieldLabel>
      <CodesetSelect
        name="payerType"
        codeset={CODESETS.PayerType}
        size="1"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { PayerTypeSelect }
