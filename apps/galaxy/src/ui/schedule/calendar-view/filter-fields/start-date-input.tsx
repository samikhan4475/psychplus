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
      />
    </FormFieldContainer>
  )
}

export { StartDateInput }
