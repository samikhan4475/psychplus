import React, { useCallback, useEffect, useState } from 'react'
import { CellContext } from '@tanstack/react-table'
import { UseFormReturn, useWatch } from 'react-hook-form'
import { DatePicker } from '@psychplus/ui/date-picker'
import { SchemaType } from '../add-claim-form'
import { ClaimServiceLine } from '../types'

interface TableCellProps {
  row: CellContext<ClaimServiceLine, Date | undefined>['row']
  form: UseFormReturn<SchemaType>
}

const TableCellDateOfServiceTo = ({ row, form }: TableCellProps) => {
  const { setValue } = form

  const watchedDate = useWatch({
    control: form.control,
    name: `claimServiceLines.${row.index}.dateOfServiceTo`,
  })

  const [date, setDate] = useState<Date | undefined>()

  useEffect(() => {
    if (watchedDate) {
      setDate(new Date(watchedDate))
    } else {
      setDate(undefined)
    }
  }, [watchedDate])

  const handleChange = useCallback(
    (date: Date | undefined) => {
      setDate(date)
      setValue(
        `claimServiceLines.${row.index}.dateOfServiceTo`,
        date ?? new Date(),
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

export { TableCellDateOfServiceTo }
