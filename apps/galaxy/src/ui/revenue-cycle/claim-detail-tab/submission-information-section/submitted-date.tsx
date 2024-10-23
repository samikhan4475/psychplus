import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const SubmittedDate = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Submission Date</FormFieldLabel>
      <DatePickerInput field={`submittedDate`} isDisabled />
    </FormFieldContainer>
  )
}

export { SubmittedDate }
