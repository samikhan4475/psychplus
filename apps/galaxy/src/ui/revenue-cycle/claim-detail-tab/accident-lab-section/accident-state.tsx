import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const AccidentState = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Accident State</FormFieldLabel>
      <CodesetSelect
        name={'accidentState'}
        codeset={CODESETS.UsStates}
        size="1"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { AccidentState }
