import React from 'react'
import { TextField } from '@radix-ui/themes'
import { TableCellText } from '@psychplus/ui/table-cell'
import { TableMeta } from '../types'

interface TextCellProps {
  id: string
  value?: string
  label: string
  table: any // Adjust this type as needed
  viewWpcResult?: boolean
  handleInputChange: (id: string, label: string, value: string) => void
}

const TextCell: React.FC<TextCellProps> = ({
  id,
  value,
  label,
  table,
  viewWpcResult,
  handleInputChange,
}) => {
  const tableMeta = table.options.meta as TableMeta

  if (viewWpcResult && !(tableMeta?.editedRows?.id === id)) {
    return <TableCellText isLight={true} text={value} />
  } else {
    return (
      <input
        className="h-30 w-[100px] text-1 font-light"
        onChange={(e) => handleInputChange(id, label, e.target.value)}
        value={value}
        placeholder=""
      />
    )
  }
}

export { TextCell }
