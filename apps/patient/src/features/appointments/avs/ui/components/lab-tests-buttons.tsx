'use client'

import React from 'react'
import { Badge, Box, Text } from '@radix-ui/themes'
import { LabTest } from '../../types'

interface LabTestsButtonsProps {
  labTests: LabTest[]
  selectedTestId?: string
  handleLabTest: (test: LabTest) => void
}

const LabTestsButtons = ({
  labTests,
  selectedTestId,
  handleLabTest,
}: LabTestsButtonsProps) => {
  return (
    <Box className="mb-3">
      {labTests.length === 0 ? (
        <Text>No Test Found</Text>
      ) : (
        labTests.map((test) => (
          <Badge
            key={test.id}
            onClick={() => handleLabTest(test)}
            size="2"
            variant="soft"
            className={`text-black mb-2 ml-2 cursor-pointer  ${
              test.id === selectedTestId
                ? 'bg-pp-gray-7 '
                : 'border-pp-gray-2 border bg-[white]'
            }`}
          >
            {test.testName}
          </Badge>
        ))
      )}
    </Box>
  )
}

export { LabTestsButtons }
