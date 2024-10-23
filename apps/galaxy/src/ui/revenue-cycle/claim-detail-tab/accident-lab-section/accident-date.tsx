import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const AccidentDate = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Accident Date</FormFieldLabel>
      <DatePickerInput field="accidentDate" />
    </FormFieldContainer>
  )
}

export { AccidentDate }
