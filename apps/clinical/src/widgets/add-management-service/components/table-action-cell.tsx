import React from 'react'
import { IconButton } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import { PropsWithRow } from '@psychplus/ui/data-table/data-table-row-actions'
import { VisitTypeDiagnosisData } from '../types'

const TableActionCell = ({ row }: PropsWithRow<VisitTypeDiagnosisData>) => {
  console.log(row)
  return (
    <IconButton size={'2'} color="gray" type="button" variant="ghost">
      <Trash2 size={14} color="#60646C" />
    </IconButton>
  )
}

export default TableActionCell
