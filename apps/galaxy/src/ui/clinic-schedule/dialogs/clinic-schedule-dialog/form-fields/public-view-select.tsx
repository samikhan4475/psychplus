import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

const options = [
  {
    label: 'Yes',
    value: 'yes',
  },
  {
    label: 'No',
    value: 'no',
  },
]

const PublicViewSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required className="text-[12px]">
        Public View
      </FormFieldLabel>
      <SelectInput
        buttonClassName="w-full h-6"
        options={options}
        field="publicView"
      />
      <FormFieldError name="publicView" />
    </FormFieldContainer>
  )
}

export { PublicViewSelect }
