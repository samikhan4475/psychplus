import React from 'react'
import { TableCellText } from '@psychplus/ui/table-cell'
import { DropType, ResultDropdownCellType, TableMeta } from '../types'
import SelectComponent from './select-component'
import { checkResultStatus } from './test-result-table'

const ResultDropdownCell = ({
  row,
  table,
  viewWpcResult,
  resultStatus,
  handleInputChange,
}: ResultDropdownCellType) => {
  const tableMeta = table.options.meta as TableMeta
  if (
    viewWpcResult &&
    row.original?.statusCode &&
    !(tableMeta?.editedRows?.id === row?.original?.id)
  ) {
    const status = resultStatus?.find(
      (item: DropType) => item?.code === row.original?.statusCode,
    )
    const { className } = checkResultStatus(row.original?.statusCode)
    return (
      <TableCellText
        isLight={true}
        isToolTip={true}
        text={status?.displayName?.slice(0, 20)}
        className={className}
      />
    )
  } else {
    return (
      <SelectComponent
        options={resultStatus}
        placeholder="Status"
        className={`w-[100px] text-1 font-light`}
        value={row.original.statusCode}
        onChange={(value: string) =>
          handleInputChange(row.original.id, 'statusCode', value)
        }
      />
    )
  }
}

export { ResultDropdownCell }
