import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from './form-field-container'

const ServiceDropdown = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="text-[12px]">Service</FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.ServicesOffered}
        name="service"
        size="1"
      />
    </FormFieldContainer>
  )
}

export { ServiceDropdown }
