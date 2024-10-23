import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const AccidentType = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Accident Type</FormFieldLabel>
      <CodesetSelect
        name="accidentType"
        codeset={CODESETS.AccidentType}
        size="1"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { AccidentType }
