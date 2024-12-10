import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  TimeInput,
} from '@/components'

const StartTimeInput = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required className="text-[12px]">
        Start Time
      </FormFieldLabel>
      <TimeInput field="timeStart" dateInputClass="h-6 flex-1" />
      <FormFieldError name="timeStart" />
    </FormFieldContainer>
  )
}

export { StartTimeInput }
