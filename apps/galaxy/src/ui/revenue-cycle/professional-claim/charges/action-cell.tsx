'use client'

import React from 'react'
import { Flex, IconButton } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { DeleteIcon } from '@/components/icons'
import { ClaimAddSchemaType } from '../schema'

interface RowActionCellDropdownProps {
  rowIndex: number
}
const ActionCellDropdown: React.FC<RowActionCellDropdownProps> = ({
  rowIndex,
}) => {
  const form = useFormContext<ClaimAddSchemaType>()
  const { setValue } = form
  const claimServiceLines = useWatch({
    control: form.control,
    name: 'claimServiceLines',
  })

  const handleDeleteCharge = () => {
    const deletedCharges = claimServiceLines.filter(
      (_, index) => index !== rowIndex,
    )
    setValue('claimServiceLines', deletedCharges)
  }
  if (rowIndex === 0) return null
  return (
    <Flex gap="1" align="center" justify="center" className="flex-1">
      <IconButton variant="ghost" onClick={handleDeleteCharge}>
        <DeleteIcon height={18} />
      </IconButton>
    </Flex>
  )
}

export { ActionCellDropdown }
