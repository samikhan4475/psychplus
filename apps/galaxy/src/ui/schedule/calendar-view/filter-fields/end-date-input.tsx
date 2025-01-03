import { DatePickerInput, FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../../shared'

const EndDateInput = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>To Date</FormFieldLabel>
      <DatePickerInput field="endingDate" dateInputClass="h-6" />
    </FormFieldContainer>
  )
}

export { EndDateInput }
