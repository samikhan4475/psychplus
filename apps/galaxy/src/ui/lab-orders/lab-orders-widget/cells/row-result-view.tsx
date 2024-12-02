'use client'

import React, { useState } from 'react'
import { IconButton } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { DataTable } from '@/components'
import { LabOrders, LabResult, LabTest } from '@/types'
import { LabResultDialog } from '../lab-result-dialog'
import { LabTestHeader } from '../lab-test-header'
import { columns } from '../results-table-colums'

interface LabResultsProps {
  row: Row<LabOrders>
}

const RowResultView = ({ row }: LabResultsProps) => {
  const [labResults, setLabResults] = useState<LabResult[]>()
  const [selectedTestId, setSelectedTestId] = useState<string>()
  const [selectedTestName, setSelectedTestName] = useState<string>('')

  const handleLabTest = (test: LabTest) => {
    const filteredLabResults = row.original.labResults.filter(
      (labResult) => labResult.labTestId === test.id,
    )
    setLabResults(filteredLabResults)
    setSelectedTestId(test.id)
    setSelectedTestName(test.testName)
  }

  if (row.original.labTests.length > 0 && !selectedTestId) {
    handleLabTest(row.original.labTests[0])
  }

  return (
    <IconButton size="1" color="gray" variant="ghost">
      <LabResultDialog title={selectedTestName}>
        <LabTestHeader
          labTests={row.original.labTests}
          selectedTestId={selectedTestId}
          handleLabTest={handleLabTest}
        />
        <DataTable
          data={labResults ?? []}
          columns={columns}
          disablePagination
          sticky
        />
      </LabResultDialog>
    </IconButton>
  )
}

export { RowResultView }
