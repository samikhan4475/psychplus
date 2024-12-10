import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

const PrimaryStateCosigner = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required className="text-[12px]">
        Primary State Cosigner
      </FormFieldLabel>
      <SelectInput buttonClassName="w-full h-6" field="primaryStateCosigner" />
      <FormFieldError name="primaryStateCosigner" />
    </FormFieldContainer>
  )
}

export { PrimaryStateCosigner }
