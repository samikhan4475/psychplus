import { useFormContext } from 'react-hook-form'
import { DatePickerInput } from '@/components'

const DateRangeEnd = ({
  dateField,
  referenceDateField,
}: {
  dateField: string
  referenceDateField: string
}) => {
  const form = useFormContext()
  return (
    <DatePickerInput
      field={dateField}
      showError={false}
      minValue={form.watch(referenceDateField)}
    />
  )
}

export { DateRangeEnd }
