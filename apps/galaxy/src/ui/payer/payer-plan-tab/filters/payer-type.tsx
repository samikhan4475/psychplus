import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const PayerType = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Payer Type</FormFieldLabel>
      <CodesetSelect
        name="payerType"
        codeset={CODESETS.PayerType}
        size="1"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { PayerType }
