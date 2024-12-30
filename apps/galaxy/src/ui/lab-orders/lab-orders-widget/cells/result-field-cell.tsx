import React from 'react'
import { Flex } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { FormFieldError, TextCell, TextInput } from '@/components'
import { LabResult } from '@/types'
import { useStore } from '../store'

interface TextFieldCellProps {
  row: Row<LabResult>
}

const ResultfieldCell = ({ row }: TextFieldCellProps) => {
  const { editAbleLabResults } = useStore()
  const isAddingOrEditing = editAbleLabResults?.id === row.original.id

  return isAddingOrEditing ? (
    <Flex direction="column">
      <TextInput maxLength={100} field={`labResults.resultValue`} />
      <FormFieldError name="labResults.resultValue" />
    </Flex>
  ) : (
    <TextCell>{row.original.resultValue}</TextCell>
  )
}

export { ResultfieldCell }
