import React, { useCallback } from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { CellContext } from '@tanstack/react-table'
import { UseFormReturn, useWatch } from 'react-hook-form'
import { TextField } from '@psychplus/ui/text-field'
import { SchemaType } from '../add-claim-form'
import { ClaimServiceLine } from '../types'

enum DiagnosisPointerEnum {
  DX1 = 'diagnosisPointer1',
  DX2 = 'diagnosisPointer2',
  DX3 = 'diagnosisPointer3',
  DX4 = 'diagnosisPointer4',
}

interface TableCellProps {
  row: CellContext<ClaimServiceLine, string>['row']
  form: UseFormReturn<SchemaType>
}

const TableCellDiagnoses = ({ row, form }: TableCellProps) => {
  const { setValue } = form

  const diagnosisPointer1 = useWatch({
    control: form.control,
    name: `claimServiceLines.${row.index}.${DiagnosisPointerEnum.DX1}`,
  })

  const diagnosisPointer2 = useWatch({
    control: form.control,
    name: `claimServiceLines.${row.index}.${DiagnosisPointerEnum.DX2}`,
  })

  const diagnosisPointer3 = useWatch({
    control: form.control,
    name: `claimServiceLines.${row.index}.${DiagnosisPointerEnum.DX3}`,
  })

  const diagnosisPointer4 = useWatch({
    control: form.control,
    name: `claimServiceLines.${row.index}.${DiagnosisPointerEnum.DX4}`,
  })

  const handleChange = useCallback(
    (field: DiagnosisPointerEnum, value: string) => {
      setValue(`claimServiceLines.${row.index}.${field}`, value, {
        shouldValidate: true,
        shouldDirty: true,
      })
    },
    [setValue, row.index],
  )

  return (
    <Flex>
      <Box className="flex-1">
        <TextField.Root
          size="1"
          placeholder="DX1"
          value={diagnosisPointer1 ?? ''}
          onChange={(e) =>
            handleChange(DiagnosisPointerEnum.DX1, e.target.value)
          }
        />
      </Box>
      <Box className="flex-1">
        <TextField.Root
          size="1"
          placeholder="DX2"
          value={diagnosisPointer2 ?? ''}
          onChange={(e) =>
            handleChange(DiagnosisPointerEnum.DX2, e.target.value)
          }
        />
      </Box>
      <Box className="flex-1">
        <TextField.Root
          size="1"
          placeholder="DX3"
          value={diagnosisPointer3 ?? ''}
          onChange={(e) =>
            handleChange(DiagnosisPointerEnum.DX3, e.target.value)
          }
        />
      </Box>
      <Box className="flex-1">
        <TextField.Root
          size="1"
          placeholder="DX4"
          value={diagnosisPointer4 ?? ''}
          onChange={(e) =>
            handleChange(DiagnosisPointerEnum.DX4, e.target.value)
          }
        />
      </Box>
    </Flex>
  )
}

export { TableCellDiagnoses }
