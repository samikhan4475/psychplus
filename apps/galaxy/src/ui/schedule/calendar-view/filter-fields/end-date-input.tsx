import { useFormContext } from 'react-hook-form'
import { DatePickerInput } from '@/components'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { CalenderViewSchemaType } from '../../types'

const EndDateInput = () => {
  const form = useFormContext<CalenderViewSchemaType>()
  return (
    <FormFieldContainer>
      <FieldLabel>To Date</FieldLabel>
      <DatePickerInput
        field="endingDate"
        dateInputClass="h-6"
        minValue={form.watch('startingDate')}
      />
    </FormFieldContainer>
  )
}

export { EndDateInput }
