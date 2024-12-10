import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

const RecurrenceSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required className="text-[12px]">
        Recurrence
      </FormFieldLabel>
      <SelectInput buttonClassName="w-full h-6" field="recurrence" />
      <FormFieldError name="recurrence" />
    </FormFieldContainer>
  )
}

export { RecurrenceSelect }
