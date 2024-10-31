import React from 'react'
import { IconButton } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'

interface TableActionCellProps {
  onDelete: () => void;
}

const TableActionCell = ({ onDelete }: TableActionCellProps) => {
  return (
    <IconButton
      size="2"
      type="button"
      variant="ghost"
      className="absolute right-0"
      onClick={onDelete} 
    >
      <Trash2 size={14} color="#60646C" />
    </IconButton>
  )
}

export default TableActionCell