import { CodesetSelectCell, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants';

const TexonomyInput = () => {
  return (
    <FormFieldContainer className="col-span-4 gap-1">
      <FormFieldLabel>Taxonomy</FormFieldLabel>
      <CodesetSelectCell
        className="h-7"
        codeset={CODESETS.ServicesStatus}
      />
    </FormFieldContainer>
  )
}

export {TexonomyInput};