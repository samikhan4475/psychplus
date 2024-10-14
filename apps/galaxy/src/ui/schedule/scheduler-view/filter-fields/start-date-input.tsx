import { DatePickerInput, FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../../shared'

const StartDateInput = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>From</FormFieldLabel>
      <DatePickerInput field="startingDate" dateInputClass="h-6" />
    </FormFieldContainer>
  )
}
export { StartDateInput }
