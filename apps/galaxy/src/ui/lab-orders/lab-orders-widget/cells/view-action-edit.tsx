'use client'

import { IconButton, Tooltip } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { Edit2Icon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { LabResult } from '@/types'
import { tranformIn } from '../data'
import { SchemaType } from '../schema'
import { useStore } from '../store'

interface ViewActionEditProps {
  row: Row<LabResult>
}

const ViewActionEdit = ({ row }: ViewActionEditProps) => {
  const form = useFormContext<SchemaType>()
  const { setEditAbleLabResults, testLabResult, setTestLabResult } = useStore()

  const handleButtonClick = () => {
    setEditAbleLabResults(row.original)
    const updatedLabResults = testLabResult.filter((result) => result.id)
    setTestLabResult(updatedLabResults)
    form.reset({ labResults: tranformIn(row.original) })
  }

  return (
    <IconButton
      size="1"
      color="gray"
      variant="ghost"
      type="button"
      onClick={handleButtonClick}
    >
      <Tooltip content="Edit">
        <Edit2Icon color="black" width={14} height={14} />
      </Tooltip>
    </IconButton>
  )
}

export { ViewActionEdit }
