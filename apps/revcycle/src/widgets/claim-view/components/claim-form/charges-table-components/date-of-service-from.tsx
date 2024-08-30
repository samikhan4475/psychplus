import React, { useCallback, useEffect, useState } from 'react'
import { CellContext } from '@tanstack/react-table'
import { UseFormReturn, useWatch } from 'react-hook-form'
import { DatePicker } from '@psychplus/ui/date-picker'
import { SchemaType } from '../add-claim-form'
import { ClaimServiceLine } from '../types'

interface TableCellProps {
  row: CellContext<ClaimServiceLine, unknown>['row']
  form: UseFormReturn<SchemaType>
}

const TableCellDateOfServiceFrom = ({ row, form }: TableCellProps) => {
  const { setValue } = form
  const watchedDate = useWatch({
    control: form.control,
    name: `claimServiceLines.${row.index}.dateOfServiceFrom`,
  })

  const [date, setDate] = useState<Date | undefined>(() => {
    return watchedDate ? new Date(watchedDate) : undefined
  })

  useEffect(() => {
    // Update state when watchedDate changes
    if (watchedDate) {
      setDate(new Date(watchedDate))
    } else {
      setDate(undefined)
    }
  }, [watchedDate])

  const handleChange = useCallback(
    (selectedDate: Date | undefined) => {
      setDate(selectedDate)
      setValue(
        `claimServiceLines.${row.index}.dateOfServiceFrom`,
        selectedDate ?? new Date(),
      )
    },
    [setValue, row.index],
  )
  return (
    <DatePicker
      date={date}
      onSelect={handleChange}
      buttonClassName="w-[100%] h-[22px] justify-between text-left font-regular"
      reverse={true}
      color="gray"
      placeholder="mm/dd/yyyy"
      dateFormat="MM/dd/yyyy"
    />
  )
}

export { TableCellDateOfServiceFrom }
