import { CodesetSelectCell, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants';

const ServiceInput = () => {
  return (
    <FormFieldContainer className="col-span-3 gap-1">
      <FormFieldLabel>Service</FormFieldLabel>
      <CodesetSelectCell
        className="h-7"
        codeset={CODESETS.ServicesStatus}
      />
    </FormFieldContainer>
  )
}

export {ServiceInput};