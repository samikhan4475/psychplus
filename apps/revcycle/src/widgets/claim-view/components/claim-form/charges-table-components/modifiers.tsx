import React, { useCallback } from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { UseFormReturn, useWatch } from 'react-hook-form'
import { ModifierCode } from '@/widgets/claim-view/types'
import { SchemaType } from '../add-claim-form'
import { ModifiersSearchDropdown } from '../modifiers-search-dropdown'
import { ClaimServiceLine } from '../types'

interface TableCellProps {
  row: {
    original: ClaimServiceLine
    index: number
  }
  form: UseFormReturn<SchemaType>
}

const TableCellModifiers = ({ row, form }: TableCellProps) => {
  const { setValue } = form

  // Watch the modifier values for the current row
  const modifierCode1 = useWatch({
    control: form.control,
    name: `claimServiceLines.${row.index}.modifierCode1`,
  })
  const modifierCode2 = useWatch({
    control: form.control,
    name: `claimServiceLines.${row.index}.modifierCode2`,
  })
  const modifierCode3 = useWatch({
    control: form.control,
    name: `claimServiceLines.${row.index}.modifierCode3`,
  })
  const modifierCode4 = useWatch({
    control: form.control,
    name: `claimServiceLines.${row.index}.modifierCode4`,
  })

  // Handle value change for each modifier
  const handleSelectedItem = useCallback(
    (field: string, value: ModifierCode) => {
      const { code } = value

      setValue(
        `claimServiceLines.${row.index}.${field}` as keyof SchemaType,
        code,
        {
          shouldValidate: true,
          shouldDirty: true,
        },
      )
    },
    [setValue, row.index],
  )

  return (
    <Flex>
      <Box className="relative flex-1">
        <ModifiersSearchDropdown
          placeholder="M1"
          onSelectItem={(selectedModifier) =>
            handleSelectedItem('modifierCode1', selectedModifier)
          }
          modifierCode={modifierCode1}
        />
      </Box>
      <Box className="relative flex-1">
        <ModifiersSearchDropdown
          placeholder="M2"
          onSelectItem={(selectedModifier) =>
            handleSelectedItem('modifierCode2', selectedModifier)
          }
          modifierCode={modifierCode2}
        />
      </Box>
      <Box className="relative flex-1">
        <ModifiersSearchDropdown
          placeholder="M3"
          onSelectItem={(selectedModifier) =>
            handleSelectedItem('modifierCode3', selectedModifier)
          }
          modifierCode={modifierCode3}
        />
      </Box>
      <Box className="relative flex-1">
        <ModifiersSearchDropdown
          placeholder="M4"
          onSelectItem={(selectedModifier) =>
            handleSelectedItem('modifierCode4', selectedModifier)
          }
          modifierCode={modifierCode4}
        />
      </Box>
    </Flex>
  )
}
export { TableCellModifiers }
