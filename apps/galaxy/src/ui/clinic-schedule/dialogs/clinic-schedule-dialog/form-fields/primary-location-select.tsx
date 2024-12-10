import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

const PrimaryLocationSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required className="text-[12px]">
        Primary Location
      </FormFieldLabel>
      <SelectInput buttonClassName="w-full h-6" field="primaryLocation" />
      <FormFieldError name="primaryLocation" />
    </FormFieldContainer>
  )
}

export { PrimaryLocationSelect }
