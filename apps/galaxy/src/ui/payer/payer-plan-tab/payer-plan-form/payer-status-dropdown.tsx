import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const PayerStatusSelect = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>Plan Status</FormFieldLabel>
      <CodesetSelect
        name="payerStatus"
        codeset={CODESETS.RecordStatus}
        size="1"
        className="h-full flex-1"
        exclude={['Deleted','Archived']}

      />
      <FormFieldError name="payerStatus" />
    </FormFieldContainer>
  )
}

export { PayerStatusSelect }
