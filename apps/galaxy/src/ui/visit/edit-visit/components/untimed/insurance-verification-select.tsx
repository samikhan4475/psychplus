import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const InsuranceVerificationSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>VIS</FormFieldLabel>
      <CodesetSelect
        name="insuranceVerificationStatus"
        codeset={CODESETS.VerificationStatus}
        size="1"
        className="flex-1"
      />
      <FormFieldError name={'insuranceVerificationStatus'} />
    </FormFieldContainer>
  )
}

export { InsuranceVerificationSelect }
