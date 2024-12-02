'use client'

import React from 'react'
import { Badge, Box } from '@radix-ui/themes'
import { LabTest } from '@/types'

interface LabTestHeaderProps {
  labTests: LabTest[]
  selectedTestId?: string
  handleLabTest: (test: LabTest) => void
}

const LabTestHeader = ({
  labTests,
  selectedTestId,
  handleLabTest,
}: LabTestHeaderProps) => {
  return (
    <Box>
      {labTests.map((test) => (
        <Badge
          key={test.id}
          onClick={() => handleLabTest(test)}
          size="3"
          variant="soft"
          className={`text-black mb-2 ml-2 cursor-pointer  ${
            test.id === selectedTestId
              ? 'bg-pp-focus-bg '
              : 'border-pp-grey border bg-[white]'
          }`}
        >
          {test.testName}
        </Badge>
      ))}
    </Box>
  )
}

export { LabTestHeader }
