'use client'

import { Box, Flex } from '@radix-ui/themes'
import { SearchModifierCodes } from './modifiers-code-search'

interface TableCellModifierProps {
  rowIndex: number
}

const TableCellModifier = ({ rowIndex }: TableCellModifierProps) => {
  return (
    <>
      <Box className="flex-1">
        <SearchModifierCodes
          fieldName={`claimServiceLines.${rowIndex}.modifierCode1`}
          placeholder="M1"
        />
      </Box>
      <Box className="border-pp-border flex-1 border-l">
        <SearchModifierCodes
          fieldName={`claimServiceLines.${rowIndex}.modifierCode2`}
          placeholder="M2"
        />
      </Box>
      <Box className="border-pp-border flex-1 border-l">
        <SearchModifierCodes
          fieldName={`claimServiceLines.${rowIndex}.modifierCode3`}
          placeholder="M3"
        />
      </Box>
      <Box className="border-pp-border flex-1 border-l">
        <SearchModifierCodes
          fieldName={`claimServiceLines.${rowIndex}.modifierCode4`}
          placeholder="M4"
        />
      </Box>
    </>
  )
}

export { TableCellModifier }
