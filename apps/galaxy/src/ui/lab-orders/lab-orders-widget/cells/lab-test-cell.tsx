import React from 'react'
import { Row } from '@tanstack/react-table'
import { LongTextCell } from '@/components'
import { LabOrders } from '@/types'

interface ActionsCellProps {
  row: Row<LabOrders>
}

const LabTestCell = ({ row }: ActionsCellProps) => {
  if (!row?.original?.labTests) return null
  const testNames = row.original.labTests
    .filter((item) => item.recordStatus === 'Active')
    .map((item) => item.testName)
    .join(', ')

  return <LongTextCell className="w-[300px]">{testNames}</LongTextCell>
}
export { LabTestCell }
