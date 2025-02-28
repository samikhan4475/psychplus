'use client'

import React from 'react'
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import { Flex, IconButton } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { ClaimNotesResponse } from '@/types'
import { useStore } from '../../store'

interface RowActionProps {
  row: Row<ClaimNotesResponse>
}
const ClaimDeletedNotesRowAction: React.FC<RowActionProps> = ({ row }) => {
  const { setOpenClaimNotesAudit, setClaimNotesId } = useStore((state) => ({
    setOpenClaimNotesAudit: state.setOpenClaimNotesAudit,
    setClaimNotesId: state.setClaimNotesId,
    openClaimNotesAudit: state.openClaimNotesAudit,
  }))

  const handleEditClick = () => {
    setClaimNotesId(row.original.id ?? '')
    setOpenClaimNotesAudit(true)
  }
  return (
    <Flex gap="1" align="center" justify="center" className="flex-1">
      <IconButton
        variant="ghost"
        type="button"
        className="text-pp-gray-1"
        onClick={handleEditClick}
      >
        <CounterClockwiseClockIcon />
      </IconButton>
    </Flex>
  )
}

export { ClaimDeletedNotesRowAction }
