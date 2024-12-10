import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'

const EndDateInput = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="text-[12px]">End Date</FormFieldLabel>
      <DatePickerInput field="dateEnd" className="py-0" />
      <FormFieldError name="dateEnd" />
    </FormFieldContainer>
  )
}

export { EndDateInput }
