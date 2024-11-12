import { CodesetSelectCell, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants';

const PrimaryProviderRequiredInput = () => {
  return (
    <FormFieldContainer className="col-span-4 gap-1">
      <FormFieldLabel>Primary Provider Required</FormFieldLabel>
      <CodesetSelectCell
        className="h-7"
        codeset={CODESETS.ServicesStatus}
        disabled
      />
    </FormFieldContainer>
  )
}

export {PrimaryProviderRequiredInput};