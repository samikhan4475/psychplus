'use client'

import React from 'react'
import { Flex, IconButton } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { DeleteIcon } from '@/components/icons'
import { ClaimUpdateSchemaType } from '../schema'

interface RowActionDropdownProps {
  rowIndex: number
  rowId?: string
}
const ClaimRowActionDropdown: React.FC<RowActionDropdownProps> = ({
  rowIndex,
  rowId,
}) => {
  const form = useFormContext<ClaimUpdateSchemaType>()
  const { setValue } = form
  const claimServiceLines = useWatch({
    control: form.control,
    name: 'claimServiceLines',
  })

  const handleDeleteCharge = () => {
    if (rowId) {
      const updateCharges = claimServiceLines.map((charge) =>
        charge.id === rowId ? { ...charge, recordStatus: 'Deleted' } : charge,
      )
      setValue('claimServiceLines', updateCharges)
    } else {
      const deletedCharges = claimServiceLines.filter(
        (charge, index) => index !== rowIndex,
      )
      setValue('claimServiceLines', deletedCharges)
    }
  }
  return (
    <Flex gap="1" align="center" justify="center" className="flex-1">
      <IconButton variant="ghost" onClick={handleDeleteCharge}>
        <DeleteIcon height={18} />
      </IconButton>
    </Flex>
  )
}

export { ClaimRowActionDropdown }
