import React from 'react'
import { getLocalTimeZone, today } from '@internationalized/date'
import { Row } from '@tanstack/react-table'
import { format } from 'date-fns'
import { DatePickerInput, DateTimeCell } from '@/components'
import { LabResult } from '@/types'
import { useStore } from '../store'

interface TextFieldCellProps {
  row: Row<LabResult>
}

const ObservationTimeFieldCell = ({ row }: TextFieldCellProps) => {
  const { editAbleLabResults } = useStore()
  const isAddingOrEditing = editAbleLabResults?.id === row.original.id
  return isAddingOrEditing ? (
    <DatePickerInput
      field="labResults.observationTime"
      maxValue={today(getLocalTimeZone())}
    />
  ) : (
    <DateTimeCell>
      {row.original.observationTime &&
        format(new Date(row.original.observationTime as string), 'MM/dd/yyyy')}
    </DateTimeCell>
  )
}

export { ObservationTimeFieldCell }
