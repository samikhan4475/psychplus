import {
  DobInput,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components-v2'

const EffectiveDateInput = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Effective Date</FormFieldLabel>
      <DobInput name="effectiveDate" />
      <FormFieldError name="effectiveDate" />
    </FormFieldContainer>
  )
}

export { EffectiveDateInput }
