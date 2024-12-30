import React from 'react'
import { Flex } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { FormFieldError, TextCell, TextInput } from '@/components'
import { LabResult } from '@/types'
import { useStore } from '../store'

interface TextFieldCellProps {
  row: Row<LabResult>
}

const TestNameCell = ({ row }: TextFieldCellProps) => {
  const { editAbleLabResults } = useStore()

  const isAddingOrEditing = editAbleLabResults?.id === row.original.id
  return isAddingOrEditing ? (
    <Flex direction="column">
      <TextInput field={`labResults.resultName`} maxLength={128} />
      <FormFieldError name="labResults.resultName" />
    </Flex>
  ) : (
    <TextCell>{row.original.resultName}</TextCell>
  )
}

export { TestNameCell }
