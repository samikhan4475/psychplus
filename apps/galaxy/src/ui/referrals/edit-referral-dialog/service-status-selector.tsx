'uuse client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const ServiceStatusSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Service Status</FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.ServicesStatus}
        name="servicesStatus"
        size="1"
        disabled
      />
      <FormFieldError name="servicesStatus" />
    </FormFieldContainer>
  )
}

export { ServiceStatusSelect }
