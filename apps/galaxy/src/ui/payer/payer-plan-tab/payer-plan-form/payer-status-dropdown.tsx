import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const PayerStatusSelect = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>Payer Status</FormFieldLabel>
      <CodesetSelect
        name="payerStatus"
        codeset={CODESETS.RecordStatus}
        size="1"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { PayerStatusSelect }
