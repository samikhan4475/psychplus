import { CodesetSelectCell, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants';

const CosignerTypeInput = () => {
  return (
    <FormFieldContainer className="col-span-4 gap-1">
      <FormFieldLabel required>Cosigner Type</FormFieldLabel>
      <CodesetSelectCell
        className="h-7"
        codeset={CODESETS.ServicesStatus}
        disabled
      />
    </FormFieldContainer>
  )
}

export {CosignerTypeInput};