'use client'

import { CalendarDate } from '@internationalized/date'
import { useFormContext } from 'react-hook-form'
import { DatePickerInput } from '@/components'
import { ClaimUpdateSchemaType } from '../schema'

interface TableCellDosFromProps {
  rowIndex: number
}

const TableCellDosFrom: React.FC<TableCellDosFromProps> = ({ rowIndex }) => {
  const { watch } = useFormContext<ClaimUpdateSchemaType>()

  const dateOfServiceFrom = watch(
    `claimServiceLines.${rowIndex}.dateOfServiceFrom`,
  )

  const calendarDate: CalendarDate | null = dateOfServiceFrom
    ? new CalendarDate(
        dateOfServiceFrom.getFullYear(),
        dateOfServiceFrom.getMonth() + 1,
        dateOfServiceFrom.getDate(),
      )
    : null
  return (
    <DatePickerInput
      field={`claimServiceLines.${rowIndex}.dateOfServiceFrom`}
      value={calendarDate}
      dateInputClass={'!border-none'}
    />
  )
}

export { TableCellDosFrom }
