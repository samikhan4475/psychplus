import { useFormContext } from 'react-hook-form'
import { DatePickerInput } from '@/components'

const DateRangeStart = ({
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
      maxValue={form.watch(referenceDateField)}
    />
  )
}

export { DateRangeStart }
