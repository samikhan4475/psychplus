import React from 'react'
import { TableCellText } from '@psychplus/ui/table-cell'
import { DropType, FlagDropdownCellTypes, FlagEnum, TableMeta } from '../types'
import SelectComponent from './select-component'
import { checkResultStatus } from './test-result-table'

const FlagDropdownCell = ({
  row,
  table,
  viewWpcResult,
  resultFlags,
  handleInputChange,
}: FlagDropdownCellTypes) => {
  const tableMeta = table.options.meta as TableMeta
  if (viewWpcResult && !(tableMeta?.editedRows?.id === row?.original?.id)) {
    const flagStatus = resultFlags?.find(
      (item: DropType) => item?.code === row.original?.abnormalRangeCode,
    )
    const abnormalRangeCode =
      row.original?.abnormalRangeCode !== FlagEnum.Normal
    const { className } = checkResultStatus(
      abnormalRangeCode ? FlagEnum.Low : FlagEnum.Normal,
    )
    return (
      <TableCellText
        isLight={true}
        isToolTip={true}
        text={flagStatus?.displayName?.slice(0, 20)}
        className={className}
      />
    )
  } else {
    return (
      <SelectComponent
        options={resultFlags}
        placeholder="Select Flag"
        className="w-[130px] text-1 font-light"
        value={row.original.abnormalRangeCode}
        onChange={(value: string) =>
          handleInputChange(row.original.id, 'abnormalRangeCode', value)
        }
      />
    )
  }
}

export { FlagDropdownCell }
