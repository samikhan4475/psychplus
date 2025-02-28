'use client'

import React from 'react'
import { Flex, Switch } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { ClaimNotesResponse } from '@/types'

interface ClaimNotesAlertCellProps {
  row: Row<ClaimNotesResponse>
}
const ClaimNotesAlertCell = ({ row }: ClaimNotesAlertCellProps) => {
  return (
    <Flex justify="end">
      <Switch size="1" highContrast checked={row.original.isAlert}/>
    </Flex>
  )
}

export { ClaimNotesAlertCell }
