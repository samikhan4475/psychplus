import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const PayerStatus = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Payer Status</FormFieldLabel>
      <CodesetSelect
        name="payerStatus"
        codeset={CODESETS.RecordStatus}
        size="1"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { PayerStatus }
