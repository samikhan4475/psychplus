import { CalendarDate } from '@internationalized/date'
import { useFormContext } from 'react-hook-form'
import { DatePickerInput } from '@/components'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { CalenderViewSchemaType } from '../../types'

const StartDateInput = () => {
  const form = useFormContext<CalenderViewSchemaType>()
  return (
    <FormFieldContainer>
      <FieldLabel>From Date</FieldLabel>
      <DatePickerInput
        field="startingDate"
        dateInputClass="h-6"
        maxValue={form.watch('endingDate')}
        minValue={new CalendarDate(2000, 1, 1)}
      />
    </FormFieldContainer>
  )
}

export { StartDateInput }
