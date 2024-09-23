import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const ServiceDropdown = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel className="text-[12px]">Service</FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.ServicesOffered}
        name="serviceId"
        size="1"
      />
    </FormFieldContainer>
  )
}

export { ServiceDropdown }
