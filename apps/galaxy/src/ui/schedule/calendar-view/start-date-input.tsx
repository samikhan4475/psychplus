import { CalendarDate } from '@internationalized/date'
import { useFormContext } from 'react-hook-form'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const StartDateInput = () => {
  const form = useFormContext()

  const handleChange = (dateValue: CalendarDate) => {
    if (dateValue) {
      const { year, month, day } = dateValue
      const convertedDate = new Date(year, month - 1, day)
      form.setValue('startDate', convertedDate)
    } else {
      form.setValue('startDate', undefined)
    }
  }
  return (
    <FormFieldContainer>
      <FormFieldLabel className="text-[12px]">From</FormFieldLabel>
      <DatePickerInput handleChange={handleChange} field="date" />
    </FormFieldContainer>
  )
}

export { StartDateInput }
