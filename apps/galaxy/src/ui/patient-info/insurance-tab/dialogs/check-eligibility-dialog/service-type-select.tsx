'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const ServiceTypeSelect = () => {
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel required>Service Type</FormFieldLabel>
      <CodesetSelect
        size="1"
        name="serviceType"
        codeset={CODESETS.BillingMedicalServiceType}
      />
      <FormFieldError name="serviceType" />
    </FormFieldContainer>
  )
}
export { ServiceTypeSelect }
