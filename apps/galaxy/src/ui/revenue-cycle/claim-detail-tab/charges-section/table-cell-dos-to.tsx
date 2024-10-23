'use client'

import { CalendarDate } from '@internationalized/date'
import { useFormContext } from 'react-hook-form'
import { DatePickerInput } from '@/components'
import { ClaimUpdateSchemaType } from '../schema'
interface TableCellDosToProps {
  rowIndex: number
}

const TableCellDosTo: React.FC<TableCellDosToProps> = ({ rowIndex }) => {
  const { watch } = useFormContext<ClaimUpdateSchemaType>()

  const dateOfServiceTo = watch(`claimServiceLines.${rowIndex}.dateOfServiceTo`)

  const calendarDate: CalendarDate | null = dateOfServiceTo
    ? new CalendarDate(
        dateOfServiceTo.getFullYear(),
        dateOfServiceTo.getMonth() + 1,
        dateOfServiceTo.getDate(),
      )
    : null
  return (
    <DatePickerInput
      field={`claimServiceLines.${rowIndex}.dateOfServiceTo`}
      value={calendarDate}
      dateInputClass={'!border-none'}
    />
  )
}

export { TableCellDosTo }
