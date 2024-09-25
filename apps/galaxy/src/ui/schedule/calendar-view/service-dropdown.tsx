import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../shared'

const ServiceDropdown = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel className="text-[12px]">Service</FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.ServicesOffered}
        name="serviceId"
        className="flex-1"
        size="1"
      />
    </FormFieldContainer>
  )
}

export { ServiceDropdown }
