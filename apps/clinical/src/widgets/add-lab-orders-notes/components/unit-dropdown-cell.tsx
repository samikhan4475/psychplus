import React from 'react'
import { TableCellText } from '@psychplus/ui/table-cell'
import { TableMeta, UnitCellDropdownType } from '../types'
import SelectComponent from './select-component'

const UnitDropdownCell = ({
  id,
  value,
  label,
  table,
  viewWpcResult,
  handleInputChange,
  keyName,
  valueName,
  options,
  placeholder,
}: UnitCellDropdownType) => {
  const tableMeta = table.options.meta as TableMeta
  if (viewWpcResult && !(tableMeta?.editedRows?.id === id)) {
    return <TableCellText isLight={true} text={value} />
  } else {
    return (
      <SelectComponent
        keyName={keyName}
        valueName={valueName}
        options={options}
        placeholder={placeholder}
        className="w-[130px] text-1 font-light"
        value={value}
        onChange={(value: string) => handleInputChange(id, label, value)}
      />
    )
  }
}

export { UnitDropdownCell }
