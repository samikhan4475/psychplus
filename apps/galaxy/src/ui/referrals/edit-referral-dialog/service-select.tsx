'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const ServiceSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Service</FormFieldLabel>
      <CodesetSelect
        name="service"
        size="1"
        codeset={CODESETS.ServicesOffered}
        disabled
      />
      <FormFieldError name="service" />
    </FormFieldContainer>
  )
}

export { ServiceSelect }
