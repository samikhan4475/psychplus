import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  TimeInput,
} from '@/components'

const EndTimeInput = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="text-[12px]">End Time</FormFieldLabel>
      <TimeInput field="timeEnd" dateInputClass="h-6 flex-1" />
      <FormFieldError name="timeEnd" />
    </FormFieldContainer>
  )
}

export { EndTimeInput }
