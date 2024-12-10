import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

const StatusSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required className="text-[12px]">
        Status
      </FormFieldLabel>
      <SelectInput buttonClassName="w-full h-6" field="status" />
      <FormFieldError name="status" />
    </FormFieldContainer>
  )
}

export { StatusSelect }
