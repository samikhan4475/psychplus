import React from 'react'
import { TextField } from '@radix-ui/themes'
import { format } from 'date-fns'
import { TableCellLongText } from '@psychplus/ui/table-cell'
import { formatDateToYYYYMMDD } from '@/widgets/lab-order/utils'
import { ObservationTypes, TableMeta } from '../types'

const ObservationTextCell = ({
  row,
  table,
  viewWpcResult,
  handleInputChange,
}: ObservationTypes) => {
  const date = row?.original?.observationTime
  const tableMeta = table.options.meta as TableMeta
  if (
    viewWpcResult &&
    date &&
    !(tableMeta?.editedRows?.id === row?.original?.id)
  ) {
    return (
      <TableCellLongText
        isLight={true}
        text={format(new Date(date), 'MM/dd/yyyy')}
      />
    )
  } else if (date) {
    return (
      <TextField.Root
        type="date"
        onChange={({ target }) =>
          handleInputChange(row.original.id, 'observationTime', target.value)
        }
        value={formatDateToYYYYMMDD(date)}
        placeholder="Start"
        className="h-8 w-full justify-between rounded-2 border !border-[#cdced6] px-2 text-left text-1 font-regular"
      />
    )
  }
}
export { ObservationTextCell }
