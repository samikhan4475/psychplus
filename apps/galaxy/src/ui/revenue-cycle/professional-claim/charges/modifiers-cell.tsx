'use client'

import { Box } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SearchModifierCodes } from '../../claim-detail-tab/charges-section'
import { ClaimAddSchemaType } from '../schema'

interface CodeItem {
  code: string
  displayName: string
}

interface TableCellModifierProps {
  rowIndex: number
}
const MODIFIER_FIELDS = [
  'modifierCode1',
  'modifierCode2',
  'modifierCode3',
  'modifierCode4',
] as const

const ModifierCellSelect = ({ rowIndex }: TableCellModifierProps) => {
  const form = useFormContext<ClaimAddSchemaType>()
  const isDisabled = form.formState.disabled

  const handleModifiersCodeSelection = (
    modifier: (typeof MODIFIER_FIELDS)[number],
    selectedItem: CodeItem,
  ) => {
    form.setValue(
      `claimServiceLines.${rowIndex}.${modifier}`,
      selectedItem.code,
    )
  }

  return (
    <>
      {MODIFIER_FIELDS.map((modifier, index) => {
        return (
          <Box
            key={modifier}
            className={`flex-1 ${
              index !== 0 ? 'border-pp-border border-l' : ''
            }`}
          >
            <SearchModifierCodes
              fieldName={`claimServiceLines.${rowIndex}.${modifier}`}
              placeholder={`M${index + 1}`}
              onChange={(selectedItem) =>
                handleModifiersCodeSelection(modifier, selectedItem)
              }
              disabled={isDisabled}
            />
          </Box>
        )
      })}
    </>
  )
}

export { ModifierCellSelect }
