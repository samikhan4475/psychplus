import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const StartDateInput = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required className="text-[12px]">
        Start Date
      </FormFieldLabel>
      <DatePickerInput field="dateStart" dateInputClass="py-0" />
    </FormFieldContainer>
  )
}

export { StartDateInput }
