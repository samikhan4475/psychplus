import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const PayerStatus = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Plan Status</FormFieldLabel>
      <CodesetSelect
        name="payerStatus"
        codeset={CODESETS.RecordStatus}
        size="1"
        className="h-full flex-1"
        exclude={['Deleted','Archived']}
      />
    </FormFieldContainer>
  )
}

export { PayerStatus }
