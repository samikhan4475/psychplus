import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

const options = [
  {
    label: 'Weekly',
    value: 'weekly',
  },
  {
    label: 'Biweekly',
    value: 'biweekly',
  },
  {
    label: 'Triweekly',
    value: 'triweekly',
  },
  {
    label: 'Quadweekly',
    value: 'quadweekly',
  },
]

const RecurrenceSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required className="text-[12px]">
        Recurrence
      </FormFieldLabel>
      <SelectInput
        buttonClassName="w-full h-6"
        field="recurrence"
        options={options}
      />
      <FormFieldError name="recurrence" />
    </FormFieldContainer>
  )
}

export { RecurrenceSelect }
