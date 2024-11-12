import { CodesetSelectCell, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants';

const TimeDependentInput = () => {
  return (
    <FormFieldContainer className="col-span-4 gap-1">
      <FormFieldLabel>Time Dependent</FormFieldLabel>
      <CodesetSelectCell
        className="h-7"
        codeset={CODESETS.ServicesStatus}
        disabled
      />
    </FormFieldContainer>
  )
}

export {TimeDependentInput};