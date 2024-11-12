import { CodesetSelectCell, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants';

const CosignerInput = () => {
  return (
    <FormFieldContainer className="col-span-4 gap-1">
      <FormFieldLabel required>Cosigner</FormFieldLabel>
      <CodesetSelectCell
        className="h-7"
        codeset={CODESETS.ServicesStatus}
        disabled
      />
    </FormFieldContainer>
  )
}

export {CosignerInput};