import { CodesetSelectCell, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants';

const PlaceOfServiceInput = () => {
  return (
    <FormFieldContainer className="col-span-3 gap-1">
      <FormFieldLabel>Place of Service (POS)</FormFieldLabel>
      <CodesetSelectCell
        className="h-7"
        codeset={CODESETS.PlaceOfSerivce}
        disabled
      />
    </FormFieldContainer>
  )
}

export {PlaceOfServiceInput};