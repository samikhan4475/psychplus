'use client'

import { Box, Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { ClaimUpdateSchemaType } from '../schema'

interface TableCellDiagnosisProps {
  rowIndex: number
}
const TableCellDiagnosis = ({ rowIndex }: TableCellDiagnosisProps) => {
  const { register } = useFormContext<ClaimUpdateSchemaType>()

  return (
    <Flex className='w-[140px]'>
      <Box className="flex-1">
        <TextField.Root
          size="1"
          placeholder="DX1"
          className="[box-shadow:none]"
          {...register(`claimServiceLines.${rowIndex}.diagnosisPointer1`)}
        />
      </Box>
      <Box className="border-pp-border flex-1 border-l">
        <TextField.Root
          size="1"
          placeholder="DX2"
          className="[box-shadow:none]"
          {...register(`claimServiceLines.${rowIndex}.diagnosisPointer2`)}
        />
      </Box>
      <Box className="border-pp-border flex-1 border-l">
        <TextField.Root
          size="1"
          placeholder="DX3"
          className="[box-shadow:none]"
          {...register(`claimServiceLines.${rowIndex}.diagnosisPointer3`)}
        />
      </Box>
      <Box className="border-pp-border flex-1 border-l">
        <TextField.Root
          size="1"
          placeholder="DX4"
          className="[box-shadow:none]"
          {...register(`claimServiceLines.${rowIndex}.diagnosisPointer4`)}
        />
      </Box>
    </Flex>
  )
}

export { TableCellDiagnosis }
