'use client'

import React from 'react'
import { IconButton, Tooltip, Text } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { LabOrders } from '@/types'

interface LabResultsProps {
  row: Row<LabOrders>
  onClick: (row: Row<LabOrders>) => void
}

const RowResultView = ({ row, onClick }: LabResultsProps) => {
  return (
    <Tooltip content="View Results" side="top" align="center">
      <IconButton
        size="1"
        color="gray"
        variant="ghost"
        onClick={() => onClick(row)}
      >
        <Text size="1" weight="regular" className="text-pp-blue">
          View Results
        </Text>
      </IconButton>
    </Tooltip>
  )
}

export { RowResultView }
