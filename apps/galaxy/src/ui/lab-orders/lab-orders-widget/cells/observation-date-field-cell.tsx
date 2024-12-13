import React from 'react'
import { Row } from '@tanstack/react-table'
import { useFormContext } from 'react-hook-form'
import { DatePickerInput, DateTimeCell } from '@/components'
import { LabResult } from '@/types'
import { formatDateTime } from '@/utils'
import { SchemaType } from '../schema'

interface TextFieldCellProps {
  row: Row<LabResult>
}

const ObservationTimeFieldCell = ({ row }: TextFieldCellProps) => {
  const form = useFormContext<SchemaType>()
  const isEditing = form.getValues('editingLabResultId') === row.original.id

  return isEditing ? (
    <DatePickerInput field={`labResults.${row.index}.observationTime`} />
  ) : (
    <DateTimeCell>
      {formatDateTime(row.original.observationTime as string)}
    </DateTimeCell>
  )
}

export { ObservationTimeFieldCell }
