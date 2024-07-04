import {
  DobInput,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components-v2'

const TerminationDateInput = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Termination Date</FormFieldLabel>
      <DobInput name="effectiveDate" />
      <FormFieldError name="effectiveDate" />
    </FormFieldContainer>
  )
}

export { TerminationDateInput }
