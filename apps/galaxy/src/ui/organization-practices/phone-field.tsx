import {
  FormFieldContainer,
  FormFieldLabel,
  PhoneNumberInput
} from '@/components'

const PhoneField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Phone</FormFieldLabel>
      <PhoneNumberInput
        field="phone"
        className='w-[120px]'
      />
    </FormFieldContainer>
  )
}

export { PhoneField }
