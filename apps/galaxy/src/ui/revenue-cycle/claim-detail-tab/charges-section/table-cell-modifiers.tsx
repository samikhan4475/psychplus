'use client'

import { Box } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { ClaimUpdateSchemaType } from '../schema'
import { SearchModifierCodes } from './modifiers-code-search'

interface CodeItem {
  code: string
  displayName: string
}

interface TableCellModifierProps {
  rowIndex: number
}

const TableCellModifier = ({ rowIndex }: TableCellModifierProps) => {
  const { setValue } = useFormContext<ClaimUpdateSchemaType>()
  const handleModifiersCodeSelection = async (
    fieldName: `claimServiceLines.${number}.${
      'modifierCode1' | 'modifierCode2' | 'modifierCode3' | 'modifierCode4'
    }`,
    selectedItem: CodeItem,
  ) => {
    setValue(fieldName, selectedItem.code)
  }

  return (
    <>
      <Box className="flex-1">
        <SearchModifierCodes
          fieldName={`claimServiceLines.${rowIndex}.modifierCode1`}
          placeholder="M1"
          onChange={(selectedItem: CodeItem) =>
            handleModifiersCodeSelection(
              `claimServiceLines.${rowIndex}.modifierCode1`,
              selectedItem,
            )
          }
        />
      </Box>
      <Box className="border-pp-border flex-1 border-l">
        <SearchModifierCodes
          fieldName={`claimServiceLines.${rowIndex}.modifierCode2`}
          placeholder="M2"
          onChange={(selectedItem: CodeItem) =>
            handleModifiersCodeSelection(
              `claimServiceLines.${rowIndex}.modifierCode2`,
              selectedItem,
            )
          }
        />
      </Box>
      <Box className="border-pp-border flex-1 border-l">
        <SearchModifierCodes
          fieldName={`claimServiceLines.${rowIndex}.modifierCode3`}
          placeholder="M3"
          onChange={(selectedItem: CodeItem) =>
            handleModifiersCodeSelection(
              `claimServiceLines.${rowIndex}.modifierCode3`,
              selectedItem,
            )
          }
        />
      </Box>
      <Box className="border-pp-border flex-1 border-l">
        <SearchModifierCodes
          fieldName={`claimServiceLines.${rowIndex}.modifierCode4`}
          placeholder="M4"
          onChange={(selectedItem: CodeItem) =>
            handleModifiersCodeSelection(
              `claimServiceLines.${rowIndex}.modifierCode4`,
              selectedItem,
            )
          }
        />
      </Box>
    </>
  )
}

export { TableCellModifier }
