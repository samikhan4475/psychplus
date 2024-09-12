import { DatePickerInput, FormFieldLabel } from '@/components'
import { FormFieldContainer } from './form-field-container'

const StartDateInput = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="text-[12px]">From</FormFieldLabel>
      <DatePickerInput field="startDate" />
    </FormFieldContainer>
  )
}

export { StartDateInput }
