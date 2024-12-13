'use client'

import { IconButton } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { Edit2Icon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { LabResult } from '@/types'
import { SchemaType } from '../schema'

interface ViewActionEditProps {
  row: Row<LabResult>
}

const ViewActionEdit = ({ row }: ViewActionEditProps) => {
  console.log('row', row.original.id)
  const form = useFormContext<SchemaType>()
  return (
    <IconButton
      size="1"
      color="gray"
      variant="ghost"
      type="button"
      onClick={() => {
        form.setValue('editingLabResultId', row.original.id)
      }}
    >
      <Edit2Icon color="black" width={14} height={14} />
    </IconButton>
  )
}

export { ViewActionEdit }
